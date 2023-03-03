// importing dependencies
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// styled components
const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--teacher-background);
  color: var(--teacher-white);

  & > p {
    font-weight: bold;
    font-size: 1.5rem;
  }

  & > ul {
    display: flex;
    align-items: center;
    list-style: none;

    & > li {
      & > a {
        font-size: 1rem;
        text-decoration: none;
        color: var(--teacher-white);
        padding: 1rem;

        :hover {
          text-decoration: underline;
          text-underline-offset: 8px;
          text-decoration-color: var(--text-blue);
          text-decoration-thickness: 3px;
        }
      }
    }
  }

  .active-site {
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: var(--text-blue);
    text-decoration-thickness: 3px;
  }

  & > button {
    background-color: var(--pdf-red);
    color: white;
    padding: 0.7rem;
    font-weight: bold;
    border-radius: 0.25rem;
    min-width: 100px;
    cursor: pointer;

    :hover {
      filter: brightness(0.9);
    }
  }
`

export default function NavBar() {
  const activeLink = useLocation().pathname
  const navigate = useNavigate()

  const HandleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/app/admin/login')
  }

  return (
    <Navbar>
      <p>Admin Panel</p>

      <ul>
        <li>
          <Link to={'/app/admin'} className={activeLink === '/app/admin' ? `active-site` : ``}>
            Home
          </Link>
        </li>
        <li>
          <Link to={'/app/admin/teacher'} className={activeLink === '/app/admin/teacher' ? `active-site` : ``}>
            Teacher
          </Link>
        </li>
        <li>
          <Link to={'/app/admin/course'} className={activeLink === '/app/admin/course' ? `active-site` : ``}>
            Course
          </Link>
        </li>
        <li>
          <Link to={'/app/admin/interview'} className={activeLink === '/app/admin/interview' ? `active-site` : ``}>
            Interview
          </Link>
        </li>
      </ul>

      <button onClick={HandleLogout}>Logout</button>
    </Navbar>
  )
}
