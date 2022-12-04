// importing dependencies
import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

// styled components
const Container = styled.section`
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: fit-content;
  padding: 1rem 0;

  & > button {
    display: block;
    padding: 0.5rem 0.7rem;
    font-size: 0.85rem;
    font-weight: bold;
    background-color: var(--text-blue);
    color: var(--background-white);
    border: none;
    outline: none;
    border-radius: 0.19rem;
    cursor: pointer;
    margin: 0 0.5rem;

    :hover {
      background-color: var(--hover-404-blue);
    }

    :disabled {
      cursor: no-drop;
      filter: opacity(0.5);
    }
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    border: 2px solid var(--dark-border-color);
    border-radius: 0.25rem;

    & > a {
      display: block;
      padding: 0.35rem;
      min-width: 2rem;
      text-align: center;
      border-right: 2px solid var(--dark-border-color);
      text-decoration: none;
      color: var(--text-light-black);
      font-weight: bold;

      :last-child {
        border: none;
      }

      :hover {
        background-color: var(--scrollbar-color);
        color: var(--text-black);
      }
    }

    .active-page,.active-page: hover {
      background-color: var(--text-blue);
      color: var(--background-white);
    }
  }
`

export default function Pagination(props) {
  const [query] = useSearchParams()
  const pageNumber = parseInt(query.get('page'))
  const navigate = useNavigate()

  const handleNext = () => {
    navigate(`?page=${pageNumber + 1}`)
  }

  const handlePrev = () => {
    navigate(`?page=${pageNumber - 1}`)
  }

  return (
    <Container>
      <button disabled={(pageNumber <= 1 || query.get('page') === null) && true} onClick={handlePrev}>
        Prev
      </button>
      <div>
        {[...Array(props.pages)].map((page, i) => {
          if (i === 0) {
            return (
              <Link
                to={`?page=${i + 1}`}
                key={i + 1}
                className={pageNumber === i + 1 || query.get('page') === null ? 'active-page' : ''}
              >
                {i + 1}
              </Link>
            )
          }

          return (
            <Link to={`?page=${i + 1}`} key={i + 1} className={pageNumber === i + 1 ? 'active-page' : ''}>
              {i + 1}
            </Link>
          )
        })}
      </div>

      <button disabled={pageNumber >= props.pages && true} onClick={handleNext}>
        Next
      </button>
    </Container>
  )
}
