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

export default function PrivacyPoliicy() {
  return (
    <Page title="Privacy & Policy">
      <Container>
        <h2>Privacy and Policy</h2>

        <section>
          <h3>Data Security and privacy policy</h3>
          <p>
            CodeLearner is dedicated to safeguarding the information and privacy of anyone who visit and use its website
            and platform. Visitors to CodeLearner's website are required to give us personal information while using our
            platform, however we won't gather any of your data beyond the data provided by user unless you specifically
            and consciously decide to do so. To access the services of the CodeLearner platform, you must, however,
            submit certain personal information as requested by CodeLearner. The privacy of such information is of
            greatest significance to CodeLearner.
          </p>
        </section>

        <section>
          <h3>Personally Identifiable Information</h3>
          <p>
            Without your permission, CodeLearner will not gather any personal information. Your voluntary submission of
            personal data grants CodeLearner permission to use the data for the expressly specified purpose. CodeLearner
            may be unable to provide you with the service you require if you give insufficient information. If you
            decide to give us with personal information through the platform, CodeLearner will use such data to fulfill
            your request for a service.
          </p>
        </section>

        <section>
          <h3>Disclosure of the information</h3>
          <p>
            If you choose to give CodeLearn your personal information, you agree to its use of that information and
            grant permission for CodeLearner to disclose that information to its employees, contractors, vendors, and,
            under special circumstances, third parties for the sole purpose of carrying out official business for
            CodeLearner or providing the service you requested. To secure your personal information, CodeLearner makes
            sure that these third parties are always subject to confidentiality obligations. CodeLearner will not
            divulge, distribute, or rent your personal information to third parties for commercial gain unless necessary
            for the aforementioned purposes or situations. However, given the current legal framework in Nepal,
            CodeLearner is unable to guarantee that your personal information won't be disclosed when requested by
            governmental authorities. Please be aware that it is your duty to keep your user ID and login password
            secure and not to reveal them to anyone you do not trust to use them appropriately.
          </p>
        </section>
      </Container>
    </Page>
  )
}
