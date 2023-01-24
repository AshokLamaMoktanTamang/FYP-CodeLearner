// importing dependencies
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
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
    padding: 0 1rem;
    border-bottom: 1px dashed var(--light-border-color);
    justify-content: space-between;

    & > ul {
      display: flex;
      list-style: none;

      & > li {
        & > a,
        .active {
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--text-light-black);
          padding: 0.5rem 1rem;
          margin-left: 0.35rem;
          text-transform: capitalize;
        }

        & > a:hover,
        .active {
          color: var(--text-blue);
        }
      }
    }
  }

  & > div {
    padding: 1rem;
  }

  @media (max-width: 560px) {
    grid-template-rows: 4.1rem auto 500px;
  }

  @media (max-width: 650px) {
    & > header {
      justify-content: center;
      padding: 0;

      & > ul {
        display: none;
      }
    }
  }
`

const menus = [
  {
    label: 'about',
    link: '/about',
  },
  {
    label: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    label: 'contact',
    link: '/contact',
  },
  {
    label: 'FAQ',
    link: '/faq',
  },
]

export default function Extra() {
  const { pathname } = useLocation()

  return (
    <Wrapper>
      <header>
        <Logo location="/registration" />
        <ul>
          {menus.map((menu) => {
            return (
              <li key={menu.label}>
                <Link to={menu.link} className={menu.link === pathname ? 'active' : ''}>
                  {menu.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </header>
      <Outlet></Outlet>
      <Footer />
    </Wrapper>
  )
}
