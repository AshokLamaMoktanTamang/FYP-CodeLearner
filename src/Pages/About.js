// importing dependencies
import React from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Icon } from '@iconify/react'

// importing components
import Page from '../components/page'
import { Sliders } from '../service/Sliders'
import Info from '../Images/info.png'
import Logo from '../components/logo'

// styled components
const AboutWrapper = styled.section`
  max-width: 900px;
  margin: auto;

  & > div {
    max-height: 405px;

    .control-arrow {
      top: 50% !important;
      transform: translateY(-50%);
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
    }

    .slide div {
      width: 100%;
      padding-top: 45%;
      position: relative;
      overflow: hidden;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
      }
    }
  }

  & > section {
    display: block;
    margin: 3rem 0;

    & > div {
      display: grid;
      grid-template-columns: 48% 48%;
      grid-gap: 4%;
      margin-top: 0.75rem;

      & > p {
        font-size: 0.935rem;
        color: var(--text-light-black);
        line-height: 1.7;
        text-align: justify;
      }

      & > img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        object-fit: cover;
      }
    }
  }

  & > ul {
    list-style: none;
    margin-bottom: 0.7rem;

    & > h2 {
      text-align: center;
      margin-bottom: 0.7rem;
      color: var(--text-black);
    }

    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      & > li {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: var(--text-light-black);
        margin: 1rem;
        cursor: pointer;

        svg {
          font-size: 3rem;
          color: var(--text-blue);
          margin-right: 1rem;
        }
      }
    }
  }

  @media (max-width: 650px) {
    & > div {
      margin: -1rem;
    }
  }

  @media (max-width: 550px) {
    & > section {
      & > div {
        grid-template-columns: none;
        grid-gap: 1rem;
      }
    }
  }
`

export default function About() {
  return (
    <Page title="About">
      <AboutWrapper>
        <div>
          <Carousel
            autoPlay
            emulateTouch
            infiniteLoop
            interval={2500}
            transitionTime={300}
            showStatus={false}
            stopOnHover={false}
            showThumbs={false}
          >
            {Sliders.map((slider, index) => (
              <div key={index}>
                <img src={slider.slider} alt="slider" />
              </div>
            ))}
          </Carousel>
        </div>

        <section>
          <Logo />
          <div>
            <p>
              As of today, every aspect of development is leaning towards the technological development. There are a lot
              of persons who wants to learn the new thing extra from their academic and career. But there are not so
              many resources and learning materials, so CodeLearner makes the life easy by providing the good resources
              and learning materials with the proper guidance. The pre recorded video and live sessions with the student
              will make the learning outcome very efficient.
            </p>

            <img src={Info} alt="CodeLearner" />
          </div>
        </section>

        <ul>
          <h2>Our Services</h2>
          <div>
            <li>
              <Icon icon="wpf:books" /> Online Courses
            </li>
            <li>
              <Icon icon="healthicons:i-training-class" />
              Live Sessions
            </li>
            <li>
              <Icon icon="fa-solid:chalkboard-teacher" />
              Teachers
            </li>
            <li>
              <Icon icon="material-symbols:article" />
              Articles
            </li>
            <li>
              <Icon icon="healthicons:i-exam-multiple-choice" />
              Tests
            </li>
          </div>
        </ul>
      </AboutWrapper>
    </Page>
  )
}
