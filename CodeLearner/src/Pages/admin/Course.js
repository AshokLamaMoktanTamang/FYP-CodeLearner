// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

// importing components
import Page from '../../components/page'
import { fetchPendingCourse } from '../../slice/courseSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import CourseCard from '../../components/courseCard'

// styled components
const Wrapper = styled.section`
min-height: calc(100vh - 75px - 2rem);

& > div {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  grid-gap: 1.7rem 1rem;

  & > p {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-light-black);

    & > svg{
      font-size: 3rem;
      margin-bottom: .5rem;
    }
  }
}`

export default function Course() {
  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoadng(true)
    dispatch(fetchPendingCourse())
      .unwrap()
      .then(() => {
        setshowLoadng(false)
      })
      .catch(() => {
        setstatus('error')
        setmessage('Failed to fetch informations')
        setshowLoadng(false)
        setopen(true)
      })
  }, [dispatch])

  const courses = useSelector((state) => state.course.courses)

  return (
    <Page title="Admin Course">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}

      <Wrapper>
        <h1>Course</h1>

        <div>
          {courses && courses.length > 0 ? (
            courses.map((course, index) => {
              return (
                <CourseCard
                  thumbnail={course.thumbnail}
                  courseName={course.courseName}
                  courseDescription={course.courseDescription}
                  price={course.price}
                  id={course._id}
                  key={index}
                />
              )
            })
          ) : (
            <p>
              <Icon icon="fluent:cellular-data-unavailable-24-filled" />
              No Course Request available
            </p>
          )}
        </div>
      </Wrapper>
    </Page>
  )
}
