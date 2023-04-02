// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

// importing components
import Page from '../../components/page'
import { approveTeacher, fetchTeacherInfoById, rejectApplication } from '../../slice/teacherSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { useNavigate, useParams } from 'react-router-dom'
import PdfViewer from '../utils/PdfViewer'

// styled components
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 500px auto;
  grid-gap: 2rem;
  margin-bottom: -1rem;

  & > div {
    height: calc(100vh - 75px - 1rem);
    overflow-y: scroll;

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

        & > svg {
          font-size: 1.1rem;
          margin-right: 0.5rem;
        }
      }
    }

    & > div {
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
    }

    & > section {
      display: grid;
      grid-template-columns: 150px 150px;
      grid-gap: 1rem;
      max-width: 400px;
      margin-top: 3rem;

      & > button {
        padding: 0.9rem;
        min-width: 100px;
        width: 150px;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        border: none;
        background-color: var(--pdf-red);
        color: #fff;
        border-radius: 0.25rem;

        :first-child {
          background-color: var(--text-black);
        }

        :hover {
          filter: brightness(0.7);
        }
      }
    }
  }

  & > section {
    height: calc(100vh - 75px - 2rem);
    overflow: scroll;
    border: 2px solid var(--text-black);
    border-radius: 0.25rem;
  }
`

const ActionModal = styled.section`
  & > section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #00000077;
    backdrop-filter: blur(3px);
  }

  & > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--background-white);
    padding: 1rem;
    border-radius: 0.25rem;
    max-width: 500px;

    & > p {
      font-weight: bold;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    & > input {
      width: 100%;
      padding-bottom: 0.5rem;
      border: none;
      border-bottom: 2px solid var(--text-light-black);
      margin-bottom: 1rem;
      outline: none;

      :focus {
        border-bottom: 2px solid var(--text-black);
      }
    }

    & > section {
      display: grid;
      grid-template-columns: 100px 100px;
      grid-gap: 1rem;
      margin-top: 1rem;

      & > button {
        display: block;
        padding: 0.7rem;
        outline: none;
        cursor: pointer;
      }
    }
  }
`

export default function DetailedInterview() {
  const { id } = useParams()

  // initializing the state for the action modals
  const [currentAction, setcurrentAction] = useState('reject')
  const [showActionModal, setshowActionModal] = useState(false)

  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoadng(true)
    dispatch(fetchTeacherInfoById(id))
      .unwrap()
      .then(() => {
        setshowLoadng(false)
      })
      .catch(() => {
        setstatus('error')
        setmessage('Failed to fetch informations')
        setshowLoadng(false)
        setopen(true)
      })
  }, [dispatch, id])

  const info = useSelector((state) => state.teacher.teacherInfo)

  // const modal controller
  const HandleActionModal = (action) => {
    setcurrentAction(action)
    setshowActionModal(true)
  }

  const [rejectMessage, setrejectMessage] = useState('')
  const [interviewTime, setInterviewTime] = useState('')

  const HandleRejectApplication = () => {
    setshowLoadng(true)
    if (rejectMessage.trim().length < 1) {
      setstatus('error')
      setmessage('Enter the reject message')
      setshowLoadng(false)
      setopen(true)
    }

    dispatch(rejectApplication({ id, message: rejectMessage }))
      .unwrap()
      .then(() => {
        navigate('/app/admin/teacher')
      })
      .catch(() => {
        setstatus('error')
        setmessage('Failed to reject application')
        setshowLoadng(false)
        setopen(true)
      })
  }

  const HandleAssign = (e) => {
    e.preventDefault();

    setshowLoadng(true)
    if (interviewTime === '') {
      setstatus('error')
      setmessage('Enter the interview time')
      setshowLoadng(false)
      setopen(true)
    }

    const today = new Date();
    if (new Date(today) >= new Date(interviewTime)) {
      setstatus('error')
      setmessage('Enter the valid interview time')
      setshowLoadng(false)
      setopen(true)
    }

    dispatch(approveTeacher({ id, interviewTime })).unwrap().then(() => {
      navigate('/app/admin/interview')
    }).catch(() => {
      setstatus('error')
      setmessage('Failed to approve application')
      setshowLoadng(false)
      setopen(true)
    })
  }

  return (
    <Page title="Teacher Name">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}
      <Wrapper>
        {info && info.userId && (
          <>
            <div>
              <h1>Basic Information</h1>
              <p>
                Name <span>{info.userId.firstName + ' ' + info.userId.lastName}</span>
              </p>
              <p>
                Teaching Type <span>{info.teachingType}</span>
              </p>
              <p>
                Profession <span>{info.profession}</span>
              </p>
              <p>
                Status{' '}
                <span>
                  <Icon icon="ic:baseline-pending-actions" /> {info.status}
                </span>
              </p>

              <div>
                <h3>About yourself</h3>
                <p>{info.aboutSelf}</p>
              </div>

              <section>
                <button onClick={() => HandleActionModal('assign')}>Assign Interview</button>
                <button onClick={() => HandleActionModal('reject')}>Reject</button>
              </section>
            </div>

            <section>
              <PdfViewer CV={info.CV} />
            </section>
          </>
        )}
      </Wrapper>

      {showActionModal && (
        <ActionModal>
          <section onClick={() => setshowActionModal(false)}></section>
          {currentAction === 'reject' ? (
            <div>
              <p>What is the reason for rejecting the form?</p>
              <input type="text" placeholder="Reason" onChange={(e) => setrejectMessage(e.target.value)} />

              <section>
                <button onClick={() => setshowActionModal(false)}>Cancel</button>
                <button onClick={HandleRejectApplication}>Reject</button>
              </section>
            </div>
          ) : (
            <div>
              <p>Choose a date for interview!</p>
              <input type="datetime-local" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} />

              <section>
                <button onClick={() => setshowActionModal(false)}>Cancel</button>
                <button onClick={HandleAssign}>Assign</button>
              </section>
            </div>
          )}
        </ActionModal>
      )}
    </Page>
  )
}
