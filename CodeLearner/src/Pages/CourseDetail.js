// importing dependencies
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import RatingCounter from '../components/ratingCounter'
import { Icon } from '@iconify/react'

// importing the react components
import Page from '../components/page'
import { responsive } from '../service/responsive'

// testing components
import Thumbnail from '../Images/registration.jpg'
import CourseImage from '../Images/registration.jpg'
import CourseItem from '../components/courseItem'
import Carousel from 'react-multi-carousel'

// styled components
const CourseWrapper = styled.section`
  display: grid;
  grid-gap: 1rem;
  margin-right: -1rem;

  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
    line-height: 1.35;
    margin-right: 4.35rem;
  }

  & > .course-brief {
    margin-right: 1rem;
    align-items: center;
    max-width: 1000px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 40% 60%;
    border: 0.15rem solid var(--light-border-color);
    border-radius: 0.3rem;
    box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
      0px 3px 14px 2px rgb(145 158 171 / 12%);
    background-color: var(--background-white);

    & > section {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .brief {
      padding: 1rem;
      width: 100%;
      background-color: var(--background-white);
      border-left: 0.1rem dashed var(--light-border-color);

      & > h2 {
        font-size: 1.1rem;
        color: var(--text-black);
        margin-bottom: 0.15rem;
        line-height: 1.35;
      }

      .rating {
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;

        & > span {
          font-size: 0.835rem;
          font-size: 0.835rem;
          color: var(--text-light-black);
          font-weight: bold;
        }
      }

      & > p {
        color: var(--text-light-black);
        font-size: 0.935rem;
        line-height: 1.5;
        margin-bottom: 1rem;
      }

      & > span {
        display: block;
        color: var(--text-light-black);
        font-size: 0.835rem;
        line-height: 1.5;
      }

      & > h3 {
        font-size: 1rem;
        margin: 0.7rem 0;
        color: var(--text-black);
      }

      & > section {
        display: grid;
        grid-template-columns: max-content max-content;
        grid-gap: 1rem;
        justify-content: flex-end;

        button {
          width: 5.9rem;
          justify-content: center;
          padding: 0.7rem;
          font-size: 0.835rem;
          border-radius: 0.35rem;
          border: none;
          display: flex;
          cursor: pointer;
          font-weight: bold;
          align-items: center;
          background-color: var(--text-blue);
          color: white;

          :hover {
            background-color: var(--hover-404-blue);
          }

          i {
            display: flex;
            margin-right: 0.25rem;
            font-size: 1rem;
            color: var(--text-black);

            svg {
              color: white;
            }
          }
        }
      }
    }
  }

  .what-learn {
    border: 0.135rem solid var(--light-border-color);
    margin: 0.5rem 0;
    background-color: var(--background-white);
    max-width: 670px;
    border-radius: 0.5rem;
    padding: 0.7rem;
    margin-right: 1rem;

    & > h2 {
      font-size: 1.1rem;
      line-height: 1.35;
      margin-bottom: 0.5rem;
      color: var(--text-black);
    }

    & > ul {
      list-style: none;

      & > li {
        line-height: 1.3;
        padding-bottom: 0.5rem;
        font-size: 0.835rem;
        color: var(--text-light-black);
        display: grid;
        grid-template-columns: 1.35rem auto;
      }
    }
  }

  .more-from-user,
  .suggestion {
    width: 100%;
    overflow-x: auto;

    & > section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 1.1rem;
        color: var(--text-black);
        margin-bottom: 1.3rem;
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

  @media (max-width: 600px) {
    & > .course-brief {
      grid-template-columns: none;
      grid-template-rows: auto auto;
    }
  }

  @media (max-width: 800px) {
    & > h2 {
      margin-right: 1rem;
    }
  }
`

export default function CourseDetail() {
  const { courseId } = useParams()
  const [saved, setsaved] = useState(false)

  const handleSave = () => {
    saved ? setsaved(false) : setsaved(true)
  }

  return (
    <Page title={courseId}>
      <CourseWrapper>
        {/* making the four sections for the course brief, more from the user and suggestion */}
        <h2>Pre-Programming: Everything you need to know before you code</h2>

        <div className="course-brief">
          <section>
            <img src={Thumbnail} alt="course name" />
          </section>

          <div className="brief">
            <h2>Pre-Programming: Everything you need to know before you code</h2>
            <div className="rating">
              <span>3.7</span>
              <RatingCounter rating={3.7} />
              <span>(100)</span>
            </div>
            <p>Increase your chance of success learning to code and communicating with other developers</p>
            <span>Creator - Ashok Lama</span>
            <span>Last Updated - 13 December 2022</span>
            <h3>$ 13.00</h3>

            <section>
              <button>
                <i>
                  <Icon icon="ph:shopping-bag-open-bold" />
                </i>
                Buy
              </button>
              <button onClick={handleSave}>
                {saved ? (
                  <>
                    <i>
                      <Icon icon="material-symbols:bookmark" />
                    </i>
                    Saved
                  </>
                ) : (
                  <>
                    <i>
                      <Icon icon="ic:round-bookmark-border" />
                    </i>
                    Save
                  </>
                )}
              </button>
            </section>
          </div>
        </div>

        <div className="what-learn">
          <h2>What you will learn?</h2>

          <ul>
            <li>
              <Icon icon="material-symbols:double-arrow-rounded" />
              Better understand the fundamentals of how programming works
            </li>
            <li>
              <Icon icon="material-symbols:double-arrow-rounded" />
              Choose what programming language and path they want to pursue in their career
            </li>
            <li>
              <Icon icon="material-symbols:double-arrow-rounded" />
              Understand the fundamentals of how computers work and how that relates to modern web technology
            </li>
            <li>
              <Icon icon="material-symbols:double-arrow-rounded" />
              Understand and apply the 8 basic concepts of programming
            </li>
            <li>
              <Icon icon="material-symbols:double-arrow-rounded" />
              Evaluate, install, and modify any content management system
            </li>
          </ul>
        </div>

        <div className="more-from-user">
          <section>
            <h2>More from Ashok Lama</h2>
            <Link to={'userId'}>
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
              courseId={13}
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

        <div className="suggestion">
          <section>
            <h2>Similar Content</h2>
            <Link to={'similar'}>
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
          </Carousel>
        </div>
      </CourseWrapper>
    </Page>
  )
}
