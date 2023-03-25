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
const Wrapper = styled.section``

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

  return (
    <Page title="Admin Interview">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}
      <Wrapper>
        <h1>Interviews</h1>

        <div>
          {interviews && interviews.length > 0 ? (
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
