// importing the react and external libraries
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// importing the react components
import Page from '../../components/page'
import CourseItem from '../../components/courseItem'
import { responsive } from '../../services/responsive'
import { Icon } from '@iconify/react'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { fetchBestSellerCourse, fetchTenCourse, fetchTopRatedCourse } from '../../slice/courseSlice'

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

  .no-course{
    background-color: var(--hover-white);
    padding: 3rem 1rem;
    text-align: center;
    font-weight: bold;
    color: var(--text-black);
    border: 1px dashed var(--light-border-color);
  }
`

export default function Home() {
  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      setshowLoading(true)
      dispatch(fetchTenCourse())
        .unwrap()
        .catch((err) => {
          setmessage('Failed to fetch course.')
          if (err.status) {
            setmessage('Poor Internet or Too Many Request')
          }
          setopen(true)
          setshowLoading(false)
        })
      dispatch(fetchBestSellerCourse())
        .unwrap()
        .catch((err) => {
          setmessage('Failed to fetch course.')
          if (err.status) {
            setmessage('Poor Internet or Too Many Request')
          }
          setopen(true)
          setshowLoading(false)
        })
      dispatch(fetchTopRatedCourse())
        .unwrap()
        .catch((err) => {
          setmessage('Failed to fetch course.')
          if (err.status) {
            setmessage('Poor Internet or Too Many Request')
          }
          setopen(true)
          setshowLoading(false)
        })
      setshowLoading(false)
    }
  }, [dispatch])

  const latestCourses = useSelector((state) => state.course.tenCourse)
  const bestSellerCourse = useSelector((state) => state.course.bestSellerCourse)
  const topRatedCourse = useSelector((state) => state.course.topRatedCourse)

  return (
    <Page title="Home">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />
      {showLoading && <Loading />}
      <ContentWrapper>
        <div className="category">
          <section>
            <h2 className="category-heading">Best Seller</h2>
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
            {bestSellerCourse && bestSellerCourse.length > 0 ? (
              bestSellerCourse.map((course, index) => {
                let bestCourse = course.course[0]
                let author = course.teacher[0]

                if (bestCourse && author)
                  return (
                    <CourseItem
                      courseId={course._id}
                      courseName={bestCourse.courseName}
                      courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${bestCourse.thumbnail}`}
                      authorName={`${author.firstName} ${author.lastName}`}
                      price={bestCourse.price}
                      key={index}
                      rating={Math.round(bestCourse.avgRating * 10) / 10}
                      totalRating={bestCourse.ratings.length}
                      student={course.sellCount}
                    />
                  )

                return null
              })
            ) : (
              <div className='no-course'>No course Available</div>
            )}
          </Carousel>
        </div>

        <div className="category">
          <section>
            <h2 className="category-heading">Latest</h2>
            <Link to={'latest?page=1'}>
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
            {latestCourses && latestCourses.length > 0 ? (
              latestCourses.map((course, index) => {
                return (
                  <CourseItem
                    courseId={course._id}
                    courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.thumbnail}`}
                    courseName={course.courseName}
                    authorName={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                    price={course.price}
                    key={index}
                    rating={Math.round(course.avgRating * 10) / 10}
                    totalRating={course.ratings.length}
                  />
                )
              })
            ) : (
              <div className='no-course'>No course Available</div>
            )}
          </Carousel>
        </div>

        <div className="category">
          <section>
            <h2 className="category-heading">Top Rated</h2>
            <Link to={'top-rated?page=1'}>
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
            {
              topRatedCourse && topRatedCourse.length > 0 ? (
                topRatedCourse.map((course, index) => {
                  return (
                    <CourseItem
                      courseId={course._id}
                      courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.thumbnail}`}
                      courseName={course.courseName}
                      authorName={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                      price={course.price}
                      key={index}
                      rating={Math.round(course.avgRating * 10) / 10}
                      totalRating={course.TotalRatings}
                    />
                  )
                })
              ) : (
                <div className='no-course'>No course Available</div>
              )
            }
          </Carousel>
        </div>
      </ContentWrapper>
    </Page>
  )
}
