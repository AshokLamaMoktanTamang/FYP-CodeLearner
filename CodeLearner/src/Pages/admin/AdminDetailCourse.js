// importing dependencies
import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import RatingCounter from '../../components/ratingCounter'
import VideoPlayer from '../../components/VideoPlayer'
import { useState } from 'react'
import { approveCourse, fetchCourseById, rejectCourse } from '../../slice/courseSlice'
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

        :first-child{
            background-color: var(--text-blue);
            margin-right: 1rem;
        }
      }

      & > a {
        background-color: #fff;
        color: var(--text-black);
        text-decoration: none;
        margin: 0 1rem;

        :last-child{
          margin: 0;
        }
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
          color: var(--text-black);
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

    }
}

.comment-section {
    max-width: 550px;
    
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

    .what-learn {
        border: 0.135rem solid var(--light-border-color);
        margin: 0.5rem 0;
        background-color: var(--background-white);
        max-width: 670px;
        border-radius: 0.5rem;
        padding: 0.7rem;
        margin-right: 1rem;
    
        & > h2 {
          font-size: 1.1rem;
          line-height: 1.35;
          margin-bottom: 0.5rem;
          color: var(--text-black);
        }
    
        & > ul {
          list-style: none;
    
          & > li {
            line-height: 1.3;
            padding-bottom: 0.5rem;
            font-size: 0.835rem;
            color: var(--text-light-black);
            display: grid;
            grid-template-columns: 1.35rem auto;
          }
        }
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

const RejectModal = styled.section`
  & > section{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000070;
    backdrop-filter: blur(3px);
    z-index: 1;
  }

  & > div{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:  var(--background-white);
    z-index: 2;
    padding: 1rem;
    border-radius: .25rem;
    max-width: 450px;
    width: 100%;

    & > h1{
      text-align: center;
      line-height: 1.5;
      margin-bottom: .5rem;
      color: var(--text-black);
    }

    & > textarea {
      resize: none;
      display: block;
      width: 100%;
      line-height: 1.5;
      padding: .7rem;
      font-family: inherit;
      font-size: .875rem;
      margin-bottom: 1rem;

      ::-webkit-scrollbar{
        display: none;
      }
    }

    & > div{
      display: flex;
      flex-wrap: wrap;

      & > button{
        padding: .9rem;
        min-width: 100px;
        cursor: pointer;
        border: none;
        font-weight: bold;
        border-radius: .25rem;
        color: white;
        background-color: var(--teacher-background);

        :hover{
          filter: brightness(.7);
        }

        :first-child{
          background-color: var(--pdf-red);
          margin-right: 1rem;
        }
      }
    }
  }
`

export default function AdminDetailedCourse() {
  const { courseId } = useParams()
  const questionRef = useRef(null)

  // for alerts and loading
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
      if (course && user && course.course.teacherId._id !== user.data._id) {
        navigate('/app/teacher/myCourse')
      }
    }
  }, [course, user, navigate])

  //   controllers 
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectMessage, setrejectMessage] = useState('');

  const HandleDisapprove = () => {
    setshowLoading(true)

    if (rejectMessage === '' || rejectMessage.trim() === '') {
      setmessage('Please enter the rejectmessage')
      setshowLoading(false)
      setopen(true)
      return
    }

    dispatch(rejectCourse({ courseId, message: rejectMessage })).unwrap().then(() => {
      navigate('/app/admin/course')
    }).catch(() => {
      setmessage('Failed to reject course')
      setshowLoading(false)
      setopen(true)
    })
  }

  useEffect(() => {
    const ref = questionRef.current
    return () => {
      if (showRejectModal) {
        ref.style.height = 'auto'
        ref.style.height = ref.scrollHeight + 'px'
      }

    }
  }, [rejectMessage, showRejectModal])

  const HandleApprove = () => {
    setshowLoading(true)
    dispatch(approveCourse(courseId)).unwrap().then(() => {
      navigate('/app/admin/course')
    }).catch(() => {
      setmessage('Failed to approve course')
      setshowLoading(false)
      setopen(true)
    })
  }

  return (
    <Page title={course ? course.course.courseName : 'Unknown'}>
      {
        showRejectModal &&
        <RejectModal>
          <section onClick={() => setShowRejectModal(false)}></section>

          <div>
            <h1>Reject Course</h1>
            <textarea placeholder='Write a reject message.' ref={questionRef} rows='1' onChange={(e) => setrejectMessage(e.target.value)} value={rejectMessage} />

            <div>
              <button onClick={HandleDisapprove}>Reject</button>
              <button onClick={() => setShowRejectModal(false)}>Cancel</button>
            </div>
          </div>
        </RejectModal>
      }

      <Wrapper>
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
                onClick={HandleApprove}
              >
                <Icon icon="material-symbols:order-approve-outline" />
                Approve
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
              >
                <Icon icon="ic:baseline-delete" />
                Reject
              </button>
            </div>

            <section>
              <p>
                <span>Course Name</span>
                {course.course.courseName}
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
            </section>
          </div>
        )}

        <section className="comment-section">
          {
            course && course.course &&
            <div>
              <span>Course Description</span>
              <p>{course.course.courseDescription}</p>
            </div>
          }

          <div className="what-learn">
            <h2>What student will learn?</h2>

            <ul>
              {course &&
                course.course &&
                course.course.learningOutcome.length > 0 &&
                course.course.learningOutcome.map((outcome, index) => {
                  return (
                    <li key={index}>
                      <Icon icon="material-symbols:double-arrow-rounded" />
                      {outcome}
                    </li>
                  )
                })}
            </ul>
          </div>
        </section>
      </Wrapper>
    </Page>
  )
}
