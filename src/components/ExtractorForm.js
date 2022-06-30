
import React, { useEffect } from "react";
 

function ExtractorForm(props) {
  const [spareParts, setSpareParts] = React.useState(["Filtro Aceite", "Filtro Aire", "Filtro Polen", "Filtro Bencina", "Filtro Petroleo", "Bujías"]);
  const [vehicles, setVehicles] = React.useState(["Audi A5"]);
  const [newSparePart, setNewSparePart] = React.useState("");
  const [newVehicle, setNewVehicle] = React.useState("");
  const [processedItems, setProcessedItems] = React.useState([]);
  const [notProcessedItems, setNotProcessedItems] = React.useState([]);
  const [progressCounter, setProgressCounter] = React.useState("0%");

  const handleNewSparePartChange = (event) => {
    setNewSparePart(event.target.value);
  }

  const handleNewVehicleChange = (event) => {
    setNewVehicle(event.target.value)
  }

  const addSparePart = () => {
    setSpareParts([...spareParts, newSparePart]);
    setNewSparePart("");
  }

  const addVehicle = () => {
    setVehicles([...vehicles, newVehicle]);
    setNewVehicle("");
  }

  const removeSparePartByIndex = (index) => {
    let currentSpareParts = [...spareParts];
    currentSpareParts.splice(index, 1)
    setSpareParts(currentSpareParts);
  }

  const removeVehicleByIndex = (index) => {
    let currentVehicles = [...vehicles];
    currentVehicles.splice(index, 1)
    setVehicles(currentVehicles);
  }
  

  const loadSparePartsFromFile = (e) => { 
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      const loadedSpareParts = contents.split("\n");
      setSpareParts(loadedSpareParts);
    }

    reader.readAsText(file);
  }

  const loadVehiclesFromFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const contents = event.target.result;
      const loadedVehicles = contents.split("\n");
      setVehicles(loadedVehicles);
    }

    reader.readAsBinaryString(file);

  }

  const generateCSV = () => {
    fetch("https://ml-explorer.vercel.app/api/buildcsv.py", {
      method: 'POST',
      body: JSON.stringify(processedItems),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "output.csv";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
    });
  }

  const processAllData = () => {
    let spare_parts_col = [...spareParts];
    let vehicles_col = [...vehicles];

    setProcessedItems([])
    setNotProcessedItems([])

    var counter = 0;
    let total = vehicles_col.length * spareParts.length;

    for (let vehicle_index in vehicles_col) { 
      for (let spare_part_index in spare_parts_col) {
        console.log(vehicles_col[vehicle_index] + " " + spare_parts_col[spare_part_index]);

        processDataExtraction(spare_parts_col[spare_part_index], vehicles_col[vehicle_index], (data) => {
          
          console.log("data extraction");
          console.log(data);

          counter += 1;

          let percentage = counter / total * 100

          setProgressCounter(percentage + "%")


          if (data.processed) {
            setProcessedItems(processedItems => [...processedItems, data]);
          } else {
            setNotProcessedItems(notProcessedItems => [...notProcessedItems, data]);
          }
          
        });

      }
    }
  }

  const processDataExtraction = (spare_part, vehicle, callback) => {
    /* Extract data from ML API using a middleware */
    let backend_url = "https://ml-explorer.vercel.app/api/handler.py";
    fetch(backend_url, {
      method: 'POST',
      body: JSON.stringify({
        spare_part: spare_part,
        vehicle: vehicle
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((response) => {
      console.log(response);
      callback(response)
    })

  }


  return(
    <div> 
        <div className="card">
          <div className="card-content">
            
            <div className="row">
              <div className="col s6">
                <span className="card-title">Autopartes</span>
                <div className="input-field col s12">
                  
                  <div className="row">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Cargar archivo de datos</span>
                        <input type="file" onChange={(e) => {loadSparePartsFromFile(e)}}></input>
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s9">
                      <p>{newSparePart}</p>
                      <input type="text" onChange={(e) => {handleNewSparePartChange(e)}} value={newSparePart} className="validate"></input>
                    </div>
                    <div className="col s3">  
                      <a className="waves-effect waves-light btn" onClick={addSparePart}>Agregar</a>
                    </div>
                  </div>
                  
                  <ul className="collection">
                    {spareParts.map((item, index) => {
                      return <li className="collection-item">{item} 
                          <a href="#!" 
                            className="secondary-content" 
                            onClick={() => {removeSparePartByIndex(index)}}>
                              <i className="material-icons">remove</i></a>
                        </li>
                    })}
                  </ul>
                  
                </div>
              </div>
              <div className="col s6">
                
                <span className="card-title">Vehiculos</span>
                <div className="input-field col s12">
                  
                  <div className="row">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Cargar archivo de datos</span>
                        <input type="file" onChange={(e) => {loadVehiclesFromFile(e)}}></input>
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate"  type="text"></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s9">
                      <p>{newVehicle}</p>
                      <input id="new_spare_part" type="text" onChange={(e) => {handleNewVehicleChange(e)}} value={newVehicle} className="validate"></input>
                    </div>
                    <div className="col s3">  
                      <a className="waves-effect waves-light btn" onClick={addVehicle}>Agregar</a>
                    </div>
                    
                  </div>
                  <ul className="collection">
                    {vehicles.map((item) => {
                      return <li className="collection-item">{item}</li>
                    })}
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
           
         
          
        </div>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col-12 center">
                 <a className="waves-effect waves-light btn btn-info btn-large blue darken-1" onClick={processAllData}>Procesar</a> 
                <br></br><br></br>
                 <div class="progress">
                    <div class="determinate" style={{width: progressCounter}}></div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col-12">
                <span className="card-title">Resultados</span>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <div className="card">
                  
                  <div className="card-content"> 
                    <span className="card-title">Procesados Correctamente</span>
                    <table>
                      <thead>
                        <th>Item</th>
                        <th>Mean Price</th>
                        <th>Deviation</th>
                      </thead>
                      {processedItems.map((item) => {
                        return (
                          <tbody>
                            <tr className="collection-item">
                              <td>{item.title}</td><td><b>$ {item.item.mean.toFixed(2)}</b></td><td> +/- $ {item.item.std.toFixed(2)}</td>
                            </tr>
                          </tbody>)
                      })}
                    </table>
                    
                    <div className="center">
                      <a className="waves-effect waves-light btn btn-info btn-large blue darken-1" onClick={generateCSV}>Generar CSV</a> 
                    </div>

                    
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="card">
                  
                  <div className="card-content"> 
                    <span className="card-title">Sin resultados encontrados</span>
                      {notProcessedItems.map((item) => {
                        return <li className="collection-item">{item.title}</li>
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
  )


}


export default ExtractorForm;