// importing libraries
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// importing components
import Footer from '../../components/footer'

// importing images
import Background from '../../Images/registration.jpg'
import LogoIcon from '../../Images/favicon.png'

// styled components
const RegistrationWrapper = styled.section`
  min-height: calc(100vh - 272px);
  background-color: var(--background-white);
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background-color: white;
    padding: 1rem;
    box-shadow: 0px 0px 7px 2px var(--light-border-color);
    display: grid;
    grid-template-columns: 50% 50%;
    width: 80vw;
    max-width: 900px;
    margin: 3rem 1rem;
    align-items: center;
  }

  .left,
  .right {
    overflow: hidden;
  }

  .left {
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      object-position: center;
    }
  }

  .right {
    div {
      max-width: 300px;
      width: 100%;
      margin: auto;
      padding: 2rem 1rem;
    }

    h2 {
      font-size: 1.1rem;
      color: var(--text-black);
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;

      label {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 1.7rem;
        border-bottom: 1px solid var(--dark-border-color);

        input {
          width: 100%;
          outline: none;
          padding: 0.5rem 0.7rem;
          font-size: 0.873rem;
          border: none;
          color: var(--text-light-black);
        }

        i {
          color: var(--text-black);
          cursor: pointer;
          font-size: 1.1rem;
        }
      }

      button {
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
        background-color: var(--text-blue);
        color: white;
        cursor: pointer;
        border-radius: 0.19rem;
        align-self: baseline;

        :hover {
          background-color: var(--hover-404-blue);
        }
      }
    }

    span {
      font-size: 0.873rem;
      line-height: 1.7;
      margin-top: 0.7rem;
      display: block;
      text-align: center;
      color: var(--text-light-black);

      a {
        color: var(--text-blue);
        font-weight: bold;
        text-decoration: none;

        :hover {
          text-decoration: underline;
        }
      }
    }

    .google-auth {
      width: 100%;
      background: white;
      border: none;
      padding: 0.7rem;
      border-radius: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      cursor: pointer;
      background-color: var(--text-blue);

      :hover {
        background-color: var(--hover-404-blue);
      }

      .google-auth-text {
        margin: 0;
        line-height: 0;
        text-transform: uppercase;
        margin: 0;
        line-height: 0;
        color: black;
        font-weight: bold;
        color: white;
        font-size: 0.783rem;
      }

      i {
        font-size: 1.3rem;
        display: flex;
        margin-right: 0.7rem;
        color: white;
      }
    }
  }

  @media (max-width: 850px) {
    .container {
      width: 100vw;
      min-height: inherit;
      margin: 0;
    }
  }

  @media (max-width: 560px) {
    min-height: calc(100vh - 448px);
  }

  @media (max-width: 650px) {
    .container {
      display: block;

      .left {
        display: none;
      }

      .right div {
        max-width: 500px;
      }
    }
  }
`

const Logo = styled.section`
  display: none;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  img {
    width: 2.3rem;
    height: 2.3rem;
  }

  p {
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    letter-spacing: 1px;
    color: var(--text-black);
  }

  @media (max-width: 650px) {
    display: flex;
  }
`

export default function Registration() {
  return (
    <>
      <RegistrationWrapper>
        <div className="container">
          {/* making the description of the web */}
          <div className="left">
            <img src={Background} alt="Logo" />
          </div>

          <div className="right">
            <Logo>
              <img src={LogoIcon} alt="logo"></img>
              <p>CodeLearner</p>
            </Logo>
            <Outlet />
          </div>
        </div>
      </RegistrationWrapper>
      <Footer />
    </>
  )
}
