// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

// importing components
import Page from '../../components/page'
import { fetchAllTeacherInfo } from '../../slice/teacherSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import TeacherCard from '../../components/TeacherCard'

// styled components
const Wrapper = styled.section`
  min-height: calc(100vh - 75px - 2rem);

  & > div {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    grid-gap: 1.7rem 1rem;

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

export default function Teacher() {
  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoadng(true)
    dispatch(fetchAllTeacherInfo())
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

  const infos = useSelector((state) => state.teacher.teacherInfos)

  return (
    <Page title="Admin Teacher">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}

      <Wrapper>
        <h1>Teacher Requests</h1>

        <div>
          {infos && infos.length > 0 ? (
            infos.map((info, index) => {
              return (
                <TeacherCard
                  key={index}
                  id={info.userId._id}
                  fname={info.userId.firstName}
                  lname={info.userId.lastName}
                  cv={info.CV}
                  status={info.status}
                  profession={info.profession}
                  profile={info.userId.profilePic}
                  submitDate={info.createdAt}
                />
              )
            })
          ) : (
            <p>
              <Icon icon="fluent:cellular-data-unavailable-24-filled" />
              No Teacher Request available
            </p>
          )}
        </div>
      </Wrapper>
    </Page>
  )
}
