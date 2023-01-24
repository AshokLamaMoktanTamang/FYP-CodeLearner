// importing denepdencies
import React from 'react'
import styled from 'styled-components'

// importing components
import Page from '../../components/page'

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
  & > section {
    margin-bottom: 2rem;

    & > h3 {
      margin-bottom: 0.7rem;
      font-size: 0.9rem;
      color: var(--hover-404-blue);
      text-transform: Uppercase;

      ::before {
        background-color: var(--text-light-black);
      }
    }

    & > p,
    & ul li {
      font-size: 0.835rem;
      line-height: 1.5;
      color: var(--text-light-black);
      text-align: justify;
    }

    & > ul {
      margin-top: 0.35rem;
      list-style: inside;
    }
  }
`

export default function FAQ() {
  return (
    <Page title="FAQ">
      <Container>
        <h2>Frequently Asked Question (FAQ)</h2>

        <section>
          <h3>How can I post course?</h3>
          <p>Post course using the CodeStudio</p>
          <ul>
            <li>Go to CodeStudio</li>
            <li>Click add button on top right corner</li>
            <li>Select the video</li>
            <li>Click submit button</li>
            <li>Your course will appear after the upload is complete</li>
          </ul>
        </section>
        <section>
          <h3>How can I post course?</h3>
          <p>Post course using the CodeStudio</p>
          <ul>
            <li>Go to CodeStudio</li>
            <li>Click add button on top right corner</li>
            <li>Select the video</li>
            <li>Click submit button</li>
            <li>Your course will appear after the upload is complete</li>
          </ul>
        </section>
      </Container>
    </Page>
  )
}
