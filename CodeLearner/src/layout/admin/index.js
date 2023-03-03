// dependencies imported
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

// componets imported
import NavBar from './navBar'
import { fetchAdmin } from '../../slice/adminSlice'
import Loading from '../../components/loading'

// styled component
const Wrapper = styled.section`
  .content-container {
    padding: 1rem;
  }
`

export default function Index() {
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')
  const [registered, setregistered] = useState(false)
  const [showLoadng, setshowLoadng] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setshowLoadng(true)
    if (token) {
      dispatch(fetchAdmin())
        .unwrap()
        .then((data) => {
          if (data && data.data && data.data.hasInitialPassword) {
            navigate('/app/admin/update')
          }
          setshowLoadng(false)
        })
        .catch(() => {
          navigate('/app/admin/login')
        })
      setregistered(true)
    } else {
      navigate('/app/admin/login')
    }
  }, [token, navigate, dispatch])

  return (
    registered && (
      <Wrapper>
        {showLoadng && <Loading />}
        <NavBar />
        <div className="content-container">
          <Outlet />
        </div>
      </Wrapper>
    )
  )
}
