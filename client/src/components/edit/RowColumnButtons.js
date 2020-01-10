import React from "react";

export default function RowColumnButtons(props) {
  return (
    <div className="row-column-buttons">
      <div className="column-button-add" onClick={props.addColumnLeft}>+ Column</div>
      <div className="row-buttons">
        <div className="row-button-add" onClick={props.addRowTop} >+ Row</div>
        <div className="button-container">
          <div className="column-button-delete" onClick={props.deleteColumnLeft}>- Column</div>
          <div className="button-container-inner">
            <div className="row-button-delete" onClick={props.deleteRowTop}>- Row</div>
            <div className="row-button-delete" onClick={props.deleteRowBottom}>- Row</div>
          </div>
          <div className="column-button-delete" onClick={props.deleteColumnRight}>- Column</div>
        </div>
        <div className="row-button-add" onClick={props.addRowBottom}>+ Row</div>
      </div>
      <div className="column-button-add" onClick={props.addColumnRight}>+ Column</div>
    </div>
  );
}