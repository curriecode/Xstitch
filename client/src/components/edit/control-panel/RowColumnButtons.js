import React from "react";
import { FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";

export default function RowColumnButtons(props) {
  return (
    <div className="row-column-buttons">
      <button
        className="column-button-add"
        onClick={() => props.modifyGrid("addLeft")}
      >
        <span>+ Column</span>
      </button>
      <div className="row-buttons">
        <button
          className="row-button-add"
          onClick={() => props.modifyGrid("addTop")}
        >
          <span>+ Row</span>
        </button>
        <div className="button-container">
          <button
            className="column-button-delete"
            onClick={() => props.modifyGrid("deleteLeft")}
          >
            <span>- Column</span>
          </button>
          <div className="button-container-inner">
            <button
              className="row-button-delete"
              onClick={() => props.modifyGrid("deleteTop")}
            >
              <span>- Row</span>
            </button>
            <div className="grid-size-container">
              <FaArrowsAltH />
              {props.patternColumns}
            </div>
            <div className="grid-size-container">
              <FaArrowsAltV />
              {props.patternRows}
            </div>
            <button
              className="row-button-delete"
              onClick={() => props.modifyGrid("deleteBottom")}
            >
              <span>- Row</span>
            </button>
          </div>
          <button
            className="column-button-delete"
            onClick={() => props.modifyGrid("deleteRight")}
          >
            <span>- Column</span>
          </button>
        </div>
        <button
          className="row-button-add"
          onClick={() => props.modifyGrid("addBottom")}
        >
          <span>+ Row</span>
        </button>
      </div>
      <button
        className="column-button-add"
        onClick={() => props.modifyGrid("addRight")}
      >
        <span>+ Column</span>
      </button>
    </div>
  );
}
