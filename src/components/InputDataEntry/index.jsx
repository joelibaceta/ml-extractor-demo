import PropTypes from "prop-types";

import "./input-data-entry.css";

const InputDataEntry = ({
  handleChangeFunction,
  load_type_id,
  title,
  handleAddNewItem,
  listItems,
  removeItem,
  handleInputTextEntry,
  inputTextValue,
  placeholderText,
}) => {
  return (
    <section className="input-data-entry">
      <h2 className="input-data-entry__title">{title}</h2>
      <div className="input-data-entry__content">
        <form onSubmit={handleAddNewItem}>
          <label
            className="input-data-entry__label"
            htmlFor={`${load_type_id}`}
          >
            Cargar archivo de datos
          </label>
          <input
            type="file"
            id={`${load_type_id}`}
            style={{ display: "none" }}
            onChange={handleChangeFunction}
            accept={
              "text/plain, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            }
          ></input>

          <div className="input-data-entry__input-container">
            <input
              type="text"
              value={inputTextValue}
              onChange={handleInputTextEntry}
              placeholder={placeholderText}
              className="input-data-entry__input-text"
            />
            <button type="submit" className="input-data-entry__add-item-button">
              Agregar
            </button>
          </div>
        </form>

        <ul className="input-data-entry__list">
          {listItems.map((item, index) => (
            <li className="input-data-entry__list-item" key={index}>
              <span>{item}</span>
              <button
                className="input-data-entry__remove-item-button"
                onClick={() => removeItem(index)}
              >
                <span>Eliminar</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InputDataEntry;

InputDataEntry.propTypes = {
  handleChangeFunction: PropTypes.func.isRequired,
  load_type_id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleAddNewItem: PropTypes.func.isRequired,
  listItems: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleInputTextEntry: PropTypes.func.isRequired,
  inputTextValue: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
};
