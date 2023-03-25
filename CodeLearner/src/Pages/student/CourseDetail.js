// importing dependencies
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import RatingCounter from '../../components/ratingCounter'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// importing the react components
import Page from '../../components/page'
import { responsive } from '../../services/responsive'

// testing components
import CourseItem from '../../components/courseItem'
import Carousel from 'react-multi-carousel'
import { checkPurchased, fetchApprovedCourseByUser, fetchCourseById, purchaseCourse } from '../../slice/courseSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'

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
    align-items: flex-start;
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

  .no-course {
    font-weight: bold;
    color: var(--text-light-black);
    padding: 2rem;
    background: var(--btn-hover-color);
    text-align: center;
    border: 1px dashed var(--dark-border-color);
    border-radius: 0.25rem;
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

const PurchaseModal = styled.section`
  & > section{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000077;
    backdrop-filter: blur(3px);
  }

  & > div{
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 500px;
    width: 90%;
    transform: translate(-50%, -50%);
    background-color: var(--background-white);
    padding: 1rem;
    border-radius: .25rem;
  }
`

export default function CourseDetail() {
  const { courseId } = useParams()
  const [saved, setsaved] = useState(false)

  const handleSave = () => {
    saved ? setsaved(false) : setsaved(true)
  }

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoading, setshowLoading] = useState(false)
  const [status, setstatus] = useState('error');

  // redux
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(checkPurchased({ courseId })).unwrap().then(() => {
      navigate(`/app/myCourse/${courseId}`)
    })
  });

  useEffect(() => {
    return () => {
      setshowLoading(true)
      dispatch(fetchCourseById(courseId))
        .unwrap()
        .catch(() => {
          navigate('/app')
        })
      setshowLoading(false)
    }
  }, [dispatch, courseId, navigate])

  const course = useSelector((state) => state.course.course)

  useEffect(() => {
    setshowLoading(true)

    if (course && course.course) {
      dispatch(fetchApprovedCourseByUser({ id: course.course.teacherId._id }))
        .unwrap()
        .then(() => {
          setshowLoading(false)
        })
        .catch(() => {
          setmessage('Unable to fetch courses.')
          setshowLoading(false)
          setopen(true)
        })
    }
  }, [dispatch, course])

  const courses = useSelector((state) => state.course.courses.course)

  // payment controller
  const [showPaymentModal, setshowPaymentModal] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: course.course.courseName,
          amount: {
            currency_code: "USD",
            value: course.course.price,
          },
        },
      ],
    }).then((orderID) => {
      return orderID;
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function () {
      dispatch(purchaseCourse({ courseId })).unwrap().then(() => {
        navigate('/app/myCourse')
      }).catch(() => {
        setmessage("Failed to purchase course contact the admin.");
        setstatus('eror');
        setopen(true);
      })
    });
  };

  const onError = () => {
    setmessage("An Error occured with your payment ");
    setstatus('error')
    setopen(true)
  };

  return (
    <Page title={course && course.course ? course.course.courseName : 'Unknown'}>
      {showLoading && <Loading />}
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />

      <CourseWrapper>
        {/* making the four sections for the course brief, more from the user and suggestion */}
        <h2>{course && course.course && course.course.courseName}</h2>

        {course && course.course && (
          <div className="course-brief">
            <section>
              <img
                src={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.course.thumbnail}`}
                alt="course name"
              />
            </section>

            <div className="brief">
              <h2>{course.course.courseName}</h2>
              <div className="rating">
                <span>{course.course.avgRating}</span>
                <RatingCounter rating={course.course.avgRating} />
                <span>{course.course.ratings.length}</span>
              </div>
              <p>{course.course.courseDescription}</p>
              <span>Creator - {`${course.course.teacherId.firstName} ${course.course.teacherId.lastName}`}</span>
              <span>Last Updated - {Date(course.course.updatedAt)}</span>
              <h3>$ {course.course.price}</h3>

              <section>
                <button onClick={() => setshowPaymentModal(true)}>
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
        )}

        <div className="what-learn">
          <h2>What you will learn?</h2>

          <ul>
            {course &&
              course.course &&
              course.course.learningOutcome.length > 0 &&
              course.course.learningOutcome.map((outcome, index) => {
                return (
                  <li key={index}>
                    <Icon icon="material-symbols:double-arrow-rounded" />
                    {outcome}
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="more-from-user">
          <section>
            <h2>
              More from{' '}
              {course && course.course && `${course.course.teacherId.firstName} ${course.course.teacherId.lastName}`}
            </h2>

            {courses && courses.length > 1 &&
              <Link to={course && course.course && course.course.teacherId._id}>
                See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
              </Link>
            }
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
            {courses && courses.length > 1 ? (
              courses.map((course, index) => {
                if (course._id === courseId) {
                  return false
                }

                return (
                  <CourseItem
                    courseId={course._id}
                    courseImage={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${course.thumbnail}`}
                    courseName={course.courseName}
                    authorName={`${course.teacherId.firstName} ${course.teacherId.lastName}`}
                    price={course.price}
                    key={index}
                    rating={3.7}
                    totalStudent={100}
                  />
                )
              })
            ) : (
              <div className="no-course">No course Available</div>
            )}
          </Carousel>
        </div>
      </CourseWrapper>

      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT }}>
        {
          showPaymentModal &&
          <PurchaseModal>
            <section onClick={() => setshowPaymentModal(false)}></section>

            {
              course && course.course &&
              <div>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </div>
            }
          </PurchaseModal>
        }
      </PayPalScriptProvider>
    </Page >
  )
}
