import PropTypes from "prop-types";

import "./process-data-button.css";

const ProcessDataButton = ({ processAllData, progressCounter }) => {
  const percentage = parseInt(progressCounter.split("%")[0]);

  return (
    <div className="process-data__container">
      <button className="process-data__button" onClick={processAllData}>
        Procesar
      </button>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: progressCounter }}></div>
      </div>

      <span className="progress-bar__percentage">{percentage}%</span>
    </div>
  );
};

export default ProcessDataButton;

ProcessDataButton.propTypes = {
  processAllData: PropTypes.func.isRequired,
  progressCounter: PropTypes.string.isRequired,
};
