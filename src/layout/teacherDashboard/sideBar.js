// importing dependencies
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing components

// styled component
const SideNav = styled.section`
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: var(--teacher-background);
  border-right: 1px solid var(--teacher-dark-border);
  color: var(--teacher-white);
  position: sticky;
  top: 64px;

  & > ul {
    list-style: none;

    & > li {
      display: block;
      width: fit-content;
      margin: 0.9rem auto;
      position: relative;

      & > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        padding: 0.7rem;
        border-radius: 0.35rem;

        :hover {
          background-color: var(--hover-light-white);
        }

        & > svg {
          font-size: 2rem;
        }
      }

      .active {
        color: var(--text-blue);
        background-color: var(--hover-light-white);
      }
    }
  }
`

const menus = [
  {
    icon: 'material-symbols:space-dashboard-sharp',
    destination: '/app/teacher',
    label: 'Dashboard',
  },
  {
    icon: 'wpf:books',
    destination: '/app/teacher/myCourse',
    label: 'My Course',
  },
  {
    icon: 'mdi:user',
    destination: '/app/teacher/profile',
    label: 'Profile',
  },
  {
    icon: 'uiw:setting',
    destination: '/app/teacher/setting',
    label: 'Setting',
  },
]

export default function SideBar(props) {
  const { pathname } = useLocation()

  return (
    <SideNav>
      <ul>
        {menus.map((menu) => {
          return (
            <li key={menu.label}>
              <Link to={menu.destination} title={menu.label} className={pathname === menu.destination ? 'active' : ''} onClick={props.handleLinkClick}>
                <Icon icon={menu.icon} />
              </Link>
            </li>
          )
        })}
      </ul>
    </SideNav>
  )
}
