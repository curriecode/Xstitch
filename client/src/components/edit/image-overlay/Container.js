import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Box from "./Box";
// import update from "immutability-helper";
const styles = {
  width: "80%",
  height: "100%",
  position: "fixed"
};

const Container = props => {
  const [box, setBox] = useState({
    top: 200,
    left: 80
  });
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      setBox({ top, left });
      return undefined;
    }
  });

  return (
    <div ref={drop} style={{ ...styles, zIndex: props.zIndex }}>
      <Box left={box.left} top={box.top} imageURL={props.imageURL}></Box>
    </div>
  );
};
export default Container;
