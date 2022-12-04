// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// importing components
import ArtcileThumbnail from '../Images/registration.jpg'

// styled components
const Article = styled.section`
  overflow: hidden;
  background-color: var(--background-white);
  border: 0.15rem solid var(--light-border-color);
  border-radius: 0.25rem;

  & > div {
    width: 100%;
    padding-top: 75%;
    position: relative;
    border-bottom: 0.15rem solid var(--light-border-color);

    & > img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

  & section {
    padding: 0.5rem;

    & > h3 {
      font-size: 0.95rem;
      color: var(--text-black);
      line-height: 1.5;
      margin-bottom: 0.45rem;
    }

    & > p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
    }

    & > p,
    & > div span {
      font-size: 0.85rem;
      color: var(--text-light-black);
      line-height: 1.5;
    }

    & > a {
      text-decoration: none;
      color: var(--text-blue);
      font-weight: bold;
      margin: 1.15rem 0;
      display: block;
      font-size: 0.85rem;
      width: fit-content;

      :hover {
        color: var(--hover-404-blue);
        text-decoration: underline;
      }
    }

    & > div {
      display: grid;
      grid-template-columns: 50% 50%;
      margin: -0.5rem;
      margin-top: 0.9rem;
      border-top: 0.15rem solid var(--light-border-color);

      & > span {
        padding: 0.5rem;
        text-transform: capitalize;

        :first-child {
          border-right: 0.15rem solid var(--light-border-color);
        }
      }
    }
  }
`

export default function ArticleItem(props) {
  return (
    <Article>
      <div>
        <img src={props.thumbnail} alt={props.articleName} />
      </div>

      <section>
        <h3>{props.articleName}</h3>
        <p>{props.articleDescription}</p>
        <Link to={props.destination}>Read full article ...</Link>

        <div>
          <span>By: {props.author}</span>
          <span>On: {props.date}</span>
        </div>
      </section>
    </Article>
  )
}

ArticleItem.propTypes = {
  thumbnail: PropTypes.string,
  articleName: PropTypes.string,
  articleDescription: PropTypes.string,
  destination: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
}

ArticleItem.defaultProps = {
  thumbnail: ArtcileThumbnail,
  articleName: 'Unknown',
  articleDescription: 'N/A',
  destination: '/404',
  author: 'Unknown',
  date: 'unknown',
}
