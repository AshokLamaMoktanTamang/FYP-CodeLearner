// importing dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PdfViewer from '../Pages/utils/PdfViewer'
import { Icon } from '@iconify/react'

// styled components
const Card = styled.section`
  background-color: var(--background-white);
  border: 0.13rem solid var(--light-border-color);
  border-radius: 0.35rem;
  overflow: hidden;
  max-width: 650px;

  & > a {
    width: 100%;
    position: relative;
    text-decoration: none;
    line-height: 1.35;
    color: var(--text-black);
    display: grid;
    grid-template-columns: max-content auto;

    :hover {
      filter: brightness(0.7);
    }

    & section {
      margin: 1rem;
      
      & > img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid var(--text-black);
      }
      
      & > svg {
        font-size: 10rem;
        border-radius: 50%;
        border: 2px solid var(--text-black);
      }
    }

    & > div {
      & > h1 {
        font-size: 1rem;
        padding: 0.5rem;
      }

      & > p {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--text-light-black);
        display: grid;
        grid-template-columns: 90px auto;
        padding: 0.1rem 0.5rem;

        & > span {
          font-size: 0.835rem;
          color: var(--text-blue);
          line-height: 1.35;
          padding-bottom: 0.5rem;
          display: block;
        }
      }
    }
  }

  & > button {
    display: block;
    width: 100%;
    border: none;
    padding: 1rem;
    border-top: 1px solid var(--light-border-color);
    background-color: var(--text-blue);
    color: #fff;
    font-weight: bold;
    cursor: pointer;

    :hover {
      filter: brightness(0.7);
    }
  }
`

const PdfModal = styled.section`
  & > section {
    position: fixed;
    background-color: #00000076;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  & > div {
    padding: 0.5rem;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 900px;
    height: 100%;
    overflow: auto;
    margin: auto;
    z-index: 10;
  }
`

export default function TeacherCard({ profile, fname, lname, cv, about, status, profession, id, submitDate }) {
  const [showModal, setshowModal] = useState(false)

  return (
    <Card>
      <Link to={id}>
        <section>
          {profile ? (
            <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${profile}`} alt="Denim Jeans" />
          ) : (
            <Icon icon="carbon:user-avatar-filled" />
          )}
        </section>

        <div>
          <h1>{`${fname} ${lname}`}</h1>
          <p>
            <span>Profession</span> {profession}
          </p>
          <p>
            <span>Status</span> {status}
          </p>
          <p>
            <span>Submit Date</span> {submitDate}
          </p>
        </div>
      </Link>

      <button onClick={() => setshowModal(true)}>View CV</button>

      {showModal && (
        <PdfModal>
          <section onClick={() => setshowModal(false)}></section>
          <div>
            <PdfViewer CV={cv} />
          </div>
        </PdfModal>
      )}
    </Card>
  )
}
