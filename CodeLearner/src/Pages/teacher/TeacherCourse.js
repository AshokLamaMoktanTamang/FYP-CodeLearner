// importing dependencies
import React from 'react'
import styled from 'styled-components'
// import { Icon } from '@iconify/react'

// importing components
import Page from '../../components/page'
import MyCourse from '../../components/MyCourse'

// styled component
const Wrapper = styled.section`
  padding: 0.2rem;

  & > h1 {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 0.7rem;
  }

  & > div {
    display: grid;
    grid-gap: 1.5rem;
  }
`

export default function TeacherCourse() {
  return (
    <Page title={'Courses'}>
      <Wrapper>
        <h1>My Courses</h1>

        <div>
          <MyCourse
            courseName="Full Python Course Click on create credentials"
            description="Click on create credentials again and select create OAuth client id. Select type of application to web application. Fill in your app name and add in redirect URL tab.Note: dont add / in the ."
            rating={3.7}
            totalStudent={100}
            price={100}
            courseId="1"
          />
        </div>
      </Wrapper>
    </Page>
  )
}
