// dependencies imported
import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

// components imported
import NavConfig from './navConfig'
import Logo from '../../components/logo'

// importing images
import LogoIcon from '../../Images/favicon.png'

// styled component
const Sidebar = styled.section`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: var(--text-black);
  border-right: 1px dashed var(--light-border-color);
  background-color: var(--background-white);
  padding: 2rem 1.7rem;
  transition: 0.15s ease-in-out;
  position: sticky;
  top: 0px;
  height: 100vh;
  overflow-y: auto;

  .search-bar {
    background: white;
    border: 0.13rem solid var(--dark-border-color);
    border-radius: 0.3rem;
    overflow: hidden;
    display: flex;
    margin: 1.7rem -0.87rem;

    input,
    button {
      border: none;
      outline: none;
    }

    input {
      padding: 0.5rem 0.1rem 0.5rem 0.7rem;
      width: 100%;
    }

    button {
      cursor: pointer;
      padding: 0.3rem 0.5rem;
      font-size: 1.1rem;
      display: block;
      color: var(--text-blue);
      background-color: transparent;

      :hover {
        color: var(--hover-404-blue);
      }

      i {
        position: relative;
        top: 0.13rem;
      }
    }
  }

  @media (max-width: 800px) {
    visibility: hidden;
    left: -280px;
    position: fixed;
    max-width: 300px;
    width: 100%;
    height: 100vh;
    z-index: 12;
  }
`

const HamMenu = styled.button`
  padding: 0.3rem;
  height: 2.1rem;
  width: 2.1rem;
  font-size: 1.315rem;
  color: var(--text-black);
  display: none;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
    position: absolute;
    left: 1rem;
    transform: translateY(-50%);
    top: 2.15rem;
  }
`

const HamBackground = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(75deg, rgba(22, 28, 36, 0.48) 0%, rgba(22, 28, 36, 1) 100%);
  z-index: 11;
`

export default function SideBar() {
  const [hamDisplay, sethamDisplay] = useState(null)
  const [hamBackground, sethamBackground] = useState('none')
  const [searchQuery, setsearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSideBar = () => {
    sethamDisplay(hamDisplay === null ? { visibility: `initial`, left: `0` } : null)
    sethamBackground(hamDisplay === null ? `` : `none`)
  }

  const closeSideBar = () => {
    sethamDisplay(null)
    sethamBackground('none')
  }

  const handleSearch = (e) => {
    e.preventDefault()

    searchQuery.trim().length !== 0 && navigate(`search/${searchQuery}`)
  }

  return (
    <>
      {/* making the ham menu for responsiveness */}
      <HamMenu onClick={handleSideBar}>
        <Icon icon="fa6-solid:bars" />
      </HamMenu>

      <HamBackground onClick={handleSideBar} style={{ display: hamBackground }}></HamBackground>

      <Sidebar style={hamDisplay}>
        {/* make a logo */}
        <Logo location="/app" OnClick={closeSideBar} logoIcon={LogoIcon} target="Learner" />

        {/* make a search bar */}
        <form
          className="search-bar"
          onSubmit={(e) => {
            handleSearch(e)
            closeSideBar()
          }}
        >
          <input type="search" placeholder="Search..." onChange={(e) => setsearchQuery(e.target.value)} />
          <button>
            <i>
              <Icon icon="fa-solid:search" />
            </i>
          </button>
        </form>

        {/* make a navigation links */}
        <NavConfig handleClick={closeSideBar} />
      </Sidebar>
    </>
  )
}