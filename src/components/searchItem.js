// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// test components
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
      font-size: 1.1rem;
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
      padding-bottom: 2rem;
      font-weight: bold;
      color: var(--text-black);
    }
  }

  @media (max-width: 520px) {
    .course-name {
      font-size: 0.9rem !important;
    }

    .author-name {
      padding-bottom: 0.5rem;
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

    :hover {
      background-color: var(--hover-white);
    }

    i {
      display: flex;
      color: var(--text-black);
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
  }

  .save {
    left: calc(40% + 1.15rem);
    bottom: 0.7rem;
    padding: 0.3rem 0.7rem;
    font-size: 0.875rem;
    color: var(--text-light-black);
    display: flex;
    background-color: transparent;
    border: 1px solid var(--dark-border-color);
    border-radius: 0.3rem;

    i {
      margin-right: 0.3rem;
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

      i{
        margin-right: 0.5rem;
      }
    }
  }

  @media (max-width: 520px) {
    .save {
      left: calc(100% - 5.3rem);
      width: 75px;
      justify-content: center;
      padding-left: 0;
      padding-right: 0;
    }
  }
`

export default function SearchItem(props) {
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
      <Search to="ka">
        <div className="image-container">
          <img src={CourseImage} alt="coursename" />
        </div>

        <div className="search-description">
          <h2 className="course-name">Pre-Programming: Everything you need to know before you code</h2>
          <p className="course-description">
            Increase your chance of success learning to code and communicating with other developers
          </p>

          <section className="rating">
            <span className="rating-number">2.7</span>
            <RatingCounter rating={2.7} />
            <span>(1000)</span>
          </section>

          <span className="author-name">Creator - Ashok Lama</span>

          <span className="last-updated">Last Updated : 19th December 2022</span>

          <span className="price">$ 16</span>
        </div>
      </Search>

      <button className="save" onClick={handleSave}>
        {saved ? (
          <>
            <i>
              <Icon icon="bi:bookmark-fill" />
            </i>
            Saved
          </>
        ) : (
          <>
            <i>
              <Icon icon="bi:bookmark" />
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
