// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import PropTypes from 'prop-types'

// importing components
import CourseImage from '../Images/registration.jpg'
import RatingCounter from './ratingCounter'
import { Link } from 'react-router-dom'

// styled componets
const Search = styled(Link)`
  display: grid;
  grid-template-columns: 40% calc(60% - 1rem);
  grid-gap: 1rem;
  border: 0.15rem solid var(--light-border-color);
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 900px;
  align-items: flex-start;
  text-decoration: none;
  background-color: var(--background-white);

  :hover {
    box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
      0px 3px 14px 2px rgb(145 158 171 / 12%);
  }

  .image-container {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
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

  .search-description {
    position: relative;

    .course-name,
    .course-description {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }

    .course-name {
      font-size: 0.97rem;
      color: var(--text-black);
      padding-right: 1.5rem;
      margin-bottom: 0.3rem;
      -webkit-line-clamp: 2;
    }

    .course-description {
      font-size: 0.875rem;
      color: var(--text-light-black);
      line-height: 1.3;
      margin-bottom: 0.5rem;
      -webkit-line-clamp: 3;
    }

    .rating {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: var(--text-light-black);

      .rating-number {
        color: var(--text-gold);
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }

    .author-name,
    .last-updated,
    .price {
      color: var(--text-light-black);
      font-size: 0.875rem;
      margin: 0.3rem 0;
      line-height: 1.3;
      display: block;
    }

    .price {
      padding-bottom: 2.57rem;
      font-weight: bold;
      color: var(--text-black);
    }
  }

  @media (max-width: 520px) {
    .course-name {
      font-size: 0.9rem !important;
    }

    .author-name {
      padding-bottom: 1.4rem;
    }

    .rating {
      flex-wrap: wrap;
    }

    .course-description,
    .last-updated {
      display: none !important;
    }

    .price {
      padding-bottom: 0 !important;
      margin-top: -0.7rem !important;
    }
  }
`

const Wrapper = styled.section`
  position: relative;
  max-width: 900px;

  .option,
  .save {
    position: absolute;
    cursor: pointer;

    i {
      display: flex;
    }
  }

  .option {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.35rem;
    border-radius: 50%;
    border: none;
    font-size: 1.1rem;
    background-color: transparent;
    z-index: 1;

    :hover {
      background-color: var(--hover-white);
    }
  }
  
  .save {
    left: calc(40% + 1.15rem);
    bottom: 0.7rem;
    padding: 0.7rem;
    font-size: 0.875rem;
    color: white;
    display: flex;
    background-color: var(--text-blue);
    border: none;
    border-radius: 0.3rem;
    width: 83px;
    text-align: center;

    :hover {
      background-color: var(--hover-404-blue);
    }

    i {
      margin-right: 0.3rem;
      color: white;

      svg {
        font-size: 1rem;
      }
    }
  }

  .option-background {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: blur(0.07rem);
    transition: 3s ease-in-out;
  }

  .option-list {
    position: absolute;
    top: 1.9rem;
    right: 1.9rem;
    background-color: white;
    padding: 0.3rem;
    box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
      0px 3px 14px 2px rgb(145 158 171 / 12%);
    list-style: none;
    border-radius: 0.3rem;
    border: 1px solid var(--light-border-color);

    li,
    a {
      display: block;
    }

    a {
      text-decoration: none;
      color: var(--text-light-black);
      padding: 0.5rem;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-size: 0.835rem;

      :hover {
        color: var(--text-black);
      }

      i {
        margin-right: 0.5rem;
      }
    }
  }

  @media (max-width: 520px) {
    .save {
      left: calc(100% - 6rem);
      justify-content: center;
      padding-left: 0;
      padding-right: 0;
    }
  }
`

export default function SearchItem(props) {
  const rating = props.rating
  const [saved, setsaved] = useState(props.saved)
  const [display, setdisplay] = useState('none')

  const handleSave = () => {
    saved ? setsaved(false) : setsaved(true)
  }

  const handleOption = () => {
    display ? setdisplay(null) : setdisplay('none')
  }

  return (
    <Wrapper>
      <Search to={`/app/course/${props.courseId}`}>
        <div className="image-container">
          <img src={props.courseImage} alt={props.courseName} />
        </div>

        <div className="search-description">
          <h2 className="course-name">{props.courseName}</h2>
          <p className="course-description">{props.courseBrief}</p>

          <section className="rating">
            <span className="rating-number">{rating}</span>
            <RatingCounter rating={rating} />
            <span>({props.totalStudent})</span>
          </section>

          <span className="author-name">Creator - {props.authorName}</span>

          <span className="last-updated">Last Updated : {props.lastUpdated}</span>

          <span className="price">$ {props.price}</span>
        </div>
      </Search>

      <button className="save" onClick={handleSave}>
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

      <button className="option" onClick={handleOption}>
        <i>
          <Icon icon="bi:three-dots-vertical" />
        </i>
      </button>

      <div className={`option-background ${display}`} onClick={handleOption}></div>

      <ul className={`option-list ${display}`}>
        <li>
          <Link to="/app/report">
            <i>
              <Icon icon="bi:flag" />
            </i>
            <span>report</span>
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

SearchItem.propsType = {
  courseName: PropTypes.string,
  courseBrief: PropTypes.string,
  totalStudent: PropTypes.number,
  rating: PropTypes.number,
  authorName: PropTypes.string,
  lastUpdated: PropTypes.string,
  price: PropTypes.number,
}

SearchItem.defaultProps = {
  courseImage: CourseImage,
  courseName: 'Unknown',
  courseBrief: 'Unknown',
  totalStudent: 0,
  rating: 0,
  authorName: 'Unknown',
  lastUpdated: 'N/A',
  price: 0,
}