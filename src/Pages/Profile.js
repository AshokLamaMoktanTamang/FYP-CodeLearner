// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'

// importing the react components
import Page from '../components/page'
import ProfileBox from '../components/profileBox'
import SearchItem from '../components/searchItem'

// styled components
const ProfileWrapper = styled.section`
  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
  }

  & > div {
    display: grid;
    grid-template-columns: 300px auto;
  }

  & > section {
    display: block;
    max-width: 700px;

    h2 {
      font-size: 1.1rem;
      color: var(--text-black);
    }
  }
`

export default function Profile() {
  return (
    <Page title="Profile">
      <ProfileWrapper>
        <h2>Hello! Ashok Lama</h2>

        <div>
          <ProfileBox />
        </div>

        <section>
          <h2>Saved Courses</h2>
          <SearchItem />
        </section>
      </ProfileWrapper>
    </Page>
  )
}
