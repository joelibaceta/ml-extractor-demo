import { useEffect } from "react";
import { useState } from "react";

const useHandleProcessData = () => {
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
  const [showResultsButton, setShowResultsButton] = useState(false);

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
    const spare_parts_col = [...spareParts];
    const vehicles_col = [...vehicles];

    console.log(spare_parts_col, vehicles_col);

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
    const backend_url = "https://ml-explorer.vercel.app/api/handler.py";
    fetch(backend_url, {
      method: "POST",
      body: JSON.stringify({
        spare_part,
        vehicle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        callback(response);
      });
  };

  useEffect(() => {
    if (parseInt(progressCounter.split("%")[0]) === 100) {
      localStorage.setItem(
        "results",
        JSON.stringify([processedItems, notProcessedItems])
      );

      setShowResultsButton(true);

      setTimeout(() => {
        window.scrollTo(0, 1000);
      }, 500);
    }

    // eslint-disable-next-line
  }, [progressCounter]);

  return {
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
  };
};

export default useHandleProcessData;
