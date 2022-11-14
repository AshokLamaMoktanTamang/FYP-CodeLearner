// importing the react and external libraries
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

// importing the react components
import Page from '../components/page'
import SearchItem from '../components/searchItem'

// test components
// import CourseImage from '../Images/registration.jpg'

// styled components
const SearchWrapper = styled.section`
  .search-heading {
    font-size: 1.1rem;
    color: var(--text-black);
    line-height: 1.5;
    padding-bottom: 0.7rem;
    text-transform: capitalize;
  }

  .search-results-container {
    display: grid;
    grid-gap: 1rem;
  }
`

export default function Article() {
  const { query } = useParams()

  return (
    <Page title={`${query}`}>
      <SearchWrapper>
        <h2 className="search-heading">Search - {query} (6 results)</h2>

        <div className="search-results-container">
          <SearchItem saved={false} />
          <SearchItem saved={false} />
          <SearchItem saved={false} />
        </div>
      </SearchWrapper>
    </Page>
  )
}
