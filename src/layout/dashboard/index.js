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
  
  .content-container{
    display: grid;
    grid-template-rows: 4.3rem auto;

    & > div{
      padding: 1rem;
      margin-top: -3.5rem;
    }
  }
  
  @media (max-width: 800px) {
    grid-template-columns: auto;

    .content-container{
      & > div{
        margin-top: 0;
      }
    }
	}
`

export default function index() {
  return (
	<Wrapper>
    <SideBar/>
    <div className='content-container'>
      <NavBar/>
      <Outlet/>
    </div>
  </Wrapper>
  )
}
