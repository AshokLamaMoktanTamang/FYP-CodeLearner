// iimporting dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing components
import Logo from '../../components/logo'
import logoIcon from '../../Images/teacherFav.png'
import AccountPopOver from '../../components/accountPopOver'
import { useSelector } from 'react-redux'

// styled components
const Nav = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--background-black);
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  border-bottom: 1px solid var(--teacher-dark-border);

  & > button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: none;

    & > svg {
      color: var(--background-white);
      font-size: 1.315rem;
    }
  }

  @media (max-width: 600px) {
    & > button {
      display: flex;
    }
  }
`

const menu = [
  {
    label: 'Dashboard',
    linkTo: '/app/teacher',
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

export default function NavBar(props) {
  const user = useSelector((state) => state.user.user)
  console.log(user)

  return (
    <Nav>
      <button onClick={props.handleHamClick}>
        <Icon icon="fa6-solid:bars" />
      </button>

      <Logo logoIcon={logoIcon} location="/app/teacher" target="Studio" textTheme="light" />

      {user && (
        <AccountPopOver
          theme="dark"
          menuOptions={menu}
          userFName={user.data.firstName}
          userLName={user.data.lastName}
          email={user.data.email}
          showTeacherButton={user.data.isTeacher}
        />
      )}
    </Nav>
  )
}
