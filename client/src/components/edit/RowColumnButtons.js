import React from "react";

export default function RowColumnButtons(props) {
  return (
    <div className="row-column-buttons">
      <button className="column-button-add" onClick={props.addColumnLeft}>
        <span>+ Column</span>
      </button>
      <div className="row-buttons">
        <button className="row-button-add" onClick={props.addRowTop}>
          <span>+ Row</span>
        </button>
        <div className="button-container">
          <button
            className="column-button-delete"
            onClick={props.deleteColumnLeft}
          >
            <span>- Column</span>
          </button>
          <div className="button-container-inner">
            <button className="row-button-delete" onClick={props.deleteRowTop}>
              <span>- Row</span>
            </button>
            <button
              className="row-button-delete"
              onClick={props.deleteRowBottom}
            >
              <span>- Row</span>
            </button>
          </div>
          <button
            className="column-button-delete"
            onClick={props.deleteColumnRight}
          >
            <span>- Column</span>
          </button>
        </div>
        <button className="row-button-add" onClick={props.addRowBottom}>
          <span>+ Row</span>
        </button>
      </div>
      <button className="column-button-add" onClick={props.addColumnRight}>
        <span>+ Column</span>
      </button>
    </div>
  );
}
