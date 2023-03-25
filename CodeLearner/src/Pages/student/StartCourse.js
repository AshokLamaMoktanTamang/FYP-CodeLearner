// importing dependencies
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Comment from '../../components/Comment'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import RatingCounter from '../../components/ratingCounter'
import VideoPlayer from '../../components/VideoPlayer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fetchCourseById } from '../../slice/courseSlice'
import { addComments, fetchComments } from '../../slice/commentSlice'
import { testPaperExistence } from '../../slice/testPaperSlice'
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

      & > a {
        font-weight: bold;
        padding: 0.5rem 0.7rem;
        border-radius: 0.17rem;
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: var(--text-blue);
        color: #fff;
        text-decoration: none;

        :hover {
          filter: brightness(0.7);
        }

        & > svg {
          font-size: 1rem;
          margin-right: 0.5rem;
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
      background-color: var(--background-white);
      padding: 0.5rem;
      border-radius: 0.17rem;
      border: 1px solid var(--light-border-color);
      
      & > div {
        margin-right: 0.5rem;
        
        & > svg {
          font-size: 3rem;
          color: #000000;
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
        border: 1px solid var(--light-border-color);

        & > textarea,
        & > button {
          border: none;
          outline: none;
        }

        & > input {
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
          cursor: pointer;

          :hover{
            filter: brightness(.7);
          }

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

      & > div{
        background-color: var(--background-white);
        border: 1px solid var(--light-border-color);

        & > section{
            & > div{
                & > svg{
                    color: #000;
                }
            }
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

export default function StartCourse() {
  const { courseId } = useParams()

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // states
  const [commentInput, setcommentInput] = useState('');
  const [testPaperExist, settestPaperExist] = useState(false);

  // redux and navigate
  const dispatch = useDispatch()
  useEffect(() => {
    setshowLoading(true)
    dispatch(fetchCourseById(courseId))
    dispatch(fetchComments({ courseId }))
    dispatch(testPaperExistence(courseId)).unwrap().then((data) => {
      console.log(data);
      settestPaperExist(true)
    }).catch(() => {
      settestPaperExist(false)
    })
    setshowLoading(false)
  }, [dispatch, courseId])

  // controllers
  const [sendingComment, setsendingComment] = useState(false);

  const HandleAddComment = (e) => {
    e.preventDefault();

    if (commentInput.trim().length < 1) {
      return
    }

    setsendingComment(true)
    dispatch(addComments({ courseId, comment: commentInput })).unwrap().then(() => {
      setcommentInput('')
      setsendingComment(false)
      return
    }).catch(() => {
      setmessage("Failed to add comment")
      setopen(true)
      setsendingComment(false)
      return
    })
  }

  const course = useSelector((state) => state.course.course)
  const user = useSelector((state) => state.user.user)
  const comment = useSelector((state) => state.comment.comments)

  return (
    <Page title={course ? course.course.courseName : 'Unknown'}>
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
              {
                testPaperExist &&
                <Link to={`/app/course/testPaper/${courseId}`}>
                  <Icon icon="file-icons:test-js" />
                  Test Paper
                </Link>
              }
            </div>

            <section>
              <p>
                <span>Course Name</span>
                {course.course.courseName}
              </p>
              <section>
                <span>Rating</span>
                <div>
                  <span>{course.course.avgRating}</span>
                  <RatingCounter rating={course.course.avgRating} />
                  <p>({course.course.ratings.length})</p>
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
          <h1>{comment && comment.length > 0 ? `Comment - ${comment.length}` : `No Comment`}</h1>

          <form onSubmit={HandleAddComment}>
            <div>
              {
                user && user.data.profilePic ?
                  <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${user.data.profilePic}`} alt="profile" /> :
                  <Icon icon="carbon:user-avatar-filled" />
              }
            </div>

            <section>
              <input placeholder="Comment your thought" type='text' value={commentInput} onChange={(e) => setcommentInput(e.target.value)} />
              <button>
                {
                  sendingComment ?
                    <Icon icon="eos-icons:loading" />
                    :
                    <Icon icon="zondicons:send" />
                }
              </button>
            </section>
          </form>

          {
            comment && comment.length > 0 ?
              <div>
                {
                  comment.map((data, index) => {
                    return <Comment
                      key={index}
                      message={data.comment}
                      userName={data.user.firstName + ' ' + data.user.lastName}
                      profilePic={data.user.profilePic}
                      uploadDate={(new Date().getDate() - new Date(data.createdAt).getDate())}
                    />
                  })
                }
              </div> :

              <section>
                <p>
                  <Icon icon="fluent-emoji-high-contrast:magnifying-glass-tilted-left" />
                  No comments
                </p>
              </section>
          }
        </section>
      </Wrapper>
    </Page>
  )
}
