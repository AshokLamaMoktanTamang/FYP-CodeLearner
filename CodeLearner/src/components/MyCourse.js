// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'

// testing component
import CourseImage from '../Images/registration.jpg'
import RatingCounter from './ratingCounter'
import { Link } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import Loading from './loading'
import AlertMessage from './alertMessage'
import { useDispatch } from 'react-redux'
import { DeleteCourse, fetchCoursesByToken } from '../slice/courseSlice'

// styled components
const Wrapper = styled.section`
  position: relative;
  border: 2px solid transparent;
  overflow: hidden;
  border-radius: 0.25rem;
  max-width: 900px;

  :hover {
    border-color: var(--teacher-white);
  }

  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Course = styled(Link)`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 50% 50%;
  background-color: var(--teacher-content-background);
  text-decoration: none;
  color: var(--teacher-white);
  width: 100%;

  & > div {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    & > img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > section {
    padding: 0.7rem;

    & > p,
    & > h2 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.5;
    }

    h2 {
      font-size: 0.97rem !important;
      color: var(--teacher-white);
      -webkit-line-clamp: 3;
      margin-right: 1.5rem;
    }

    & > p {
      -webkit-line-clamp: 7;
      font-size: 0.873rem;
      margin-bottom: 0.7rem;
    }

    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;

      & > span {
        font-weight: bold;
        color: var(--teacher-text-gold);
        margin-right: 0.5rem;
      }
    }
  }

  @media (max-width: 900px) {
    & > div {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 35% 65%;

    & > section > p {
      -webkit-line-clamp: 2;
    }
  }

  @media (max-width: 400px) {
    & > section > p {
      display: none;
    }
  }

  @media (max-width: 300px) {
    display: flex;
    flex-direction: column;

    & > section > p {
      display: block;
    }
  }
`

const Option = styled.section`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  z-index: 9;

  & > button {
    border-radius: 50%;
    width: 1.9rem;
    height: 1.9rem;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    background-color: transparent;
    border: none;

    :hover {
      background-color: var(--teacher-hover-white);
    }

    & > svg {
      color: var(--teacher-white);
      font-size: 1rem;
    }
  }

  & > ul {
    position: absolute;
    right: 0.7rem;
    top: 2.3rem;
    background-color: var(--teacher-white);
    padding: 0.5rem;
    border-radius: 0.17rem;
    list-style: none;

    & > li {
      & > a,
      & > button {
        display: flex;
        align-items: center;
        width: 100%;
        line-height: 1.7;
        background-color: transparent;
        border: none;
        outline: none;
        text-align: left;
        text-decoration: none;
        font-size: 0.875rem;
        color: var(--text-light-black);
        padding: 0.25rem;
        padding-right: 1.7rem;
        cursor: pointer;

        :hover {
          color: var(--text-black);
        }

        & > svg {
          font-size: 1.1rem;
          margin-right: 0.7rem;
        }
      }
    }
  }
`

export default function MyCourse(props) {
  const [showOption, setshowOption] = useState(false)
  const [showConfirmDialog, setshowConfirmDialog] = useState(false)

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  const HandleOption = () => {
    showOption ? setshowOption(false) : setshowOption(true)
  }

  // redux
  const dispatch = useDispatch()

  const HandleDelete = () => {
    setshowConfirmDialog(false)
    setshowLoading(true)
    dispatch(DeleteCourse(props.courseId))
      .unwrap()
      .then(() => {
        dispatch(fetchCoursesByToken())
          .unwrap()
          .catch(() => {
            setmessage('Failed to fetch course')
            setshowLoading(false)
            setopen(true)
          })
      })
      .catch(() => {
        setmessage('Failed to delete course')
        setshowLoading(false)
        setopen(true)
      })
  }

  return (
    <Wrapper>
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />
      <Course to={`/app/teacher/myCourse/${props.courseId}`}>
        <div>
          <img src={props.courseImage} alt={props.courseName} />
        </div>
        <section>
          <h2>{props.courseName}</h2>
          <p>{props.description}</p>
          <div>
            <span>{Math.floor(props.rating * 10) / 10}</span>
            <RatingCounter rating={props.rating} />
            <p>({props.totalRating})</p>
          </div>
          <h2>${props.price}</h2>
        </section>
      </Course>

      <Option>
        <button onClick={HandleOption}>
          <Icon icon="simple-line-icons:options-vertical" />
        </button>

        {showOption && (
          <ul>
            <li>
              <Link to={`/app/teacher/updateCourse/${props.courseId}`}>
                <Icon icon="mdi:lead-pencil" /> Update
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setshowConfirmDialog(true)
                  setshowOption(false)
                }}
              >
                <Icon icon="ic:round-delete" /> Delete
              </button>
            </li>
          </ul>
        )}
      </Option>

      {showOption && <div onClick={HandleOption}></div>}

      {showConfirmDialog && (
        <ConfirmDialog
          status="danger"
          subject="Delete Confirmation"
          message="Are you sure you want to delete this course? After you delete the course you may not be able to recover your course."
          actionLabel="Delete"
          buttonAction={HandleDelete}
          cancel={() => setshowConfirmDialog(false)}
        />
      )}
    </Wrapper>
  )
}

MyCourse.propTypes = {
  courseImage: PropTypes.string,
  courseName: PropTypes.string,
  rating: PropTypes.number,
  totalStudent: PropTypes.number,
  price: PropTypes.number,
}

MyCourse.defaultProps = {
  courseImage: CourseImage,
  courseName: 'Unknown',
  rating: 0,
  totalStudent: 0,
  price: 0,
}
