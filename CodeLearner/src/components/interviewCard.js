// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// importing components
import { rejectApplication } from '../slice/teacherSlice'
import AlertMessage from './alertMessage'
import Loading from './loading'

// styled components
const Card = styled.section`
  background-color: var(--background-white);
  border: 0.13rem solid var(--light-border-color);
  border-radius: 0.35rem;
  overflow: hidden;
  width: 100%;
  position: relative;
  line-height: 1.35;
  color: var(--text-black);
  display: grid;
  grid-template-columns: max-content auto;  
  max-width: 650px;
  text-decoration: none;  

  .prfl {
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
      grid-template-columns: 120px auto;
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
    margin: 0 !important;
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

export default function InterviewCard({ profile, fname, lname, id, interviewTime, email, adminId, userId }) {
  // initializing the state for the action modals
  const [currentAction, setcurrentAction] = useState('reject')
  const [showActionModal, setshowActionModal] = useState(false)

  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // const modal controller
  const HandleActionModal = (action) => {
    setcurrentAction(action)
    setshowActionModal(true)
  }

  // controllers
  const dispatch = useDispatch()
  const [rejectMessage, setrejectMessage] = useState('')

  const HandleRejectApplication = () => {
    setshowLoadng(true)
    if (rejectMessage.trim().length < 1) {
      setstatus('error')
      setmessage('Enter the reject message')
      setshowLoadng(false)
      setopen(true)
    }

    dispatch(rejectApplication({ id: userId, message: rejectMessage }))
      .unwrap()
      .then(() => {
        window.location.reload(true)
      })
      .catch(() => {
        setstatus('error')
        setmessage('Failed to reject application')
        setshowLoadng(false)
        setopen(true)
      })
  }

  return (
    <Card>
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}

      <section className='prfl'>
        {profile ? (
          <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${profile}`} alt="Denim Jeans" />
        ) : (
          <Icon icon="carbon:user-avatar-filled" />
        )}
      </section>

      <div>
        <h1>{`${fname} ${lname}`}</h1>
        <p>
          <span>Email</span> {email}
        </p>
        <p>
          <span>Interview Time</span> {interviewTime}
        </p>
        <button onClick={() => window.open(`//${process.env.REACT_APP_LIVE_SERVER_URL}/${id}?id=${adminId}`)}>Take Interview</button>
        <button onClick={() => HandleActionModal('assign')}>Approve</button>
        <button onClick={() => HandleActionModal('reject')}>Reject</button>
      </div>

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
              <p>Are you sure you want to approve {`${fname} ${lname}`}!</p>

              <section>
                <button onClick={() => setshowActionModal(false)}>Cancel</button>
                <button>Approve</button>
              </section>
            </div>
          )}
        </ActionModal>
      )}
    </Card>
  )
}
