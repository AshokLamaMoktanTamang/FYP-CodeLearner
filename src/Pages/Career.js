// importing denepdencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// importing components
import Page from '../components/page'

// stylde components
const Container = styled.section`
  max-width: 1100px;
  margin: auto;

  & > h2,
  & > section h3 {
    font-size: 1.1rem;
    color: var(--text-black);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    position: relative;
    width: fit-content;

    ::before {
      position: absolute;
      content: '';
      width: 40%;
      height: 5px;
      border-radius: 20px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
    }
  }
  & > a {
    margin-bottom: 2rem;
    text-decoration: none;
    background-color: var(--hover-white);
    padding: 1rem;
    display: block;
	border-radius: 0.15rem;

    & > h3 {
      margin-bottom: 0.7rem;
      font-size: 0.9rem;
      color: var(--hover-404-blue);
      text-transform: Uppercase;

      ::before {
        background-color: var(--text-light-black);
      }
    }

	& > p{
		margin-top: 1rem;
	}

    & > p,
    & ul li {
      font-size: 0.835rem;
      line-height: 1.5;
      color: var(--text-light-black);
      text-align: justify;
    }

    & > ul {
      margin: 0.35rem 0;
      list-style: inside;
    }
  }
`

export default function Career() {
  return (
    <Page title="Career">
      <Container>
        <h2>Career</h2>

        <Link to={'senior-qa'}>
          <h3>Senior QA</h3>
          <ul>
            <li>Job Location:Kathmandu</li>
            <li>Job level: Senior level</li>
            <li>Job level: Senior level</li>
            <li>Education: Minimum Bachelor Degree</li>
          </ul>
          <p>Click to read more...</p>
        </Link>
      </Container>
    </Page>
  )
}
