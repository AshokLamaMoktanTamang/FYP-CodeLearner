// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'

// importing the react components
import Page from '../../components/page'
import CourseItem from '../../components/courseItem'

// importing testing component
import CourseImage from '../../Images/registration.jpg'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../../components/pagination'

// styled components
const Container = styled.section`
  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
    margin-bottom: 1rem;
    position: relative;
    width: fit-content;
    text-transform: capitalize;
    cursor: pointer;

    ::before {
      position: absolute;
      content: '';
      width: 40%;
      height: 5px;
      transition: 0.19s ease-in-out;
      border-radius: 10px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
    }

    :hover {
      ::before {
        width: 90%;
      }
    }
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    grid-gap: 1.5rem 1rem;
  }
`

export default function TopRatedCourse() {
  const [query] = useSearchParams()
  console.log(query.get('page'))

  return (
    <Page title="Top Rated Course">
      <Container>
        <h2>Top Rated - Course</h2>

        <div>
          <CourseItem
            courseId={12}
            courseImage={CourseImage}
            courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
            authorName="Ashok Lama, The Codex"
            rating={3.7}
            totalStudent={100}
            price={16.99}
          />
          <CourseItem
            courseId={12}
            courseImage={CourseImage}
            courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
            authorName="Ashok Lama, The Codex"
            rating={3.7}
            totalStudent={100}
            price={16.99}
          />
          <CourseItem
            courseId={12}
            courseImage={CourseImage}
            courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
            authorName="Ashok Lama, The Codex"
            rating={3.7}
            totalStudent={100}
            price={16.99}
          />
          <CourseItem
            courseId={12}
            courseImage={CourseImage}
            courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
            authorName="Ashok Lama, The Codex"
            rating={3.7}
            totalStudent={100}
            price={16.99}
          />
        </div>

        <Pagination pages={5} />
      </Container>
    </Page>
  )
}
