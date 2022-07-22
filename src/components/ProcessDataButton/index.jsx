import PropTypes from "prop-types";

import "./process-data-button.css";

const ProcessDataButton = ({ processAllData, progressCounter, disabled }) => {
  const percentage =
    parseInt(localStorage.getItem("percentage")) ||
    parseInt(progressCounter.split("%")[0]);

  return (
    <div className="process-data__container">
      <button
        className="process-data__button"
        onClick={processAllData}
        disabled={disabled}
      >
        Procesar
      </button>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: localStorage.getItem("percentage")
              ? localStorage.getItem("percentage") + "%"
              : progressCounter,
          }}
        ></div>
      </div>

      <span className="progress-bar__percentage">{percentage}%</span>
    </div>
  );
};

export default ProcessDataButton;

ProcessDataButton.propTypes = {
  processAllData: PropTypes.func.isRequired,
  progressCounter: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
