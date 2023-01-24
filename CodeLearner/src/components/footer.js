// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './logo'

// importing components

// styled components
const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: var(--footer-background);
  border-top: 1px dashed var(--light-border-color);

  & > div {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    & > section {
      display: grid;
      width: 175px;
      padding: 1rem;

      :first-child {
        grid-template-rows: 25% 25% 25% 25%;
      }

      & > h2 {
        font-size: 0.9rem;
        color: var(--text-black);
        line-height: 1.7;
        text-transform: Capitalize;
      }

      & > a,
      & > p,
      & > p a {
        font-size: 0.835rem;
        text-transform: Capitalize;
        line-height: 1.7;
        text-decoration: none;
        color: var(--text-light-black);
        width: fit-content;
      }

      & > p a {
        color: var(--text-blue);
        text-transform: initial;
        line-break: anywhere;
      }

      & > a:hover,
      & > p a:hover {
        color: var(--text-black);
      }
    }
  }

  & > section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    & > span {
      font-size: 0.83rem;
      font-weight: bold;
      color: var(--text-black);
      white-space: nowrap;
      line-height: 1.7;
    }
  }

  @media (max-width: 560px) {
    padding: 0;

    & > div {
      flex-direction: column;

      & > section {
        width: 100%;
        border-bottom: 1px solid var(--light-border-color);
      }
    }
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      <div>
        <section>
          <h2>About Us</h2>
          {localStorage.getItem('token') && <Link to={'/app/teachOnCodeLearner'}>Teach on CodeLearner</Link>}
          <Link to={'/about'}>About CodeLearner</Link>
          <Link to={'/contact'}>Contact Us</Link>
        </section>
        <section>
          <h2>Information</h2>
          <Link to={'/privacy-policy'}>Privacy Policy</Link>
          <Link to={'/terms-and-conditions'}>Terms and Condition</Link>
          <Link to={'/career'}>Career</Link>
        </section>
        <section>
          <h2>Customer Support</h2>
          <Link to={'/faq'}>FAQ</Link>
          <p>
            You can also mail us at
            <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}> {process.env.REACT_APP_CONTACT_EMAIL}</a>
          </p>
        </section>
      </div>

      <section>
        <Logo />

        <span>&#169; 2022 CodeLearner, Inc.</span>
      </section>
    </FooterWrapper>
  )
}
