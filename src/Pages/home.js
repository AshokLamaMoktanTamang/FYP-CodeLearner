// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'

// importing the react components
import Page from '../components/page'
import CourseItem from '../components/courseItem'

// testing component
import CourseImage from '../Images/registration.jpg'

// styled components
const ContentWrapper = styled.section`
  display: grid;
  grid-gap: 1.5rem;

  .category {
    border-bottom: 1px dashed var(--light-border-color);
    padding-bottom: 1.5rem;

    .category-heading {
      color: var(--text-black);
      font-size: 1.1rem;
      margin-bottom: 0.7rem;
    }
  }
`

const Course = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  grid-gap: 1.5rem 1rem;
`

export default function Home() {
  return (
    <Page title="Home">
      <ContentWrapper>
        <div className="category">
          <h2 className="category-heading">Top Rated</h2>

          <Course>
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
          </Course>
        </div>

        <div className="category">
          <h2 className="category-heading">Best Seller</h2>

          <Course>
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
          </Course>
        </div>

        <div className="category">
          <h2 className="category-heading">Latest</h2>

          <Course>
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={3.7}
              totalStudent={100}
              price={16.99}
            />
          </Course>
        </div>
      </ContentWrapper>
    </Page>
  )
}
