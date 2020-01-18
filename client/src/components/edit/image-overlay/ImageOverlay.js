import React, { useCallback, useState, useEffect } from 'react'
import Container from './Container'
export default function ImageOverlay() {
  const [moveImage, setMoveImage] = useState(true);
  const [zIndex, setzIndex] = useState(1000)
  const toggle = useCallback(() => setMoveImage(!moveImage), [
    moveImage,
  ])

  useEffect(() => {
    if (moveImage) {
      setzIndex(1000);
    } else {
      setzIndex(0);
    }
  }, [moveImage])

  return (
    <div>
      <Container zIndex={zIndex}/>
      <label htmlFor="moveImage" style={{ zIndex: 1001, position: 'fixed'}}>
          <input
            id="moveImage"
            type="checkbox"
            checked={moveImage}
            onChange={toggle}
          />
          <small>Move image</small>
        </label>
    </div>
  )
}