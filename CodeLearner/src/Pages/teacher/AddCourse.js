// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// importing components
import Page from '../../components/page'
import VideoPlayer from '../../components/VideoPlayer'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { addCourse } from '../../slice/courseSlice'

// styled components
const Wrapper = styled.section`
  & > h1 {
    line-height: 1.7;
    font-size: 1.3rem;
  }

  & > form {
    display: grid;
    grid-gap: 1.5rem;
	  max-width: 700px;

    & > label {
      cursor: pointer;

      & > span {
        font-size: 0.875rm;
        font-weight: bold;
        line-height: 1.7;
		    display: block;
      }

      input, & > textarea{
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

      :nth-child(4){
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
      }
	  }

    .video{
      max-width: 500px;
    }

    .thumbnail{
      max-width: 300px;

      & > div {
        width: 100%
        display: block;
        overflow: hidden;
        position: relative;
        padding-top: 56.25%;
        border-radius: 0.5rem;
        border: 2px solid var(--teacher-white);

    
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          object-position: top;
          top: 0;
          left: 0;
        }
      }
    }

    .thumbnail, .video{
      .preview {
        width: 100%;
        height: 190px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--dark-border-color);
        border: 2px dashed var(--teacher-white);
        padding: 1.7rem;
        border-radius: 0.15rem;
        background-color: var(--teacher-content-background);
    
        & > svg {
          font-size: 3rem;
          margin-bottom: 0.9rem;
        }
      }
    }

    & > ul {
      list-style: none;
      display: grid;
      grid-gap: 0.7rem;
      margin-top: -.7rem; 
    
      & > li {
        display: grid;
        grid-template-columns: auto 2.1rem;
        align-items: flex-start;
        background-color: var(--teacher-content-background);
        padding: 0.7rem;
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

    & > button{
      padding: 0.7rem 1rem;
      border-radius: 0.15rem;
      border: none;
      outline: none;
      background-color: var(--text-blue);
      color: #fff;
      font-weight: bold;
      font-size: 0.875rem;
      cursor: pointer;
  
      :hover{
        filter: brightness(0.7);
      }
    }
  }
`

export default function AddCourse() {
  // input states
  const [video, setvideo] = useState(null)
  const [thumbnail, setthumbnail] = useState(null)
  const [courseName, setcourseName] = useState(null)
  const [description, setdescription] = useState(null)
  const [price, setprice] = useState(null)
  const [learningList, setlearningList] = useState([])

  // redux and navigation
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // learning outcome statest
  const [learnItem, setlearnItem] = useState('')

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

  // alert message and loading states
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  const HandleAdd = (e) => {
    e.preventDefault()

    setshowLoading(true)
    setstatus('error')
    if (
      thumbnail === null ||
      video === null ||
      courseName === null ||
      description === null ||
      price === null ||
      learningList.length < 1 ||
      courseName.trim().length < 1 ||
      description.trim().length < 1 ||
      price < 1
    ) {
      setmessage('Please provide all data!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (courseName.trim().length < 3) {
      setmessage('Course name must be atleast 3 characters long!')
      setshowLoading(false)
      setopen(true)
      return
    }

    if (courseName.trim().length > 200) {
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

    if (video.size > 100 * 1024 * 1024) {
      setmessage('Video cannot be more than 100MB!')
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
    courseData.append('courseFile', video)
    courseData.append('thumbnail', thumbnail)
    courseData.append('courseDescription', description)
    courseData.append('courseName', courseName)
    courseData.append('price', price)
    for (let i = 0; i < learningList.length; i++) {
      courseData.append(`learningOutcome[${i}]`, learningList[i])
    }

    dispatch(addCourse(courseData))
      .unwrap()
      .then(() => {
        setstatus('sucess')
        setmessage('Course uploaded sucessfully.')
        setopen(true)
        setshowLoading(false)
        navigate('../myCourse')
      })
      .catch((err) => {
        setmessage('Failed to add course.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })
  }

  return (
    <Page title="Course Name">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} theme="darkAlert" />
      {showLoading && <Loading />}
      <Wrapper>
        <h1>Add Course</h1>

        <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          <label>
            <span>Course Name</span>
            <input type="text" placeholder="Course Name" onChange={(e) => setcourseName(e.target.value)} />
          </label>
          <label>
            <span>Course Description</span>
            <textarea
              placeholder="Course Description"
              rows={7}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </label>
          <label>
            <span>Price</span>
            <input type="number" placeholder="Price" min={1} onChange={(e) => setprice(e.target.value)} />
          </label>
          <label>
            <span>Learning Outcomes</span>
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
          {learningList.length > 0 && (
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
          )}
          <label className="video">
            <span>Video</span>

            {video ? (
              <VideoPlayer
                type="blob"
                video={window.URL.createObjectURL(video)}
                thumbnail={thumbnail && window.URL.createObjectURL(thumbnail)}
              />
            ) : (
              <section className="preview">
                <Icon icon="ic:baseline-cloud-upload" />
                <p>Upload Video</p>
              </section>
            )}

            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                if (e.target.files[0] && e.target.files[0].type.split('/')[0] !== 'video') {
                  setmessage('Only video file accepted!')
                  setstatus('error')
                  setopen(true)
                  return
                }
                setvideo(e.target.files[0])
              }}
            />
          </label>

          <label className="thumbnail">
            <span>Thumbnail</span>
            {thumbnail ? (
              <div>
                <img src={window.URL.createObjectURL(thumbnail)} alt="Preview" />
              </div>
            ) : (
              <section className="preview">
                <Icon icon="ic:baseline-cloud-upload" />
                <p>Choose Thumbnail</p>
              </section>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0] && e.target.files[0].type.split('/')[0] !== 'image') {
                  setmessage('Only image file accepted!')
                  setstatus('error')
                  setopen(true)
                  return
                }
                setthumbnail(e.target.files[0])
              }}
              hidden
            />
          </label>
          <button onClick={HandleAdd}> Add </button>
        </form>
      </Wrapper>
    </Page>
  )
}
