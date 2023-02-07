// importing dependencies
import React from 'react'
import styled from 'styled-components'

// importing the default components
import Thumbnail from '../Images/registration.jpg'

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
      <video src={props.video} poster={props.thumbnail} controls />
    </Wrapper>
  )
}

VideoPlayer.defaultProps = {
  thumbnail: Thumbnail,
}
