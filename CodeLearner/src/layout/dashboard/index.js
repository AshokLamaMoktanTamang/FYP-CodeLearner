// dependencies imported
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// componets imported
import NavBar from './navBar'
import Footer from '../../components/footer'
import SideBar from './sideBar'

// styled component
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 280px calc(100% - 280px);
  min-height: 100vh;
  width: 100vw;

  .content-container {
    display: grid;
    grid-template-rows: 4.3rem auto auto;
    width: 100%;
    overflow: hidden;

    & > div {
      padding: 1rem;
      margin-top: -2.5rem;
      width: 100%;
      overflow-x: hidden;
    }
  }

  @media (max-width: 800px) {
    grid-template-columns: auto;

    .content-container {
      & > div {
        margin-top: 0;
      }
    }
  }
`

export default function Index() {
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))
  const [registered, setregistered] = useState(false)

  useEffect(() => {
    if (token) {
      token.type === 'student' && setregistered('true')
      token.type === 'teacher' && navigate('/app/teacher')
    } else {
      navigate('/registration')
    }
  }, [token, navigate])

  return (
    registered && (
      <Wrapper>
        <SideBar />
        <div className="content-container">
          <NavBar />
          <Outlet />
          <Footer />
        </div>
      </Wrapper>
    )
  )
}
