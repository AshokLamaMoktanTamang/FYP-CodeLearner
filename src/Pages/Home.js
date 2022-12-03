// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// importing the react components
import Page from '../components/page'
import CourseItem from '../components/courseItem'
import { responsive } from '../service/responsive'
import { Icon } from '@iconify/react'

// testing component
import CourseImage from '../Images/registration.jpg'
import { Link } from 'react-router-dom'

// styled components
const ContentWrapper = styled.section`
  display: grid;
  grid-gap: 1.3rem;
  margin-right: -1rem;

  .category {
    width: 100%;
    overflow-x: auto;

    & > section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .category-heading {
        color: var(--text-black);
        font-size: 1.1rem;
        margin-bottom: 1rem;
        line-height: 1.65;
        width: fit-content;
        position: relative;
        cursor: pointer;

        ::before {
          position: absolute;
          content: '';
          width: 40%;
          height: 5px;
          border-radius: 10px;
          background-color: var(--text-blue);
          top: 100%;
          left: 0;
          transition: 0.19s ease-in-out;
        }

        :hover {
          ::before {
            width: 90%;
          }
        }
      }

      & > a {
        display: flex;
        text-decoration: none;
        color: var(--text-light-black);
        align-items: center;
        margin-right: 3.5rem;
        font-weight: bold;
        font-size: 0.9rem;

        :hover {
          color: var(--text-blue);
        }

        & > svg {
          font-size: 1.3rem;
          margin-left: 0.1rem;
        }
      }
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
          <section>
            <h2 className="category-heading">Top Rated</h2>
            <Link to={'top-rated'}>
              See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </Link>
          </section>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
            minimumTouchDrag={20}
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
          <section>
            <h2 className="category-heading">Best Seller</h2>
            <Link to={'best-seller'}>
              See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </Link>
          </section>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
            minimumTouchDrag={20}
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
          <section>
            <h2 className="category-heading">Latest</h2>
            <Link to={'latest'}>
              See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </Link>
          </section>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
            minimumTouchDrag={20}
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
