// importing dependencies
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { Icon } from '@iconify/react'
import InterviewCard from '../../components/interviewCard'

// importing components
import Page from '../../components/page'
import { fetchInterviews } from '../../slice/interviewSlice'

// styled components
const Wrapper = styled.section`
  & > div{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    grid-gap: 1.7rem 1rem;
    margin-top: 1rem;

    & > p {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-light-black);

      & > svg{
        font-size: 3rem;
        margin-bottom: .5rem;
      }
    }
  }
`

export default function Interview() {
  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoadng(true)
    dispatch(fetchInterviews())
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
  }, [dispatch])

  const interviews = useSelector((state) => state.interview.interviews.interviews)
  const admin = useSelector((state) => state.admin.admin.data)
  console.log(interviews);

  return (
    <Page title="Admin Interview">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}
      <Wrapper>
        <h1>Interviews</h1>

        <div>
          {admin && interviews && interviews.length > 0 ? (
            interviews.map((interview, index) => {
              return (
                <InterviewCard
                  fname={interview.user.firstName}
                  lname={interview.user.lastName}
                  email={interview.user.email}
                  profile={interview.user.profilePic}
                  interviewTime={interview.interviewTime}
                  id={interview._id}
                  key={index}
                  adminId={admin._id}
                  userId={interview.user._id}
                />
              )
            })
          ) : (
            <p>
              <Icon icon="fluent:cellular-data-unavailable-24-filled" />
              No Interview Request available
            </p>
          )}
        </div>

      </Wrapper>
    </Page>
  )
}
