// importing the dependencies
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/page'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// importing the react components
import Loading from '../../components/loading'
import AlertMessage from '../../components/alertMessage'
import { fetchCourseById } from '../../slice/courseSlice'
import { addTestPaper, fetchTestPaper } from '../../slice/testPaperSlice'

// styled components
const Wrapper = styled.section`
  max-width: 700px;
  display: block;
  margin: auto;

  & > h2 {
    font-size: 1.3rem;
    line-height: 1.7;
  }

  & > h3 {
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.35;
  }

  & > div {
    margin-top: 1rem;
    background-color: var(--teacher-content-background);
    border-radius: 0.35rem;
    coloe: var(--teacher-white);
    padding: 1rem;

    & > div {
      margin: -1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed var(--teacher-white);

      & > input,
      & > textarea {
        outline: none;
        width: 100%;
        background-color: transparent;
        color: var(--teacher-white);
        border: none;
        transition: 0.15s ease-in-out;
        border-bottom: 2px solid transparent;
        line-height: 1.5;
        text-transform: initial;
      }

      & > input {
        font-size: 1.5rem;
        padding-bottom: 0.3rem;

        :focus {
          border-color: var(--text-light-black);
        }
      }

      & > textarea {
        font-family: inherit;
        margin-top: 0.7rem;
        resize: none;
        padding-bottom: 0.7rem;

        :focus {
          border-color: var(--text-light-black);
        }

        ::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
`

const QuestionWrapper = styled.section`
  & > ul {
    list-style: none;
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 1rem;

    & > li {
      background-color: var(--teacher-content-background);
      padding: 0.7rem;
      border-radius: 0.25rem;
      border: 2px solid var(--light-border-color);

      & > h1 {
        font-size: 1.1rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
        text-transform: initial;
      }

      & > p {
        font-size: 0.9rem;
        display: grid;
        grid-template-columns: 1rem auto;
        grid-gap: 0.7rem;
        align-items: flex-start;
        line-height: 1.5;
        margin-bottom: 0.7rem;
        text-transform: initial;

        & > svg {
          font-size: 0.9rem;
          position: relative;
          top: 0.17rem;
          color: gray;
        }
      }

      & > h2 {
        font-size: 0.9rem;
        background-color: var(--background-black);
        border-radius: 0.25rem;
        overflow: hidden;
        align-items: center;
        width: fit-content;
        display: flex;
        flex-wrap: wrap;
        font-weight: normal;

        & > span {
          font-weight: bold;
          padding: 0.5rem;
          background-color: gray;
          width: 100%;
        }

        & > p {
          padding: 0.5rem;
        }
      }
    }
  }

  & > div {
    display: block;

    & > div {
      display: grid;
      grid-template-columns: auto 285px;
      grid-gap: 1rem;
      align-items: flex-end;
      margin-bottom: 1rem;

      & > textarea {
        font-family: inherit;
        display: block;
        width: 100%;
        padding: 0.7rem 0;
        background-color: transparent;
        border: none;
        resize: none;
        font-weight: bold;
        color: var(--teacher-white);
        border-bottom: 2px solid gray;
        outline: none;
        min-width: 200px;
        text-transform: initial;
        margin-right: 1rem;

        :focus {
          border-color: var(--text-light-black);
        }

        ::-webkit-scrollbar {
          display: none;
        }
      }

      & > label {
        display: flex;
        align-items: flex-end;

        & > span {
          white-space: nowrap;
        }

        & > select {
          padding: 0.5rem;
          outline: none;
          display: -webkit-box;
          text-overflow: ellipsis;
          max-width: 200px;
          width: 100%;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          background-color: var(--teacher-content-background);
          border-color: var(gray);
          color: var(--teacher-white);
          margin-left: 1rem;
          overflow: hidden;

          & > option {
            background-color: var(--background-black);
          }
        }
      }
    }

    & > label {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      & > input {
        width: 100%;
        padding: 0.5rem 0;
        background-color: transparent;
        border: none;
        color: var(--teacher-white);
        border-bottom: 1px solid var(--teacher-content-background);
        outline: none;
        text-transform: initial;

        :focus {
          border-color: var(--text-light-black);
        }
      }

      & > svg {
        font-size: 0.9rem;
        margin-right: 1rem;
        color: var(--btn-color);
      }
    }

    & > section {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      grid-gap: 1rem;

      & > button {
        padding: 0.7rem;
        font-weight: bold;
        outline: none;
        border: none;
        border-radius: 0.25rem;
        min-width: 70px;
        cursor: pointer;
        color: white;
        background-color: var(--pdf-red);

        :hover {
          filter: brightness(0.7);
        }

        :first-child {
          background-color: var(--text-blue);
        }

        :last-child {
          background-color: var(--text-light-black);
        }
      }
    }
  }

  & > button {
    display: inline-block;
    padding: 0.7rem;
    border: none;
    border-radius: 0.15rem;
    font-weight: bold;
    background-color: var(--text-blue);
    color: white;
    cursor: pointer;
    margin-right: 1rem;
    min-width: 100px;

    :hover {
      filter: brightness(0.7);
    }
  }

  @media (max-width: 645px) {
    & > div {
      & > div {
        grid-template-columns: auto;
      }
    }
  }
`

export default function TestPaper() {
  const textAreaRef = useRef(null)
  const questionRef = useRef(null)
  const navigate = useNavigate()

  // params
  const { courseId } = useParams()

  //   form labels
  const [formLabel, setformLabel] = useState('Form Label')
  const [formDescription, setformDescription] = useState('')
  const [questions, setquestions] = useState([])

  //   questions data
  const [options, setOptions] = useState(['Option 1', 'Option 2'])
  const [questionLabel, setquestionLabel] = useState('Enter a question')
  const [answerKey, setanswerKey] = useState(0)

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // question adding states
  const [displayAddQuestion, setdisplayAddQuestion] = useState(false)

  useEffect(() => {
    const textRef = textAreaRef.current
    return () => {
      textRef.style.height = 'auto'
      textRef.style.height = textRef.scrollHeight + 'px'
    }
  }, [formDescription])

  useEffect(() => {
    const ref = questionRef.current
    return () => {
      if (displayAddQuestion) {
        ref.style.height = 'auto'
        ref.style.height = ref.scrollHeight + 'px'
      }
    }
  }, [questionLabel, displayAddQuestion])

  // controllers
  const HandleQuestionSave = (e) => {
    let emptyCounter = 0

    setshowLoading(true)
    if (questionLabel.trim().length < 1) {
      setmessage('Please enter a valid question.')
      setshowLoading(false)
      setopen(true)
      return
    }

    options.map((option) => {
      if (option.trim().length < 1) {
        return (emptyCounter += 1)
      }
      return emptyCounter
    })

    if (emptyCounter > 0) {
      setmessage('Please enter a valid option.')
      setshowLoading(false)
      setopen(true)
      return
    }

    const question = {
      question: questionLabel,
      options,
      answerKey,
    }

    setquestions([...questions, question])

    setOptions(['Option 1', 'Option 2'])
    setquestionLabel('Enter a question')
    setanswerKey(0)

    setdisplayAddQuestion(false)
    setshowLoading(false)
  }

  const HandleSave = (e) => {
    e.preventDefault()

    setshowLoading(true)
    if (formLabel.trim().length < 1) {
      setmessage('Form Label cant be empty')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (formDescription.trim().length < 1) {
      setmessage('Form description cant be empty')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (questions.length < 1) {
      setmessage('Please enter atleast 1 question')
      setshowLoading(false)
      setopen(true)
      return
    }

    dispatch(addTestPaper({ courseId, formLabel, description: formDescription, questions }))
      .unwrap()
      .then(() => {
        navigate('../myCourse')
      })
      .catch((err) => {
        setmessage('Failed to add test paper.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })
  }

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(fetchCourseById(courseId))
    }
  }, [courseId, dispatch])

  const course = useSelector((state) => state.course.course)

  // checking eistence
  useEffect(() => {
    return () => {
      dispatch(fetchTestPaper(courseId))
        .unwrap()
        .then(() => {
          navigate(`../testPaper/detail/${courseId}`)
        })
    }
  }, [navigate, dispatch, courseId])

  return (
    <Page title="Test Paper">
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} theme={'darkAlert'} />
      <Wrapper>
        <h2>Test Paper</h2>
        {course && <h3>{course.course.courseName}</h3>}

        <div>
          <div>
            <input
              type="text"
              placeholder="Enter the label for form"
              onChange={(e) => setformLabel(e.target.value)}
              value={formLabel}
            />
            <textarea
              ref={textAreaRef}
              value={formDescription}
              placeholder="Question description"
              rows={1}
              onChange={(e) => setformDescription(e.target.value)}
            />
          </div>

          <QuestionWrapper>
            <ul>
              {questions.length > 0 &&
                questions.map((question, index) => {
                  return (
                    <li key={index}>
                      <h1>
                        {index + 1}. {question.question}
                      </h1>
                      {question.options.length > 0 &&
                        question.options.map((option, index) => {
                          return (
                            <p key={index}>
                              <Icon icon="ic:outline-radio-button-unchecked" />
                              {option}
                            </p>
                          )
                        })}

                      <h2>
                        <span>Answer Key</span> <p>{question.options[question.answerKey]}</p>
                      </h2>
                    </li>
                  )
                })}
            </ul>

            {displayAddQuestion ? (
              <div>
                <div>
                  <textarea
                    ref={questionRef}
                    rows={1}
                    placeholder="Question"
                    value={questionLabel}
                    onChange={(e) => setquestionLabel(e.target.value)}
                  />
                  <label>
                    <span>Answer Key</span>
                    <select onChange={(e) => setanswerKey(e.target.value)}>
                      {options.map((option, index) => {
                        return (
                          <option value={index} key={index}>
                            {option}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                {options.map((option, index) => {
                  return (
                    <label key={index}>
                      <Icon icon="ic:outline-radio-button-unchecked" />
                      <input
                        type="text"
                        placeholder="Option"
                        value={option}
                        onChange={(e) => {
                          setOptions(
                            options.map((data, i) => {
                              if (index === i) {
                                return e.target.value
                              } else {
                                return data
                              }
                            }),
                          )
                        }}
                      />
                    </label>
                  )
                })}

                <section>
                  <button onClick={() => setOptions([...options, `Option ${options.length + 1}`])}>Add Option</button>
                  <button
                    onClick={() => {
                      setOptions(['Option 1', 'Option 2'])
                      setquestionLabel('Enter a question')
                      setanswerKey(0)
                      setdisplayAddQuestion(false)
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={HandleQuestionSave}>Save</button>
                </section>
              </div>
            ) : (
              <>
                <button onClick={() => setdisplayAddQuestion(true)}>Add Question</button>
                <button onClick={HandleSave}>Save</button>
              </>
            )}
          </QuestionWrapper>
        </div>
      </Wrapper>
    </Page>
  )
}
