 
import './App.css';    
import ExtractorForm from './components/ExtractorForm.js';
 

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">ML Data Extractor</span>
              <p>Use esta herramienta para generar un archivo csv con la estimacion de precios de auto partes.</p>  
            </div>
          </div>
          
        </div>
      </div>
      <ExtractorForm></ExtractorForm>
    </div>
  );
}

export default App;
