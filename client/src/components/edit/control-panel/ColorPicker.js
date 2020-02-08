import React from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker(props) {
  return (
    <SketchPicker
      color={props.color}
      onChangeComplete={props.onChangeComplete}
    />
  );
}
