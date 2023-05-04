// importing the dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/page'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

// importing the components
import VideoPlayer from '../../components/VideoPlayer'
import AlertMessage from '../../components/alertMessage'
import { fetchCourseById, updateCourseById } from '../../slice/courseSlice'
import Loading from '../../components/loading'

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
  // parameters
  const { courseId } = useParams()

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

  // redux and user checking
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
    if (course && user && course.course.teacherId._id !== user.data._id) {
      console.log(course , user , course.course.teacherId._id , user.data._id);
      navigate('/app/teacher/myCourse')
    }
  }, [course, user, navigate])

  // assigning the default values
  const [thumbType, setthumbType] = useState(null)
  useEffect(() => {
    return () => {
      if (course) {
        setcoursename(course.course.courseName)
        setdescription(course.course.courseDescription)
        setprice(course.course.price)
        setlearningList(course.course.learningOutcome)
        setthumbnail(course.course.thumbnail)
      }
    }
  }, [course])

  // alert message and loading states
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  const HandleUpdate = (e) => {
    e.preventDefault()

    setshowLoading(true)
    setstatus('error')
    if (
      thumbnail === null ||
      coursename === null ||
      description === null ||
      price === null ||
      learningList.length < 1 ||
      coursename.trim().length < 1 ||
      description.trim().length < 1 ||
      price < 1
    ) {
      setmessage('Please provide all data!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (coursename.trim().length < 3) {
      setmessage('Course name must be atleast 3 characters long!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (coursename.trim().length > 200) {
      setmessage('Course Name too Long!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (description.trim().length < 3) {
      setmessage('Description must be atleast 3 characters long!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (thumbnail.size > 5 * 1024 * 1024) {
      setmessage('Thumbnail cannot be more than 5MB!')
      setshowLoading(false)
      setopen(true)
      return
    }

    const courseData = new FormData()
    courseData.append('thumbnail', thumbnail)
    courseData.append('courseDescription', description)
    courseData.append('courseName', coursename)
    courseData.append('price', price)
    for (let i = 0; i < learningList.length; i++) {
      courseData.append(`learningOutcome[${i}]`, learningList[i])
    }

    dispatch(updateCourseById({ courseId, courseData }))
      .unwrap()
      .then(() => {
        setstatus('sucess')
        setmessage('Course updated sucessfully.')
        setopen(true)
        setshowLoading(false)
        navigate('../myCourse')
      })
      .catch((err) => {
        setmessage('Failed to update course.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })
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
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} theme="darkAlert" />
      <Wrapper>
        <h1>Update Course details</h1>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files[0] && e.target.files[0].type.split('/')[0] !== 'image') {
                    setmessage('Only image file accepted!')
                    setstatus('error')
                    setopen(true)
                    return
                  }
                  if (e.target.files[0]) {
                    setthumbType('blob')
                    setthumbnail(e.target.files[0])
                  }
                }}
              />
              <span>Thumbnail</span>
              <div>
                <section>
                  <img
                    src={
                      thumbType === 'blob'
                        ? window.URL.createObjectURL(thumbnail)
                        : `${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${thumbnail}`
                    }
                    alt="Thumbnail"
                  />
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

          <div>{course && <VideoPlayer video={course.course.courseFile} thumbnail={course.course.thumbnail} />}</div>
        </div>
      </Wrapper>
    </Page>
  )
}
