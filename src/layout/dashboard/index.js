// dependencies imported
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// componets imported
import NavBar from './navBar'
import SideBar from './sideBar'

// styled component
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 280px auto;
  min-height: 100vh;
  
  & > div{
    display: grid;
    grid-template-rows: 4.3rem auto;
  }
  
  @media (max-width: 800px) {
    grid-template-columns: auto;
	}
`

export default function index() {
  return (
	<Wrapper>
    <SideBar/>
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  </Wrapper>
  )
}
