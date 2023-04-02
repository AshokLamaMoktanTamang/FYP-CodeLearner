// importing dependencies
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// testing component
import CourseImage from '../Images/registration.jpg'
import RatingCounter from './ratingCounter'
import { Link } from 'react-router-dom'

// styled components
const Course = styled(Link)`
  overflow: hidden;
  border: 0.1rem solid var(--light-border-color);
  background-color: var(--background-white);
  border-radius: 0.3rem;
  transition: 0.1s ease-in-out;
  text-decoration: none;
  display: block;

  :hover {
    box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
      0px 3px 14px 2px rgb(145 158 171 / 12%);
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
    border: none !important;
    display: block !important;

    & > h2 {
      font-size: 0.97rem !important;
      line-height: 1.3;
      color: var(--text-black);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      :first-child{
        min-height: 60.54px;
      }
    }

    .author {
      margin: 0.5rem 0;
    }

    .students{
      display: block;
      float: right;
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
        margin-right: 0.5rem;
      }
    }
  }
`

export default function CourseItem(props) {
  return (
    <Course to={`/app/course/${props.courseId}`}>
      <div className="course-image-container">
        <img src={props.courseImage} alt={props.courseName} />
      </div>
      <div className="course-brief">
        <h2>{props.courseName}</h2>
        <p className="author">{props.authorName}</p>
        <div className="rank-container">
          <span className="rank">{props.rating}</span>
          <RatingCounter rating={props.rating} />
          <p>({props.totalRating})</p>
        </div>
        <p className="students">{props.student} Students</p>
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
