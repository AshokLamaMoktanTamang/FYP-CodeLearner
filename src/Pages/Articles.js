// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import ArticleItem from '../components/articleItem'

// importing the react components
import Page from '../components/page'

// styled components
const ArticleWrapper = styled.section`
  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
  }

  & > div {
    max-width: 950px;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-gap: 5%;
  }
`

export default function Article() {
  return (
    <Page title="Articles">
      <ArticleWrapper>
        <h2>Articles</h2>

        <div>
          <ArticleItem />
        </div>
      </ArticleWrapper>
    </Page>
  )
}
