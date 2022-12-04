// dependencies
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react';

// components


// styled component
const NavBox = styled.section`
  display: grid;
  grid-gap: 0.5rem;

  a{
    text-decoration: none;
    color: var(--text-black);
    line-height: 1.5714285714285714;
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: capitalize;
    color: var(--text-light-black);
    padding: 1rem 0.87rem;
    margin: 0 -0.87rem; 
    display: flex;
    align-items: center;
    background-color: transparent;
    transition: 0.2s ease-in-out;
    border-radius: 0.3rem;
    
    :hover{
      background-color: var(--hover-white);
    }
    
    i{
      display: flex;
      padding: 0 0.93rem 0 0.3rem;
      font-size: 1.375rem;
    }
  }

  .active-site{
    background-color: var(--hover-background-blue);
    font-weight: 600;
    color: var(--text-blue)
  }
`

// navigation links
const navConfig = [
  {
    title: 'Home',
    path: '/app',
    icon: <Icon icon="ant-design:home-filled" />
  },
  {
    title: 'My Course',
    path: '/app/myCourse',
    icon: <Icon icon="el:book" />
  },
  {
    title: 'Articles',
    path: '/app/article',
    icon: <Icon icon="ooui:articles-ltr" />
  },
]

export default function NavConfig(props) {
  const activeLink = useLocation().pathname;

  return (
	<NavBox>

    {
      navConfig.map((nav)=>{
        return (
          <Link to={nav.path} key={nav.title} onClick={props.handleClick} className={activeLink===nav.path ? `active-site` : ``}>
            <i>
              {nav.icon}
            </i>
            {nav.title}
          </Link>
        )
      })
    }
  </NavBox>
  )
}
