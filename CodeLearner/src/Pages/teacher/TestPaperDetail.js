// importing the dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/page'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// importing the react components
import Loading from '../../components/loading'
import AlertMessage from '../../components/alertMessage'
import { deleteTestPaper, fetchTestPaper } from '../../slice/testPaperSlice'
import { fetchCourseById } from '../../slice/courseSlice'
import ConfirmDialog from '../../components/ConfirmDialog'

// styled components
const Wrapper = styled.section`
  max-width: 700px;
  margin: auto;
  display: block;

  & > h1 {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  & > p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.7rem;
    color: gray;
    border-bottom: 1px dashed var(--teacher-content-background);
    padding-bottom: 0.5rem;
  }

  & > div {
    background-color: var(--teacher-content-background);
    padding: 0.7rem;
    border-radius: 0.25rem;
    border: 2px solid var(--light-border-color);
    margin-top: 1.5rem;

    & > h1 {
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    & > ul {
      list-style: none;

      & > li {
        font-size: 0.9rem;
        display: grid;
        grid-template-columns: 1rem auto;
        grid-gap: 0.7rem;
        align-items: flex-start;
        line-height: 1.5;
        margin-bottom: 0.7rem;

        & > svg {
          font-size: 0.9rem;
          position: relative;
          top: 0.17rem;
          color: gray;
        }
      }
    }

    & > p {
      display: grid;
      margin: 0 -0.7rem -0.7rem;
      background-color: var(--teacher-content-background);
      padding: 0.7rem;
      border-top: 1px solid var(--dark-border-color);
      grid-template-columns: 3.5rem auto;
      grid-gap: 1rem;

      & > span {
        font-weight: bold;
        color: var(--background-white);
      }
    }
  }

  & > button {
    display: block;
    padding: 0.7rem;
    min-width: 100px;
    margin-top: 2.1rem;
    background-color: var(--pdf-red);
    border: none;
    outline: none;
    color: #fff;
    font-size: 1rem;
    border-radius: 0.15rem;
    cursor: pointer;
    letter-spacing: 1px;

    :hover {
      filter: brightness(0.7);
    }
  }
`

export default function TestPaperDetail() {
  // params
  const { courseId } = useParams()

  // for alerts and loading
  const [showConfirmDialog, setshowConfirmDialog] = useState(false)
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  //   redux and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      dispatch(fetchCourseById(courseId))
        .unwrap()
        .then(() => {
          dispatch(fetchTestPaper(courseId))
            .unwrap()
            .catch(() => {
              navigate('/app/teacher/myCourse')
            })
        })
        .catch(() => {
          navigate('/app/teacher/myCourse')
        })
    }
  }, [dispatch, courseId, navigate])

  const testPaper = useSelector((state) => state.testPaper.testPaper)
  const course = useSelector((state) => state.course.course)

  // controller
  const HandleDelete = (e) => {
    e.preventDefault()

    setshowLoading(true)
    dispatch(deleteTestPaper(courseId))
      .unwrap()
      .then(() => {
        navigate('/app/teacher/myCourse')
      })
      .catch((err) => {
        setmessage('Failed to delete test paper.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })
  }

  return (
    <Page title="Test Paper">
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} theme={'darkAlert'} />
      {showConfirmDialog && (
        <ConfirmDialog
          status="danger"
          subject="Delete Confirmation"
          message="Are you sure you want to delete this test paper? After you delete the testpaper you may not be able to recover your questions."
          actionLabel="Delete"
          buttonAction={HandleDelete}
          cancel={() => setshowConfirmDialog(false)}
        />
      )}

      <Wrapper>
        <h1>Test Paper {'>'} {course && course.course.courseName}</h1>

        <p>{course && course.course.courseDescription}</p>

        {testPaper && (
          <>
            <h1>{testPaper.testPaper.formLabel}</h1>
            <p>{testPaper.testPaper.description}</p>

            {testPaper.testPaper.questions.map((question, i) => {
              return (
                <div key={i}>
                  <h1>
                    {i + 1}. {question.question}
                  </h1>

                  <ul>
                    {question.options.map((option, index) => {
                      return (
                        <li key={index}>
                          <Icon icon="ic:outline-radio-button-unchecked" /> {option}
                        </li>
                      )
                    })}
                  </ul>

                  <p>
                    <span>Answer</span>
                    {question.options[question.answerKey]}
                  </p>
                </div>
              )
            })}
          </>
        )}

        <button onClick={() => setshowConfirmDialog(true)}>Delete</button>
      </Wrapper>
    </Page>
  )
}
