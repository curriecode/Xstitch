import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import babyYoda from "./baby-yoda.JPG"
const style = {
  position: 'absolute',
  cursor: 'move',
}
const Box = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {children}
      <img src={babyYoda} />
    </div>
  )
}
export default Box