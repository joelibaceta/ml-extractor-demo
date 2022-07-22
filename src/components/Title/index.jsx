import "./title.css";

const Title = () => {
  return (
    <div className="title__container">
      <span className="title">ML Data Extractor</span>
      <p className="description">
        Use esta herramienta para generar un archivo csv con la estimación de
        precios de autopartes
      </p>
    </div>
  );
};

export default Title;
