// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'

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
    background-color: transparent;

    & > p {
      & > span {
        color: var(--text-black);
      }
    }

    & > svg {
      color: #aab8c9;
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
  const user = useSelector((state) => state.user.user)

  return (
    <Page title="Profile">
      <ProfileWrapper>
        <h2>Profile</h2>

        {user && (
          <>
            <section className={theme}>
              {user.data.profilePic ? (
                <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${user.data.profilePic}`} alt="Profile" />
              ) : (
                <Icon icon="carbon:user-avatar-filled" />
              )}
            </section>

            <div className={theme}>
              <p>
                <span>First Name</span>
                {user.data.firstName}
              </p>
              <p>
                <span>Last Name</span>
                {user.data.lastName}
              </p>
              <p>
                <span>Email</span>
                {user.data.email}
              </p>
            </div>
          </>
        )}

        <Link to={'../setting'}>Update Profile</Link>
      </ProfileWrapper>
    </Page>
  )
}
