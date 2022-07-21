import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import InputDataEntry from "../InputDataEntry";
import ProcessDataButton from "../ProcessDataButton";
import { useHandleProcessData } from "../../hooks";
import "./extractor-form.css";

const ExtractorForm = () => {
  const navigate = useNavigate();

  const {
    spareParts,
    newSparePart,
    vehicles,
    newVehicle,
    progressCounter,
    handleNewSparePartChange,
    handleNewVehicleChange,
    addSparePart,
    addVehicle,
    removeSparePartByIndex,
    removeVehicleByIndex,
    loadSparePartsFromFile,
    loadVehiclesFromFile,
    processAllData,
    showResultsButton,
  } = useHandleProcessData();

  return (
    <div>
      <InputDataEntry
        title="Autopartes"
        handleChangeFunction={loadSparePartsFromFile}
        load_type_id="load-autoparts-files"
        handleAddNewItem={addSparePart}
        listItems={spareParts}
        removeItem={removeSparePartByIndex}
        handleInputTextEntry={handleNewSparePartChange}
        inputTextValue={newSparePart}
        placeholderText="Ej. Filtro de aceite"
      />

      <InputDataEntry
        title="Vehículos"
        handleChangeFunction={loadVehiclesFromFile}
        load_type_id="load-vehicles-files"
        handleAddNewItem={addVehicle}
        listItems={vehicles}
        removeItem={removeVehicleByIndex}
        handleInputTextEntry={handleNewVehicleChange}
        inputTextValue={newVehicle}
        placeholderText="Ej. Toyota"
      />

      <ProcessDataButton
        processAllData={processAllData}
        progressCounter={progressCounter}
        disabled={
          vehicles.length === 0 || spareParts.length === 0 ? true : false
        }
      />

      {showResultsButton && (
        <button
          className="show-results-button"
          onClick={() => {
            if (
              +localStorage.getItem("percentage") < 100 ||
              +progressCounter.split("%")[0] < 100
            ) {
              Swal.fire({
                title: "Procesamiento de Datos",
                icon: "info",
                text: "La carga no ha finalizado, ¿desea continuar?",
                confirmButtonText: "Aceptar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/resultados");
                }
              });
            } else {
              navigate("/resultados");
            }
          }}
        >
          Ver Resultados
        </button>
      )}
    </div>
  );
};

export default ExtractorForm;
