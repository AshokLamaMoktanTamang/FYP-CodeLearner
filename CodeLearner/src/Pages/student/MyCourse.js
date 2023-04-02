// importing the react and external libraries
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EnrolledCourse from '../../components/EnrolledCourse'
import { useDispatch, useSelector } from 'react-redux'

// importing the react components
import Page from '../../components/page'

// importing the testing components
import { fetchMyCourse } from '../../slice/courseSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'

// styled components
const ContentWrapper = styled.section`
  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
    line-height: 1.65;
    margin-bottom: 1.3rem;
    text-transform: capitalize;
    width: fit-content;
    position: relative;

    ::before {
      position: absolute;
      content: '';
      width: 40%;
      height: 5px;
      border-radius: 10px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
    }
  }

  & > div {
    display: grid;
    grid-gap: 1rem;
  }

  .no-purchase{
    display: block;
    font-size: 1rem;
    color: gray;
    margin: auto;
    margin-top: 3rem;
  }
`

export default function MyCourse() {
  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)
  const [status, setstatus] = useState('error');

  // const redux
  const dispatch = useDispatch()

  useEffect(() => {
    (() => {
      setshowLoading(true)
      dispatch(fetchMyCourse()).unwrap().then(() => {
        setshowLoading(false)
      }).catch(() => {
        setshowLoading(false)
        setmessage("Failed to fetch courses");
        setstatus('error')
        setopen(true)
      })
    })()
  }, [dispatch]);

  const courses = useSelector(state => state.course.purchasedCourses)

  return (
    <Page title="My Course">
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />

      <ContentWrapper>
        <h2>My course</h2>

        <div>
          {courses &&
            courses.length > 0 ?
            courses.map(((purchaseCourse, index) => {
              let course = purchaseCourse.course;

              if (course)
                return (
                  <EnrolledCourse
                    courseName={course.courseName}
                    authorName={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                    courseImage={course.thumbnail}
                    courseId={course._id}
                    key={index}
                  />
                )

              return null
            }))
            :
            <h1 className='no-purchase'>No Course purchased</h1>
          }
        </div>
      </ContentWrapper>
    </Page>
  )
}
