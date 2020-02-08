import React from 'react'
import Container from './Container'
export default function ImageOverlay(props) {

  return (
    <div>
      <Container zIndex={props.zIndex} imageURL={props.imageURL}/>
    </div>
  )
}