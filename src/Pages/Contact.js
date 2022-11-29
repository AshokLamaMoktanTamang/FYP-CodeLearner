// impoting dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing components
import Page from '../components/page'

// styled components
const ContactWrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  justify-content: center;
  grid-gap: 5rem;
  padding: 3rem;

  & > form {
    display: block;
    max-width: 500px;
    width: 100%;
    align-self: right;
    border: 2px solid var(--light-border-color);
    background-color: var(--background-white);
    padding: 1rem;

    & > h2 {
      font-size: 1.1rem;
      color: var(--text-black);
      line-height: 1.7;
      text-align: center;
      margin-bottom: 1rem;
    }

    & > div {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 1rem;
    }

    & > label,
    & > div label {
      display: block;
      margin-bottom: 1rem;

      & > span {
        font-size: 0.95rem;
        color: var(--text-light-black);
        font-weight: bold;
        line-height: 1.7;
      }

      & > input,
      & > textarea {
        width: 100%;
        padding: 0.5rem;
        line-height: 1.5;
        border-radius: 0.15rem;
        border: 1px solid var(--dark-border-color);
        outline-color: var(--hover-404-blue);
      }

      & > textarea {
        resize: none;
      }
    }

    & > button {
      width: 100%;
      display: block;
      padding: 1rem;
      font-size: 1rem;
      background-color: var(--text-blue);
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      font-weight: bold;
      border-radius: 0.15rem;

      :hover {
        background-color: var(--hover-404-blue);
      }
    }
  }

  & > div {
    display: grid;
    height: fit-content;

    & > h2 {
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 0.35rem;
    }

    & > a {
      display: flex;
      text-decoration: none;
      color: var(--text-light-black);
      margin: 0.5rem 0;
      align-items: center;
      width: fit-content;

      :hover {
        color: var(--text-black);
      }

      & > svg {
        font-size: 1.9rem;
        margin-right: 0.5rem;
      }
    }

    .insta svg {
      color: #e95950;
    }

    .mail svg {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 650px) {
    grid-template-columns: none;
    padding: 0;
    grid-gap: 3rem;

    & > div {
      display: flex;
      flex-wrap: wrap;

      & > h2 {
        display: block;
        width: -webkit-fill-available;
        width: -moz-available;
      }

      & > a {
        margin-right: 1rem;

        :last-child {
          margin-right: 0;
        }
      }
    }
  }
`

export default function Contact() {
  return (
    <Page title="Articles">
      <ContactWrapper>
        <form>
          <h2>Contact CodeLearner</h2>

          <div>
            <label>
              <span>First Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Last Name</span>
              <input type="text" />
            </label>
          </div>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Subject</span>
            <input type="text" />
          </label>
          <label>
            <span>Message</span>
            <textarea cols="30" rows="10" />
          </label>

          <button>Submit</button>
        </form>

        <div>
          <h2>Connect us at</h2>

          <Link to={process.env.REACT_APP_FACEBOOK_LINK}>
            <Icon icon="logos:facebook" />
            Facebook
          </Link>
          <Link to={process.env.REACT_APP_INSTAGRAM_LINK} className="insta">
            <Icon icon="uil:instagram-alt" />
            Instagram
          </Link>
          <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`} className="mail">
            <Icon icon="logos:google-gmail" />
            Gmail
          </a>
        </div>
      </ContactWrapper>
    </Page>
  )
}
