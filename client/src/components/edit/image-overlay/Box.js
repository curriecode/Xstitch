import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
  position: 'absolute',
  cursor: 'move',
}
const Box = ({ left, top, imageURL }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { left, top, type: ItemTypes.BOX },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
      <img src={imageURL} />
    </div>
  )
}
export default Box