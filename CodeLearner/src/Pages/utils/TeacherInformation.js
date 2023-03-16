// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import Loading from '../../components/loading'
import { fetchTeacherInfo } from '../../slice/teacherSlice'
import { useNavigate } from 'react-router-dom'
import PdfViewer from './PdfViewer'
import { Icon } from '@iconify/react';

// styled component
const Wrapper = styled.section`
  & > h1,
  & > div > h3,
  & > p {
    font-size: 1.3rem;
    color: var(--text-black);
    line-height: 1.7;
    margin-bottom: 0.5rem;
  }

  & > p {
    font-size: 0.875rem;
    display: grid;
    grid-template-columns: 130px auto;
    grid-gap: 1rem;

    & > span {
      color: var(--text-light-black);
      display: flex;
      align-items: center;

      & > svg{
        font-size: 1.1rem;
        margin-right: 0.5rem;
      }
    }
  }

  & > div {
    max-width: 450px;

    & > h3 {
      margin-top: 1rem;
      margin-bottom: 0;
    }

    & > p {
      font-size: 0.87rem;
      color: var(--text-light-black);
      line-height: 1.5;
      font-family: inherit;
    }

    & > button {
      display: block;
      padding: 0.7rem 0.9rem;
      background-color: var(--hover-purple);
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 0.15rem;
      cursor: pointer;

      :hover {
        background-color: var(--hover-404-blue);
      }
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
  }
`

export default function TeacherInformation() {
  // for alerts and loading
  const [showLoading, setshowLoading] = useState(false)
  const [userCV, setuserCV] = useState(null)
  const [showModal, setshowModal] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setshowLoading(true)
    dispatch(fetchTeacherInfo())
      .unwrap()
      .then(() => {
        setshowLoading(false)
      })
      .catch(() => {
        navigate('/app/teachOnCodeLearner')
      })
  }, [dispatch, navigate])

  const information = useSelector((state) => state.teacher.teacherInfo)

  return (
    <Page title="Teacher Information">
      <Wrapper>
        {showLoading && <Loading />}

        <h1>Basic Information</h1>
        {information && information.userId && (
          <>
            <p>
              Name <span>{information.userId.firstName + ' ' + information.userId.lastName}</span>
            </p>
            <p>
              Teaching Type <span>{information.teachingType}</span>
            </p>
            <p>
              Profession <span>{information.profession}</span>
            </p>
            <p>
              Status <span><Icon icon="ic:baseline-pending-actions" /> {information.status}</span>
            </p>

            <div>
              <h3>About yourself</h3>
              <p>{information.aboutSelf}</p>
            </div>

            <div>
              <h3>CV Preview</h3>
              <button
                onClick={() => {
                  setuserCV(information.CV)
                  setshowModal(true)
                }}
              >
                View CV
              </button>
            </div>
          </>
        )}

        {showModal && (
          <PdfModal>
            <section onClick={() => setshowModal(false)}></section>
            <div>
              <PdfViewer CV={userCV} />
            </div>
          </PdfModal>
        )}
      </Wrapper>
    </Page>
  )
}
