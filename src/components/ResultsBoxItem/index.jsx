import PropTypes from "prop-types";

import "./results-box-item.css";

const ResultsBoxItem = ({ children, title }) => {
  return (
    <section className="results-box-item">
      <span className="results-box-title">{title}</span>
      <p className="result-box-processed">Procesados</p>
      {children}
    </section>
  );
};

export default ResultsBoxItem;

ResultsBoxItem.propTypes = {
  title: PropTypes.string.isRequired,
};
