// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import EnrolledCourse from '../../components/EnrolledCourse'

// importing the react components
import Page from '../../components/page'

// importing the testing components
import courseImage from '../../Images/registration.jpg'

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
`

export default function MyCourse() {
  return (
    <Page title="My Course">
      <ContentWrapper>
        <h2>My course</h2>

        <div>
          <EnrolledCourse
            courseName={
              'Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!'
            }
            authorName={'Ashok Lama'}
            courseImage={courseImage}
            courseId={'11'}
          />
          <EnrolledCourse
            courseName={
              'Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!'
            }
            authorName={'Ashok Lama'}
            courseImage={courseImage}
            courseId={'11'}
          />
        </div>
      </ContentWrapper>
    </Page>
  )
}
