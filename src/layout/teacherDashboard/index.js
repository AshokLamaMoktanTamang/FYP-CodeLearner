// importing dependencies
import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// importing components
import NavBar from './navBar'
import SideBar from './sideBar'

// styled components
const TeacherDashboard = styled.section`
  & > div {
    display: grid;
    grid-template-columns: 70px auto;

    & > section {
      & > div {
        background-color: var(--teacher-background);
        color: var(--teacher-white);
        padding: 0.7rem;
        min-height: calc(100vh - 64px);
      }
    }
  }

  .ham-background {
    background: linear-gradient(75deg, rgba(22, 28, 36, 0.48) 0%, rgba(22, 28, 36, 1) 100%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: none;
  }

  @media (max-width: 600px) {
    & > div {
      display: initial;

      & > section {
        & > div {
          padding: 0.5rem;
        }
      }

      .side-bar {
        visibility: hidden;
        position: fixed;
        top: 0;
        transition: 0.15s ease-in-out;
        left: -70px;
        width: 70px;

        & > section {
          height: 100vh;
          padding-top: 10px;
        }
      }
    }
  }
`

export default function Index() {
  const [displayHam, setdisplayHam] = useState(null)
  const [showHamBackground, setshowHamBackground] = useState(null)
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const openHam = () => {
    setdisplayHam({ visibility: 'visible', left: 0 })
    setshowHamBackground({ display: 'initial' })
  }

  const closeHam = () => {
    setdisplayHam(null)
    setshowHamBackground(null)
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)

      if (windowSize >= 600) {
        closeHam()
      }
    }
  })

  return (
    <TeacherDashboard>
      <NavBar handleHamClick={openHam} />

      <div>
        <div className="side-bar" style={displayHam}>
          <div className="ham-background" style={showHamBackground} onClick={closeHam}></div>
          <SideBar handleLinkClick={closeHam} />
        </div>

        <section>
          <Outlet />
        </section>
      </div>
    </TeacherDashboard>
  )
}
