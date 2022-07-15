import { Link } from "react-router-dom";

import InputDataEntry from "../InputDataEntry";
import ProcessDataButton from "../ProcessDataButton";
import { useHandleProcessData } from "../../hooks";
import "./extractor-form.css";

const ExtractorForm = () => {
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
      />

      {showResultsButton && (
        <Link to="/resultados" className="show-results-button">
          Ver Resultados
        </Link>
      )}
    </div>
  );
};

export default ExtractorForm;
