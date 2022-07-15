import { Link } from "react-router-dom";
import ResultsBoxItem from "../ResultsBoxItem";

import "./results.css";

const Results = () => {
  const [processedItems, notProcessedItems] = JSON.parse(
    localStorage.getItem("results")
  ) || [[], []];

  const generateCSV = (filename, processedOrNotProcessedItems) => {
    fetch("https://ml-explorer.vercel.app/api/buildcsv.py", {
      method: "POST",
      body: JSON.stringify(processedOrNotProcessedItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.csv`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      });
  };

  // console.log(processedItems);

  return (
    <div className="results-container">
      <h2 className="results-title">Resultados</h2>
      <div className="results-box">
        <ResultsBoxItem title="Procesados Correctamente">
          {processedItems.length > 0 && (
            <>
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Mean Price</th>
                    <th>Deviation</th>
                  </tr>
                </thead>
                <tbody>
                  {processedItems.map((item) => (
                    <tr className="results-table__item" key={item.title}>
                      <td>{item.title}</td>
                      <td className="mean-price">
                        <b>$ {item.item.mean.toFixed(2)}</b>
                      </td>
                      <td className="deviation">
                        {" "}
                        +/- $ {item.item.std.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="results-generate-csv-button"
                onClick={() => generateCSV("processed-items", processedItems)}
              >
                Generar CSV
              </button>
            </>
          )}
        </ResultsBoxItem>

        <ResultsBoxItem title="Sin resultados encontrados">
          {notProcessedItems.length > 0 && (
            <>
              <ul>
                {notProcessedItems.map((item) => (
                  <li className="collection-item">{item.title}</li>
                ))}
              </ul>

              <button
                className="results-generate-csv-button"
                onClick={() =>
                  generateCSV("not-processed-items", notProcessedItems)
                }
              >
                Generar CSV
              </button>
            </>
          )}
        </ResultsBoxItem>
      </div>

      <Link to="/" className="results-go-back">
        Volver
      </Link>
    </div>
  );
};

export default Results;
