// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import MyCourse from '../../components/MyCourse'
import { Link } from 'react-router-dom'
import { fetchCoursesByToken } from '../../slice/courseSlice'
import Loading from '../../components/loading'
import AlertMessage from '../../components/alertMessage'

// styled component
const Wrapper = styled.section`
  padding: 0.2rem;

  & > section{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    margin-top: -0.5rem;

    & > a{
      height: 3rem;
      width: 3rem;
      background-color: var(--background-black);
      border-radius: 50%;
      border-none;
      outline: none;
      cursor: pointer;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
  
      :hover{
        & > svg{
          color: var(--teacher-white);
        }
      }
      
      & > svg{
        font-size: 1.3rem;
        color: var(--text-light-black);
      }
    }
  
    & > h1 {
      font-size: 1rem;
      line-height: 1.7;
    }
  }


  & > div {
    display: grid;
    grid-gap: 1.5rem;
  }
`

const NoCourse = styled.section`
  height: calc(100vh - 8.78rem);
  min-height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--teacher-content-background);
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 170px;
    padding: 1rem;
    border-radius: 0.15rem;

    & > p {
      font-size: 1.1rem;
      font-weight: bold;
      color: var(--dark-border-color);
      text-align: center;
      margin-bottom: 1rem;
    }

    & > a {
      background-color: transparent;
      text-decoration: none;
      color: var(--dark-border-color);
      padding: 0.5rem;
      font-size: 0.9rem;
      font-weight: bold;
      display: block;

      :hover {
        color: var(--teacher-white);
      }
    }
  }
`

export default function TeacherCourse() {
  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoading(true)
    dispatch(fetchCoursesByToken())
      .unwrap()
      .then(() => {
        setshowLoading(false)
      })
      .catch(() => {
        setmessage('Unable to fetch courses.')
        setshowLoading(false)
        setopen(true)
      })
  }, [dispatch])

  const courses = useSelector((state) => state.course.courses.course)

  return (
    <Page title={'Courses'}>
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />
      {showLoading && <Loading />}
      <Wrapper>
        <section>
          <h1>My Courses</h1>
          <Link to={'../addCourse'}>
            <Icon icon="material-symbols:library-add-outline-rounded" />
          </Link>
        </section>

        <div>
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              return (
                <MyCourse
                  courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.thumbnail}`}
                  courseName={course.courseName}
                  description={course.courseDescription}
                  // rating={3.7}
                  // totalStudent={100}
                  price={course.price}
                  courseId={course._id}
                  key={course._id}
                />
              )
            })
          ) : (
            <NoCourse>
              <div>
                <p>No course Available</p>
                <Link to={'../addCourse'}>Add Course</Link>
              </div>
            </NoCourse>
          )}
        </div>
      </Wrapper>
    </Page>
  )
}
