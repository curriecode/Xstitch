import React from "react";

export default function TextInputs(props) {
  return (
    <div className="text-inputs">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Title
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Title"
          aria-describedby="basic-addon1"
          onChange={props.handleTitleChange}
        ></input>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Description
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Description"
          aria-describedby="basic-addon1"
          onChange={props.handleDescriptionChange}
        ></input>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Image URL</span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="URL"
          onChange={event => {
            props.setImageURL(event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}
