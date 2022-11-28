// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// importing the react components
import Page from '../components/page'
import CourseItem from '../components/courseItem'
import { responsive } from '../service/responsive'

// testing component
import CourseImage from '../Images/registration.jpg'

// styled components
const ContentWrapper = styled.section`
  display: grid;
  grid-gap: 1.3rem;
  margin-right:-1rem;

  .category {
    width: 100%;
    overflow-x: auto;

    .category-heading {
      color: var(--text-black);
      font-size: 1.1rem;
      margin-bottom: 0.7rem;
    }

    .carouselItem {
      padding-right: 1rem;
    }
  } 
`

export default function Home() {
  return (
    <Page title="Home">
      <ContentWrapper>
        <div className="category">
          <h2 className="category-heading">Top Rated</h2>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
          >
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
            <CourseItem
              courseId={12}
              courseImage={CourseImage}
              courseName="Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
              authorName="Ashok Lama, The Codex"
              rating={4.1}
              totalStudent={100}
              price={16.99}
            />
          </Carousel>
        </div>

        <div className="category">
          <h2 className="category-heading">Best Seller</h2>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
          >
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
          </Carousel>
        </div>

        <div className="category">
          <h2 className="category-heading">Latest</h2>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
          >
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
          </Carousel>
        </div>
      </ContentWrapper>
    </Page>
  )
}
