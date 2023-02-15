// importing dependencies
import React from 'react'
import styled from 'styled-components'

// styled components
const Wrapper = styled.section`
  position: relative;
  display: flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;

  & > video {
    transition: 0.15s ease-in-out;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

export default function VideoPlayer(props) {
  return (
    <Wrapper>
      <video
        src={
          props.video && props.type === 'blob'
            ? props.video
            : `${process.env.REACT_APP_SERVER_BASE_URL}/course/${props.video}`
        }
        poster={
          props.thumbnail && props.type === 'blob'
            ? props.thumbnail
            : `${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${props.thumbnail}`
        }
        controls
      />
    </Wrapper>
  )
}
