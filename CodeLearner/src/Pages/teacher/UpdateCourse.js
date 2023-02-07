// importing the dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/page'
import { Icon } from '@iconify/react'

// importing the components
import VideoPlayer from '../../components/VideoPlayer'
import AlertMessage from '../../components/alertMessage'

// importing the test image
import TestImage from '../../Images/registration.jpg'

// styled components
const Wrapper = styled.section`
  & > div {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc(50% - 0.5rem);
    grid-gap: 1rem;
  }

  form {
    max-width: 700px;

    & > label:first-child {
      max-width: 300px;
    }

    & > label {
      display: block;
      margin: 1rem 0;

      & > div {
        max-width: 300px;
        cursor: pointer;

        :hover {
          filter: brightness(0.7);
        }

        & > section {
          width: 100%;
          padding-top: 56.25%;
          position: relative;
          overflow: hidden;
          border-radius: 0.35rem;

          & > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      & > span {
        display: block;
        font-weight: bold;
        font-size: 0.875rem;
        line-height: 1.5;
      }

      & > section {
        background-color: white;
        border-radius: 0.25rem;
        overflow: hidden;
        display: flex;

        & > button {
          background-color: var(--text-blue);
          color: #fff;
          font-weight: bold;
          padding: 0 0.7rem;
          border: none;
          outline: none;
          cursor: pointer;

          :hover {
            filter: brightness(0.9);
          }
        }
      }

      & > input,
      & > textarea,
      & > section > input {
        padding: 0.9rem;
        border-radius: 0.25rem;
        border: none;
        outline: none;
        width: 100%;
      }

      & > textarea {
        resize: none;
        font-family: inherit;
        padding: 0.5rem;
      }
    }

    & > ul {
      list-style: none;

      & > li {
        display: grid;
        grid-template-columns: auto 2.1rem;
        align-items: flex-start;
        background-color: var(--teacher-content-background);
        padding: 0.7rem;
        margin-bottom: 0.7rem;
        border-radius: 0.35rem;

        & > button {
          width: 2.1rem !important;
          height: 2.1rem;
          margin: -0.41rem 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: transparent;
          color: white;
          cursor: pointer;

          :hover {
            background-color: var(--light-border-color);
          }

          & > svg {
            font-weight: bold;
          }
        }
      }
    }

    & > div {
      display: grid;
      grid-auto-flow: column;
      width: fit-content;
      grid-gap: 1rem;

      & > button {
        padding: 0.7rem 1rem;
        border-radius: 0.15rem;
        border: none;
        outline: none;
        background-color: #fff;
        font-weight: bold;
        font-size: 0.875rem;
        cursor: pointer;

        :first-child {
          background-color: var(--text-blue);
          color: white;
        }

        :hover {
          filter: brightness(0.7);
        }
      }
    }
  }

  @media (max-width: 750px) {
    & > div {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`

export default function UpdateCourse() {
  // form datas
  const [thumbnail, setthumbnail] = useState(null)
  const [coursename, setcoursename] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState(0)
  const [learnItem, setlearnItem] = useState('')

  // learning list testing array
  const [learningList, setlearningList] = useState([
    'Better Understand',
    'The Fundamentals',
    'How Programming Works',
    'How Computers Work',
  ])

  // alert message and loading states
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)

  const HandleUpdate = (e) => {
    e.preventDefault()
    console.log(thumbnail, coursename, description, price, learnItem)
  }

  const HandleAddLearningList = () => {
    if (learnItem === null || learnItem.trim().length === 0) {
      setmessage('Please provide a valid data!')
      setstatus('error')
      setopen(true)
      return
    }

    setlearningList((current) => [learnItem, ...current])
    setlearnItem('')
  }

  const DeleteLearningListItem = (i) => {
    setlearningList(learningList.filter((list, index) => index !== i))
  }

  return (
    <Page title="Edit Course">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} theme="darkAlert" />
      <Wrapper>
        <h1>Update Course details</h1>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              <input type="file" hidden onChange={(e) => setthumbnail(e.target.files[0])} />
              <span>Thumbnail</span>
              <div>
                <section>
                  <img src={TestImage} alt="Thumbnail" />
                </section>
              </div>
            </label>

            <label>
              <span>Course Name</span>
              <input
                type="text"
                placeholder="Course Name"
                onChange={(e) => setcoursename(e.target.value)}
                value={coursename}
              />
            </label>
            <label>
              <span>Course Description</span>
              <textarea
                rows={7}
                placeholder="Description"
                onChange={(e) => setdescription(e.target.value)}
                value={description}
              />
            </label>
            <label>
              <span>Price</span>
              <input
                type="number"
                min={1}
                onChange={(e) => setprice(e.target.value)}
                placeholder="Price"
                value={price}
              />
            </label>
            <label>
              <span>What will student learn?</span>
              <section>
                <input
                  type="search"
                  placeholder="What will student learn?"
                  onChange={(e) => setlearnItem(e.target.value)}
                  value={learnItem}
                />
                <button onClick={HandleAddLearningList}>Add</button>
              </section>
            </label>
            <ul>
              {learningList.map((e, index) => (
                <li key={index}>
                  <p>{e}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      DeleteLearningListItem(index)
                    }}
                  >
                    <Icon icon="akar-icons:cross" />
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <button onClick={HandleUpdate}>Update</button>
              <button>Reset</button>
            </div>
          </form>

          <div>
            <VideoPlayer />
          </div>
        </div>
      </Wrapper>
    </Page>
  )
}
