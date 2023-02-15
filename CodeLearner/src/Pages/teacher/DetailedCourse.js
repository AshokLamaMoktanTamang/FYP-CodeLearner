// importing dependencies
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Comment from '../../components/Comment'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import RatingCounter from '../../components/ratingCounter'
import VideoPlayer from '../../components/VideoPlayer'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../../components/ConfirmDialog'
import { useState } from 'react'
import { DeleteCourse, fetchCourseById } from '../../slice/courseSlice'
import Loading from '../../components/loading'
import AlertMessage from '../../components/alertMessage'

// styled components
const Wrapper = styled.section`
  display: grid;
  padding: 0.2rem;
  grid-template-columns: 700px auto;
  grid-gap: 3rem;

  & > div {
    max-width: 700px;

    & > h1 {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 0.5rem;
    }

    & > div:first-child {
      margin-bottom: 1rem;
      width: 100%;
      overflow: hidden;
      background-color: var(--teacher-content-background);
      border-radius: 0.5rem;
      position: relative;
    }

    & > div:nth-child(3) {
      margin: 1rem 0;
      display: flex;
      flex-wrap: wrap;

      & > button,
      & > a {
        font-weight: bold;
        padding: 0.5rem 0.7rem;
        border: none;
        border-radius: 0.17rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        line-height: 1.5;

        :hover {
          filter: brightness(0.7);
        }

        & > svg {
          font-size: 1rem;
          margin-right: 0.5rem;
        }
      }

      & > button {
        outline: none;
        background-color: var(--pdf-red);
        color: white;
        margin-right: 1rem;
      }

      & > a {
        background-color: #fff;
        color: var(--text-black);
        text-decoration: none;
      }
    }

    & > section {
      & > section {
        border-bottom: 1px dashed var(--teacher-content-background);
        padding-bottom: 1rem;
      }

      & > p,
      & > section {
        display: grid;
        grid-template-columns: 110px auto;
        line-height: 1.5;
        margin-bottom: 0.9rem;
        color: gray;
        font-size: 0.875rem;

        & > span:first-child {
          color: var(--teacher-white);
        }

        & > div {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          & > span {
            font-weight: bold;
            color: var(--teacher-text-gold);
            margin-right: 0.5rem;
          }
        }
      }

      & > div {
        margin-top: 1rem;
        display: block;
        line-height: 1.5;

        & > span {
          display: block;
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        & > p {
          color: gray;
          font-size: 0.875rem;
        }
      }
    }
  }

  .comment-section {
    max-width: 550px;

    h1 {
      font-size: 1.1rem;
      line-height: 1.7;
    }

    & > form {
      display: flex;
      width: 100%;
      margin-top: 0.5rem;
      align-items: center;
      background-color: var(--teacher-content-background);
      padding: 0.5rem;
      border-radius: 0.17rem;

      & > div {
        margin-right: 0.5rem;

        & > svg {
          font-size: 3rem;
          color: #ffffff;
        }

        & > img {
          width: 3rem;
          height: 3rem;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      & > section {
        display: flex;
        width: 100%;
        border-radius: 0.15rem;
        overflow: hidden;

        & > textarea,
        & > button {
          border: none;
          outline: none;
        }

        & > textarea {
          width: 100%;
          width: -webkit-fill-available;
          width: -moz-available;
          padding: 0.7rem;
          color: var(--text-black);
          font-family: inherit;
          resize: none;
        }

        & > button {
          padding: 0.7rem 0.9rem;
          background-color: var(--hover-purple);

          & > svg {
            color: #ffffff;
            font-size: 1rem;
          }
        }
      }
    }

    & > div {
      margin-top: 1rem;
      display: grid;
      grid-gap: 1rem;
    }
  }

  @media (max-width: 1190px) {
    display: block;

    .comment-section {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px dashed var(--teacher-content-background);
      max-width: 700px;
    }
  }
`

export default function DetailedCourse() {
  const { courseId } = useParams()

  // for alerts and loading
  const [showConfirmDialog, setshowConfirmDialog] = useState(false)
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // redux and navigate
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  useEffect(() => {
    setshowLoading(true)
    dispatch(fetchCourseById(courseId))
    setshowLoading(false)
  }, [dispatch, courseId])

  const course = useSelector((state) => state.course.course)

  useEffect(() => {
    return () => {
      if (course && user && course.course.teacherId !== user.data._id) {
        navigate('/app/teacher/myCourse')
      }
    }
  }, [course, user, navigate])

  const HandleDelete = () => {
    setshowLoading(true)
    dispatch(DeleteCourse(courseId))
      .unwrap()
      .then(() => {
        navigate('/app/teacher/myCourse')
      })
      .catch(() => {
        setmessage('Failed to delete course')
        setshowLoading(false)
        setopen(true)
      })
  }

  return (
    <Page title={course ? course.course.courseName : 'Unknown'}>
      <Wrapper>
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
        {showLoading && <Loading />}
        <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />

        {course && course.course && (
          <div>
            <h1>Detailed Description - {course.course.courseName}</h1>

            <div>
              <VideoPlayer video={course.course.courseFile} thumbnail={course.course.thumbnail} />
            </div>

            <div className="button-container">
              <button
                onClick={() => {
                  setshowConfirmDialog(true)
                }}
              >
                <Icon icon="ic:baseline-delete" />
                Delete
              </button>
              <Link to={`/app/teacher/updateCourse/${courseId}`}>
                <Icon icon="mdi:pencil" />
                Edit
              </Link>
            </div>

            <section>
              <p>
                <span>Course Name</span>
                {course.course.courseName}
              </p>
              <p>
                <span>Total Student</span>
                100
              </p>
              <p>
                <span>Status</span>
                <span>
                  <Icon icon="mdi:account-pending" /> {course.course.status}
                </span>
              </p>
              <section>
                <span>Rating</span>
                <div>
                  <span>3.1</span>
                  <RatingCounter rating={3.1} />
                  <p>(15)</p>
                </div>
              </section>
              <div>
                <span>Course Description</span>
                <p>{course.course.courseDescription}</p>
              </div>
            </section>
          </div>
        )}

        <section className="comment-section">
          <h1>Comment - 7</h1>

          <form>
            <div>
              {/* <img src={TestImage} alt="profile" /> */}
              <Icon icon="carbon:user-avatar-filled" />
            </div>

            <section>
              <textarea placeholder="Comment your thought" rows={1} />
              {/* <textarea cols="30" rows="10"></textarea> */}
              <button>
                <Icon icon="zondicons:send" />
              </button>
            </section>
          </form>

          <div>
            <Comment
              message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa "
              userName="San Diego"
              uploadDate={'1 Day'}
            />
            <Comment
              message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa "
              userName="San Diego"
              uploadDate={'1 Day'}
            />
          </div>
        </section>
      </Wrapper>
    </Page>
  )
}
