// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import PropTypes from 'prop-types'

// testing component
import CourseImage from '../Images/registration.jpg'

// styled components
const Course = styled.section`
  overflow: hidden;
  border: 1px dashed var(--light-border-color);
  background-color: var(--background-white);
  border-radius: 0.3rem;
  box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
    0px 3px 14px 2px rgb(145 158 171 / 12%);
  cursor: pointer;
  transition: 0.1s ease-in-out;

  :hover {
    filter: brightness(0.95);
  }

  .course-image-container {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .course-brief {
    padding: 0.7rem;

    h2 {
      font-size: 0.97rem;
      line-height: 1.3;
      color: var(--text-black);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .author {
      margin: 0.5rem 0;
    }

    p {
      font-size: 0.873rem;
      color: var(--text-light-black);
    }

    .rank-container {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;

      .rank {
        font-weight: bold;
        color: var(--text-gold);
      }

      .stars {
        display: flex;
        align-items: center;
        margin: 0 0.5rem;

        i {
          color: var(--rating-gold);
          font-size: 1.1rem;
        }
      }
    }
  }
`

export default function CourseItem(props) {
  return (
    <Course>
      <div className="course-image-container">
        <img src={props.courseImage} alt="course name" />
      </div>
      <div className="course-brief">
        <h2>{props.courseName}</h2>
        <p className="author">{props.authorName}</p>
        <div className="rank-container">
          <span className="rank">{props.rating}</span>
          <div className="stars">
            {[...Array(Math.floor(props.rating))].map((data, index) => {
              return (
                <i key={index}>
                  <Icon icon="fluent:star-20-filled" />
                </i>
              )
            })}
            {parseInt(props.rating.toString().split('.')[1]) > 0 && (
              <i>
                <Icon icon="fluent:star-half-16-regular" />
              </i>
            )}
            {[...Array(5 - Math.ceil(props.rating))].map((data, index) => {
              return (
                <i key={index}>
                  <Icon icon="eva:star-outline" />
                </i>
              )
            })}
          </div>
          <p>({props.totalStudent})</p>
        </div>
        <h2>${props.price}</h2>
      </div>
    </Course>
  )
}

CourseItem.propTypes = {
  courseImage: PropTypes.string,
  courseName: PropTypes.string,
  authorName: PropTypes.string,
  rating: PropTypes.number,
  totalStudent: PropTypes.number,
  price: PropTypes.number,
}

CourseItem.defaultProps = {
  courseImage: CourseImage,
  courseName: 'Unknown',
  authorName: 'Unknown',
  rating: 0,
  totalStudent: 0,
  price: 0,
}
