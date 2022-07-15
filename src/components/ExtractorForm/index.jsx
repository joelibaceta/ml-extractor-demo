import { useState } from "react";
import InputDataEntry from "../InputDataEntry";
import ProcessDataButton from "../ProcessDataButton";
import "./extractor-form.css";

const ExtractorForm = () => {
  const [spareParts, setSpareParts] = useState([
    "Filtro Aceite",
    "Filtro Aire",
    "Filtro Polen",
    "Filtro Bencina",
    "Filtro Petroleo",
    "Bujías",
  ]);
  const [vehicles, setVehicles] = useState(["Audi A5"]);
  const [newSparePart, setNewSparePart] = useState("");
  const [newVehicle, setNewVehicle] = useState("");
  const [processedItems, setProcessedItems] = useState([]);
  const [notProcessedItems, setNotProcessedItems] = useState([]);
  const [progressCounter, setProgressCounter] = useState("0%");

  const handleNewSparePartChange = (event) => {
    setNewSparePart(event.target.value);
  };

  const handleNewVehicleChange = (event) => {
    setNewVehicle(event.target.value);
  };

  const addSparePart = (event) => {
    event.preventDefault();
    if (newSparePart.trim().length === 0) return;

    setSpareParts([...spareParts, newSparePart]);
    setNewSparePart("");
  };

  const addVehicle = (event) => {
    event.preventDefault();
    if (newVehicle.trim().length === 0) return;

    setVehicles([...vehicles, newVehicle]);
    setNewVehicle("");
  };

  const removeSparePartByIndex = (index) => {
    let currentSpareParts = [...spareParts];
    currentSpareParts.splice(index, 1);
    setSpareParts(currentSpareParts);
  };

  const removeVehicleByIndex = (index) => {
    let currentVehicles = [...vehicles];
    currentVehicles.splice(index, 1);
    setVehicles(currentVehicles);
  };

  const loadSparePartsFromFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      const loadedSpareParts = contents.split("\n");
      setSpareParts(loadedSpareParts);
    };

    reader.readAsText(file);
  };

  const loadVehiclesFromFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      const loadedVehicles = contents.split("\n");
      setVehicles(loadedVehicles);
    };

    reader.readAsBinaryString(file);
  };

  const processAllData = () => {
    let spare_parts_col = [...spareParts];
    let vehicles_col = [...vehicles];

    setProcessedItems([]);
    setNotProcessedItems([]);

    let counter = 0;
    let total = vehicles_col.length * spareParts.length;

    for (let vehicle_index in vehicles_col) {
      for (let spare_part_index in spare_parts_col) {
        console.log(
          vehicles_col[vehicle_index] + " " + spare_parts_col[spare_part_index]
        );

        processDataExtraction(
          spare_parts_col[spare_part_index],
          vehicles_col[vehicle_index],
          (data) => {
            console.log("data extraction");
            console.log(data);

            counter += 1;

            let percentage = (counter / total) * 100;

            setProgressCounter(percentage + "%");

            if (data.processed) {
              setProcessedItems((processedItems) => [...processedItems, data]);
            } else {
              setNotProcessedItems((notProcessedItems) => [
                ...notProcessedItems,
                data,
              ]);
            }
          }
        );
      }
    }
  };

  const processDataExtraction = (spare_part, vehicle, callback) => {
    /* Extract data from ML API using a middleware */
    let backend_url = "https://ml-explorer.vercel.app/api/handler.py";
    fetch(backend_url, {
      method: "POST",
      body: JSON.stringify({
        spare_part: spare_part,
        vehicle: vehicle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        callback(response);
      });
  };

  const generateCSV = () => {
    fetch("https://ml-explorer.vercel.app/api/buildcsv.py", {
      method: "POST",
      body: JSON.stringify(processedItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "output.csv";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      });
  };

  console.log(processedItems);

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
    </div>
  );
};

export default ExtractorForm;
