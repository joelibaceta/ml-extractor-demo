import ResultsBoxItem from "../ResultsBoxItem";

import "./results.css";

const Results = (/*{ processedItems, notProcessedItems }*/) => {
  const processedItems = [];
  const notProcessedItems = [];
  const generateCSV = () => {};

  return (
    <>
      <div className="results-container">
        <h2 className="results-container__title">Resultados</h2>

        <div className="results-box">
          <ResultsBoxItem title="Procesados Correctamente">
            <table>
              <thead>
                <th>Item</th>
                <th>Mean Price</th>
                <th>Deviation</th>
              </thead>
              {processedItems.map((item) => (
                <tbody>
                  <tr className="collection-item">
                    <td>{item.title}</td>
                    <td>
                      <b>$ {item.item.mean.toFixed(2)}</b>
                    </td>
                    <td> +/- $ {item.item.std.toFixed(2)}</td>
                  </tr>
                </tbody>
              ))}
            </table>

            <button onClick={generateCSV}>Generar CSV</button>
          </ResultsBoxItem>

          <ResultsBoxItem title="Sin resultados encontrados">
            {notProcessedItems.map((item) => (
              <li className="collection-item">{item.title}</li>
            ))}
          </ResultsBoxItem>
        </div>
      </div>
    </>
  );
};

export default Results;
