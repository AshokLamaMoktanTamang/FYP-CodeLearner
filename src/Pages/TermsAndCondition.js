// importing denepdencies
import React from 'react'
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

  & > section {
    margin-bottom: 2rem;

    & > h3 {
      margin-bottom: 0.7rem;
      font-size: 0.97rem;
      color: var(--hover-404-blue);
      text-transform: Uppercase;

      ::before {
        background-color: var(--text-light-black);
      }
    }

    & > p {
      font-size: 0.835rem;
      line-height: 1.5;
      color: var(--text-light-black);
      text-align: justify;
    }
  }
`

export default function TermsAndCondition() {
  return (
    <Page title="Terms & Conditions">
      <Container>
        <h2>Terms And Condition</h2>

        <section>
          <h3>Terms and conditions/Terms of Use</h3>
          <p>
            The main terms and conditions of your use of the website CodeLearner.com and any affiliated products and
            services are outlined in these terms and conditions. You and CodeLearner are both bound by the terms of this
            Agreement. You acknowledge that you have read, understand, and agree to be bound by the terms of this
            Agreement by accessing and using the Services, and you accept and agree to these terms and conditions and
            any updates going forward. Additionally, you consent to abide by the CodeLearner Policies, as described on
            the website and as updated from time to time. You can immediately cease using the Services if you decide
            that any of these conditions are unacceptable to you. We grant you a limited, non-exclusive, personal right
            to access and use the Website provided that you abide by these Terms of Use. The terms "User" and "you/your"
            refer to the business or other legal entity if you are signing this agreement on its behalf. In that
            instance, "User" and "you/your" refer to the business or other legal entity. You agree that even though it
            is electronic and not physically signed by you, this Agreement, which controls your use of the Services and
            places a legal duty on you, is a contract between you and the CodeLearner.
          </p>
        </section>
      </Container>
    </Page>
  )
}
