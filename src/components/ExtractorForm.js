
import React from "react";
 

function ExtractorForm(props) {
  const [spareParts, setSpareParts] = React.useState(["Filtro Aceite", "Filtro Aire", "Filtro Polen", "Filtro Bencina", "Filtro Petroleo", "Bujías"]);
  const [vehicles, setVehicles] = React.useState([]);
  const [newSparePart, setNewSparePart] = React.useState("");

  const handleChange = (event) => {
    setNewSparePart(event.target.value);
  }

  const addSparePart = () => {
    setSpareParts([...spareParts, newSparePart]);
    setNewSparePart("");
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
                      <input type="text" onChange={(e) => {handleChange(e)}} value={newSparePart} className="validate"></input>
                    </div>
                    <div className="col s3">  
                      <a className="waves-effect waves-light btn" onClick={addSparePart}>Agregar</a>
                    </div>
                  </div>
                  
                  <ul className="collection">
                    {spareParts.map((item) => {
                      return <li className="collection-item">{item}</li>
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
                        <input className="file-path validate" type="text"></input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s9">
                      <input id="new_spare_part" type="text" className="validate"></input>
                    </div>
                    <div className="col s3">  
                      {/* <a className="waves-effect waves-light btn" onclick="add_spare_part()">Agregar</a> */}
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