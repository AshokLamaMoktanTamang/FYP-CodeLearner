// dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

// components and theme
import AccountPopOver from '../../components/accountPopOver'
import Logo from '../../components/logo'

// importing the logo image
import LogoIcon from '../../Images/favicon.png'

// styled components
const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1rem;

  .hw48 {
    width: 48px;
    height: 48px;
  }

  & > span {
    display: none;
  }

  @media (max-width: 800px) {
    background-color: var(--transparent-background);
    justify-content: space-between;
    border-bottom: 1px solid var(--light-border-color);

    & > span {
      display: block;
    }

    @media (max-width: 305px) {
      & > span {
        display: none;
      }
    }
  }
`

const menu = [
  {
    label: 'Home',
    linkTo: '/app',
  },
  {
    label: 'Profile',
    linkTo: 'profile',
  },
  {
    label: 'Setting',
    linkTo: 'setting',
  },
]

export default function NavBar() {
  const user = useSelector((state) => state.user.user)

  return (
    <Header>
      <div className="hw48"></div>

      {/* making the logo of the company */}
      <span>
        <Logo location="/app" target="Learner" logoIcon={LogoIcon} />
      </span>

      {/* making the account popover */}
      {user && (
        <AccountPopOver
          userFName={user.data.firstName}
          userLName={user.data.lastName}
          email={user.data.email}
          theme="light"
          menuOptions={menu}
          showTeacherButton={user.data.isTeacher}
        />
      )}
    </Header>
  )
}
