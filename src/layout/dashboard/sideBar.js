// dependencies imported
import React, {useState} from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react';

// components imported
import Logo from "../../Images/favicon.png"
import NavConfig from './navConfig'

// styled component
const Sidebar = styled.section`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: var(--text-black);
  border-right: 1px dashed var(--light-border-color);
  background-color: var(--background-white);
  padding: 2rem 1.7rem;
  transition: 0.15s ease-in-out;
  
  .logo-container{
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-bottom: 2.7rem
  }

  .logo{
    width: 2.3rem;
    height: 2.3rem;
  }

  .logo-text{
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.125rem;
    font-family: Public Sans,sans-serif;
    padding: 0 0.5rem;
    letter-spacing: 1px;
  }
  
  @media (max-width: 800px) {
    visibility: hidden;
    left: -280px;
    position: absolute;
    max-width: 300px;
    width: 100%;
    height: 100vh
	}
`

  const HamMenu = styled.button`
	padding: 0.3rem;
	height: 2.1rem;
	width: 2.1rem;
	font-size: 1.315rem;
	color: var(--hover-purple);
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
  const [hamDisplay, sethamDisplay] = useState(null);
  const [hamBackground, sethamBackground] = useState('none')

  const handleSideBar = ()=>{
    sethamDisplay(hamDisplay===null ? {visibility: `initial`, left: `0`, zIndex: `12`} : null)
    sethamBackground(hamDisplay===null ? `` : `none`)
  }

  const closeSideBar = ()=>{
    sethamDisplay(null)
    sethamBackground('none')
  }

  return (
    <>
      {/* making the ham menu for responsiveness */}
      <HamMenu onClick={handleSideBar}>
        <Icon icon="fa6-solid:bars" />
      </HamMenu>

      <HamBackground onClick={handleSideBar} style={{display: hamBackground}}></HamBackground>      

      <Sidebar style={hamDisplay} >
        {/* make a logo */}
        <div className='logo-container'>
          <img src={Logo} alt="Code Learner" className='logo' />
          <span className='logo-text'>CodeLearner</span>
        </div>


        {/* make a search bar */}


        {/* make a navigation links */}
        <NavConfig handleClick={closeSideBar} />
      </Sidebar>
    </>
  )
}
