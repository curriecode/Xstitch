import React from "react";

export default function RowColumnButtons(props) {
  return (
    <div className="row-column-buttons">
      <div className="column-button-add">+ column</div>
      <div className="row-buttons">
        <div className="row-button-add">+ row</div>
        <div className="button-container">
          <div className="column-button-delete">- column</div>
          <div className="button-container-inner">
            <div className="row-button-delete">- Row</div>
            <div className="grid-size-display"></div>
            <div className="row-button-delete">- Row</div>
          </div>
          <div className="column-button-delete">- column</div>
        </div>
        <div className="row-button-add">+ row</div>
      </div>
      <div className="column-button-add">+ column</div>
    </div>
  );
}
