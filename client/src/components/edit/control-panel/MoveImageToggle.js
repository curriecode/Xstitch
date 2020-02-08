import React from "react";

export default function MoveImageToggle(props) {
  return (
    <label htmlFor="moveImage">
      <input
        id="moveImage"
        type="checkbox"
        checked={props.moveImage}
        onChange={props.toggle}
      />
      <small>Move image</small>
    </label>
  );
}
