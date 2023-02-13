// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing the react components
import Page from '../../components/page'

// testing component
// import TestImage from '../../Images/registration.jpg'
import { Link } from 'react-router-dom'

// styled components
const ProfileWrapper = styled.section`
  & > h2 {
    font-size: 1.1rem;
    line-height: 1.7;
  }

  & section {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--teacher-content-background);
    margin: 1rem 0;

    & > svg {
      font-size: 7rem;
    }

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div {
    & > p {
      display: grid;
      grid-template-columns: 120px auto;
      grid-gap: 1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: gray;

      & > span {
        font-weight: bold;
        color: var(--teacher-white);
      }
    }
  }

  .Light {
    & > p {
      & > span {
        color: var(--text-black);
      }
    }
  }

  & > a {
    padding: 0.7rem;
    border: none;
    outline: none;
    border-radius: 0.15rem;
    background-color: var(--text-blue);
    color: #fff;
    text-decoration: none;
    font-size: 0.875rem;
    display: block;
    width: fit-content;
    margin-top: 1rem;
  }
`

export default function Profile({ theme }) {
  return (
    <Page title="Profile">
      <ProfileWrapper>
        <h2>Profile</h2>

        <section>
          {/* <img src={TestImage} alt="Profile Image" /> */}
          <Icon icon="carbon:user-avatar-filled" />
        </section>

        <div className={theme}>
          <p>
            <span>First Name</span>
            John
          </p>
          <p>
            <span>Last Name</span>
            Doe
          </p>
          <p>
            <span>Email</span>
            moktashok@gmail.com
          </p>
          <p>
            <span>Saved Course</span>
            14
          </p>
          <p>
            <span>Teacher Account</span>
            Not Verified
          </p>
        </div>

        <Link to={'../setting'}>Update Profile</Link>
      </ProfileWrapper>
    </Page>
  )
}