import React from "react";
import Pixel from "./Pixel";

export default function Row(props) {
  const pixels = props.values.map((pixel, index) => {
    return (
      <Pixel
        key={index}
        color={pixel}
        onClick={() => props.updateColor([props.row, index])}
        dragging={props.dragging}
        size={props.size}
      />
    );
  });
  return <div className="row">{pixels}</div>;
}
