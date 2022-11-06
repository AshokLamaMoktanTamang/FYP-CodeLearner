// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react';

// styled components
const ErrorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  text-align: center;

  h2 {
    text-transform: capitalize;
    line-height: 1.3;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    width: 100%;
    max-width: 350px;
    margin: 1rem 0;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    background-color: var(--text-blue);
    color: white;
    padding: 0.7rem 2.7rem;
    border-radius: 50px;
    margin-top: 0.7rem;

    :hover {
      background-color: var(--hover-404-blue);
    }
  }

  i{
    font-size: 7rem
  }
`

export default function page404() {
  return (
    <ErrorWrapper>
      <i>
        <Icon icon="noto-v1:dizzy-face" />
      </i>
      <h2>404 - page not found</h2>
      <p>The page you are looking might have been removed or out of services.</p>
      <Link to="/">Go to Home</Link>
    </ErrorWrapper>
  )
}
