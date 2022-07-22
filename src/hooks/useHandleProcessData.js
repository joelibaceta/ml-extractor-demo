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

  const processed = JSON.parse(localStorage.getItem("results"))[0] || [];
  const notProcessed = JSON.parse(localStorage.getItem("results"))[1] || [];

  const [vehicles, setVehicles] = useState(["Audi A5"]);
  const [newSparePart, setNewSparePart] = useState("");
  const [newVehicle, setNewVehicle] = useState("");
  const [processedItems, setProcessedItems] = useState(processed);
  const [notProcessedItems, setNotProcessedItems] = useState(notProcessed);
  const [progressCounter, setProgressCounter] = useState(
    parseInt(localStorage.getItem("percentage")) + "%" || "0%"
  );
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

      const filteredLoadedSpareParts = loadedSpareParts.filter(
        (sparePart) => sparePart !== ""
      );

      setSpareParts(filteredLoadedSpareParts);

      localStorage.setItem("percentage", 0);
      setProgressCounter(localStorage.getItem("percentage"));
    };

    reader.readAsText(file);
  };

  const loadVehiclesFromFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      const loadedVehicles = contents.split("\n");

      const filteredLoadedVehicles = loadedVehicles.filter(
        (vehicle) => vehicle !== ""
      );

      setVehicles(filteredLoadedVehicles);
      localStorage.setItem("percentage", 0);
      setProgressCounter(localStorage.getItem("percentage"));
    };

    reader.readAsBinaryString(file);
  };

  const processAllData = () => {
    const spare_parts_col = [...spareParts];
    const vehicles_col = [...vehicles];

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
          // eslint-disable-next-line
          (data) => {
            console.log("data extraction");
            console.log(data);

            counter += 1;

            let percentage = (counter / total) * 100;

            localStorage.setItem("percentage", percentage);

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
    if (
      parseInt(progressCounter.split("%")[0]) > 0 ||
      +localStorage.getItem("percentage") > 0
    ) {
      localStorage.setItem(
        "results",
        JSON.stringify([processedItems, notProcessedItems])
      );

      setShowResultsButton(true);

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
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
