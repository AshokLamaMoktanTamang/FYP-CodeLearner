// importing dependencies
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/footer'
import Logo from '../components/logo'

// styled components
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 4.1rem auto 272px;
  
  & > header {
    background-color: var(--background-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px dashed var(--light-border-color);
}

& > div {
	padding: 1rem;
}

@media (max-width: 560px) {
	  grid-template-rows: 4.1rem auto 500px;
  }
`

export default function Extra() {
  return (
    <Wrapper>
      <header>
        <Logo location='/registration' />
      </header>
      <Outlet></Outlet>
      <Footer />
    </Wrapper>
  )
}
