
import React from "react";
 

function ExtractorForm(props) {
  const [spareParts, setSpareParts] = React.useState(["Filtro Aceite", "Filtro Aire", "Filtro Polen", "Filtro Bencina", "Filtro Petroleo", "Bujías"]);
  const [vehicles, setVehicles] = React.useState([]);
  const [newSparePart, setNewSparePart] = React.useState("");
  const [newVehicle, setNewVehicle] = React.useState("");

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
              <div className="col-12 ">
                 {/* <a className="waves-effect waves-light btn btn-info btn-large blue darken-1" onclick="generate_csv()">Procesar</a> */}
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
                    Procsados
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="card">
                  
                  <div className="card-content"> 
                    <span className="card-title">Sin resultados encontrados</span>
                    Procsados
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