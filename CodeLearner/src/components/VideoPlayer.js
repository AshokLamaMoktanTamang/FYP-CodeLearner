// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from 'react-redux'
import { rateCourse } from '../slice/courseSlice'
import AlertMessage from './alertMessage'
import Loading from './loading'
import { useNavigate } from 'react-router-dom'

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

const RatingModal = styled.section`
  & > section {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000077;
    backdrop-filter: blur(3px);
  }

  & > div{
    position: fixed;
    background-color: var(--background-white);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 0.25rem;
    max-width: 300px;
    width: 100%;

    & > h2{
      font-size: 1rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    & > span{
      display: block;
      width: fit-content;
      margin: auto;
    }

    & > button{
      display: block;
      margin: auto;
      margin-top: 1rem;
      padding: .7rem;
      min-width: 100px;
      background-color: var(--text-blue);
      font-weight: bold;
      color: white;
      border: none;
      border-radius: .25rem;
      cursor: pointer;

      :hover{
        filter: brightness(.7);
      }
    }
  }
`

export default function VideoPlayer(props) {
  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // rating count
  const [rating, setRating] = useState(0)
  const [showratingModal, setshowratingModal] = useState(false);

  const HandleVideoEnd = () => {
    setshowratingModal(true)
  }

  // redux
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRating = (rate) => {
    setshowLoading(true)

    dispatch(rateCourse({ courseId: props.courseId, rating: rate })).unwrap().then(() => {
      setshowratingModal(false)
      setshowLoading(false)
      navigate('..')
    }).catch(() => {
      setshowLoading(false)
      setmessage('Failed to rate course')
      setopen(true)
      setRating(0)
      return
    })
  }

  return (
    <Wrapper>
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />

      <video
        onEnded={props.courseId && HandleVideoEnd}
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

      {
        showratingModal &&
        <RatingModal>
          <section onClick={() => setshowratingModal(false)}></section>
          <div>
            <h2>Rate the course?</h2>

            <Rating onClick={handleRating} initialValue={rating} />

            <button>Cancel</button>
          </div>
        </RatingModal>
      }
    </Wrapper>
  )
}
