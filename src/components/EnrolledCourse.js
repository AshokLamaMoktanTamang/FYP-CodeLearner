// importig the dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// importing the components

// testing component
import courseImage from '../Images/registration.jpg'

// styled components
const MyCourse = styled.section`
  display: grid;
  max-width: 700px;
  grid-template-columns: 40% 60%;
  overflow: hidden;
  background-color: var(--background-white);
  border: 0.13rem solid var(--light-border-color);
  border-radius: 0.35rem;

  & > section {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;
    padding-bottom: 0;

    & > div {
      & > a {
        font-size: 0.9rem;
        font-weight: bold;
        text-decoration: none;
        line-height: 1.35;
        margin-bottom: 0.35rem;
        color: var(--text-black);
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        
        :hover{
          color: var(--text-light-black);
        }
      }

      & > span {
        font-size: 0.835rem;
        line-height: 1.35;
        padding-bottom: 0.5rem;
        display: block;
        color: var(--text-light-black);
      }
    }

    & > section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      & > button {
        font-size: 0.835rem;
        background-color: var(--text-blue);
        border: none;
        padding: 0.5rem;
        border-radius: 0.3rem;
        color: white;
        font-weight: bold;
        letter-spacing: 1px;
        margin-right: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 0.7rem;
        width: 75px;
        justify-content: center;

        :last-child {
          margin-right: 0;
        }

        :hover {
          background-color: var(--hover-404-blue);
        }

        svg {
          font-size: 1.1rem;
          margin-right: 0.35rem;
        }
      }
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: none;
    grid-template-rows: auto auto;
    max-width: 300px;
  }
`

export default function EnrolledCourse(props) {
  return (
    <MyCourse>
      <section>
        <img src={props.courseImage} alt={props.courseName} />
      </section>

      <div>
        <div>
          <Link to={`/app/course/${props.courseId}`}>{props.courseName}</Link>

          <span>{props.authorName}</span>
        </div>

        <section>
          <button>
            <Icon icon="ic:round-play-arrow" />
            Start
          </button>
          <button>
            <Icon icon="healthicons:i-exam-multiple-choice" /> Test
          </button>
          <button>
            <Icon icon="fluent:live-20-filled" /> Live
          </button>
        </section>
      </div>
    </MyCourse>
  )
}

EnrolledCourse.defaultProps = {
  courseImage: courseImage,
  courseId: '/404',
  courseName: 'Unknwon',
  authorName: 'N / A',
}

EnrolledCourse.propTypes = {
  courseName: PropTypes.string,
  authorName: PropTypes.string,
  courseId: PropTypes.string,
}
