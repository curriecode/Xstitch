import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
const styles = {
  width: '80%',
  height: '100%',
  position: 'fixed'
}
const Container = (props) => {
  const [boxes, setBoxes] = useState({
    a: { top: 200, left: 80 },
    // b: { top: 180, left: 20 },
  })
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveBox(item.id, left, top)
      return undefined
    },
  })
  const moveBox = (id, left, top) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
  }


  return (
    <div ref={drop} style={{...styles, zIndex: props.zIndex}}>
      {Object.keys(boxes).map(key => {
        const { left, top } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
          >
          </Box>
        )
      })}
    </div>
  )
}
export default Container