// importing the dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/page'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'

// importing the react components
import Loading from '../../components/loading'
import AlertMessage from '../../components/alertMessage'
import { fetchTestPaperForStudent } from '../../slice/testPaperSlice'

// styled components
const Wrapper = styled.section`
  display: block;

  & > h1 {
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    color: var(--text-black);
    
    :first-child{
      color: var(--text-blue);
    }
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
    padding: 0.7rem;
    border-radius: 0.25rem;
    border: 2px solid var(--light-border-color);
    max-width: 700px;
    margin: auto;
    padding-top: 0;
    margin-top: 1.5rem;
    overflow: hidden;
    
    & > section{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: var(--opacity-text-blue);
      border: 2px solid var(--text-blue);
      border-radius: .25rem;
      color: var(--text-black);
      padding: 1rem;
      margin: 0 -.7rem;
      margin-bottom: 1rem;
      font-size: .835rem;
      font-weight: bold;
    }
    
    & > h1 {
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    & > label{
      font-size: 0.9rem;
      display: grid;
      grid-template-columns: 1rem auto;
      grid-gap: 0.7rem;
      align-items: center;
      line-height: 1.5;
      margin-bottom: 0.7rem;
      padding: 1rem;
      border: 1px solid black;
      border-radius: .25rem;
      cursor: pointer;
      background-color: var(--background-white);

      :hover{
        filter: brightness(.9);
      }

      & > input {
        margin-right: 1rem;
        appearance: none;
        border: 0.11rem solid var(--background-black);
        border-radius: 50%;
        height: 1.1rem;
        width: 1.1rem;
      }

      & > input:checked {
        background-color: var(--background-black);
        position: relative;
      }

      & > input:checked::before {
        position: absolute;
        content: '';
        width: 50%;
        height: 50%;
        border-radius: 50%;
        border: 0.15rem solid white;
        background-color: var(--background-black);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    & > button {
      display: block;
      float: right;
      padding: 0.7rem;
      min-width: 100px;
      background-color: var(--text-blue);
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
  }

  .checked{
    background-color: var(--opacity-sucess-green);
    border-color: var(--sucess-green);
  }
`

const ResultWrapper = styled.section`
max-width: 700px;
margin: auto;
display: block;
padding: 0 1rem;
margin-bottom: 1.9rem;
width: 100%;

& > h2 {
  font-size: 1.25rem;
  line-height: 1.5;
  text-align: center;
}

& > p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.7rem;
  color: var(--text-black);
  font-weight: bold;
  text-align: center;
}

& > section{
  width: 5rem;
  height: 5rem;
  margin: auto;
  display: grid;
  align-items: center;
  flex-direction: column;
  border: 2px solid var(--text-black);
  border-radius: 50%;

  & > p{
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    :first-child{
      border-bottom: 2px solid var(--text-black);
    }
  }
}

& > div {
  padding: 0.7rem;
  border-radius: 0.25rem;
  border: 2px solid var(--light-border-color);
  margin-top: 1.5rem;
  width: 100%;

  & > span{
    display: block;
    float: right;
    padding: 0.5rem 0.7rem;
    color: var(--text-black);
    font-size: .835rem;
    font-weight: bold;
    border-radius: 0.25rem;
    margin-right: -0.7rem;
    margin-top: -0.7rem;
    border: 1px solid;
  }

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
      padding: 1rem;
      border: 1px solid var(--text-black);
      border-radius: 0.25rem;

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

.marked{
  background-color: var(--opacity-text-blue);
  border-color: var(--text-blue);
}

.correct{
  background-color: var(--opacity-sucess-green);
  border-color: var(--sucess-green);
}

.incorrect{
  background-color: var(--opacity-pdf-red);
  border-color: var(--pdf-red);
}
`

export default function TakeTest() {
  // params
  const { courseId } = useParams()

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  //   redux and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      setshowLoading(true)
      dispatch(fetchTestPaperForStudent(courseId))
        .unwrap()
        .then(() => {
          setshowLoading(false)
        })
        .catch(() => {
          navigate('/app/teacher/myCourse')
        })
    }
  }, [dispatch, courseId, navigate])

  const testPaper = useSelector((state) => state.testPaper.testPaper)

  // controller
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answerHist, setanswerHist] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      setmessage("Please select atleast one answer")
      setopen(true)
      return
    }

    if (testPaper && selectedOption === testPaper.testPaper.questions[questionIndex].answerKey) {
      setScore(score + 1);
    }

    const answer = {
      realAns: testPaper.testPaper.questions[questionIndex].answerKey,
      givenAns: selectedOption
    }

    setanswerHist([...answerHist, answer])

    setSelectedOption(null);
    setQuestionIndex(questionIndex + 1);
  };

  if (testPaper && questionIndex >= testPaper.testPaper.questions.length) {
    return (
      <ResultWrapper>
        <h2>Test completed!</h2>
        <p>Score</p>

        <section>
          <p>{score}</p>
          <p>{testPaper.testPaper.questions.length}</p>
        </section>

        {testPaper.testPaper.questions.map((question, i) => {
          return (
            <div key={i}>
              <span className={answerHist[i].realAns === answerHist[i].givenAns ? "correct" : "incorrect"}>{answerHist[i].realAns === answerHist[i].givenAns ? "Correct" : "Wrong"}</span>
              <h1>
                {i + 1}. {question.question}
              </h1>

              <ul>
                {question.options.map((option, index) => {
                  return (
                    <li key={index} className={answerHist[i].realAns === answerHist[i].givenAns ? answerHist[i].realAns === index ? "marked" : "notchoosed" : answerHist[i].givenAns === index ? "incorrect" : answerHist[i].realAns === index ? "correct" : "notchoosed"}>
                      <Icon icon="ic:outline-radio-button-unchecked" /> {option}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </ResultWrapper>
    );
  }

  const question = testPaper && testPaper.testPaper.questions[questionIndex]

  return (
    <Page title="Test Paper">
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />

      <Wrapper>
        {testPaper && (
          <>
            <h1>Test Paper {'>'} {testPaper.testPaper.courseId.courseName}</h1>
            <h1>{testPaper.testPaper.formLabel}</h1>
            <p>{testPaper.testPaper.description}</p>

            <div>
              <section>
                <p>
                  Total Question : <span>{testPaper.testPaper.questions.length}</span>
                </p>

                <p>
                  Marks : <span>{`${score} / ${testPaper.testPaper.questions.length}`}</span>
                </p>
              </section>

              <h1>
                {questionIndex + 1}. {question.question}
              </h1>

              {question.options.map((option, index) => {
                return (
                  <label key={index} className={selectedOption === index ? 'checked' : ''}>
                    <input type='radio' value={index} checked={selectedOption === index} onChange={() => handleOptionSelect(index)} />
                    {option}
                  </label>
                )
              })}

              <button onClick={handleNextQuestion}>Next</button>
            </div>
          </>
        )}
      </Wrapper>
    </Page>
  )
}
