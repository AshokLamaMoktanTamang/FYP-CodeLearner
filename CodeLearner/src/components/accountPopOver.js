// dependencies imported
import React, { useState } from 'react'
import Styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

// declaring styles
const AccountPopWrapper = Styled.section`
  position: relative;

  .light{
    .account-head{
      filter: brightness(1);

      & > svg{
        color: #aab8c9;
      }
    }
    
    .shade{
      filter: brightness(0.3);
    }

    .account-box{
      background-color: var(--background-white);
      box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%), 0px 3px 14px 2px rgb(145 158 171 / 12%);

      a{
        color: var(--text-light-black);
      }

      hr {
        border-color: var(--light-border-color);
        border-style: dashed;
      }
    }

    .account-user{
      & > h2{
        color: var(--text-black);
      }

      & > p{
        color: var(--text-light-black);
      }
    }

    .logout, .mode{
      color: var(--text-light-black);
    }
  }
  
  .dark{
    .account-head{
      filter: brightness(1);

      & > svg{
        color: #ffffff;
      }
    }
    
    .shade{
      filter: brightness(0.7);
    }
    
    .account-box{
      background-color: var(--background-black);
      border: 1px solid var(--teacher-dark-border);
      
      a{
        color: var(--teacher-white);
      }

      hr {
        border-color: var(--teacher-dark-border);
      }
    }

    .account-user{
      & > h2{
        color: white;
      }

      & > p{
        color: var(--teacher-white);
      }
    }

    .logout, .mode{
      color: var(--teacher-white);
    }
  }
  
  .account-head{
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.15s ease-in-out;
    
    svg{
      font-size: 3rem;
    }
  }
  
  .transparent-background{
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: none;
  }

  .account-box{
    z-index: 11;
    border-radius: 0.3rem;
    width: 200px;
    position: absolute;
    margin-top: 0.5rem;
    right: 0;
    padding: 0.5rem;
    padding: 12px 20px 8px 20px;
    
    a{
      text-decoration: none;
      padding: 6px 10px;
      margin: 0 -10px;
      font-size: 0.875rem;
      border-radius: 6px;
      line-height: 1.5714285714285714;
      
      :hover{
        background-color: var(--hover-light-white);
      }

    }
    
    .account-user{
      line-height: 1.5714285714285714;
      font-size: 0.875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 12px;
      
      h2{
        font-size: 0.875rem;
        font-weight: 600;
      }
      
      p{
        margin: 0;
      }
    }

    hr{
      margin: 0 -20px;
      margin-bottom: 8px;
      border-width: 0;
      border-bottom-width: thin;
    }
    
    .upHr{
      margin-top: 8px
    }
    
    .logout, .mode{
      background-color: transparent;
      border: none;
      border-radius: 0.3rem;
      outline: none;
      text-align: left;
      padding: 8px 10px;
      cursor: pointer;
      margin: 0 -10px;

      :hover{
        background-color: var(--hover-light-white);
      }
    }
  }
`

export default function AccountPopOver(props) {
  const navigate = useNavigate()
  const menuOptions = props.menuOptions
  const [popOverDisplay, setpopOverDisplay] = useState('none')
  const [accountHeadShade, setaccountHeadShade] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))

  const handlePopUp = () => {
    setpopOverDisplay(popOverDisplay === `none` ? `grid` : `none`)
    setaccountHeadShade(popOverDisplay === `none` ? `shade` : ``)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/registration')
  }

  const handleChangeMode = () => {
    localStorage.setItem(
      'token',
      JSON.stringify({
        token: token.token,
        type: (token.type = token.type === 'student' ? 'teacher' : 'student'),
      }),
    )
    navigate('/app')
  }

  return (
    <AccountPopWrapper>
      <div className={props.theme}>
        <div className={`account-head ${accountHeadShade}`} onClick={handlePopUp}>
          <Icon icon="carbon:user-avatar-filled" />
        </div>

        <div className="transparent-background" style={{ display: popOverDisplay }} onClick={handlePopUp}></div>

        <div className="account-box" style={{ display: popOverDisplay }}>
          <Link to="profile" className="account-user" onClick={handlePopUp}>
            <h2>
              {props.userFName} {props.userLName}
            </h2>
            <p>{props.email}</p>
          </Link>

          <hr />

          {menuOptions.map((menu) => {
            return (
              <Link to={menu.linkTo} key={menu.label} onClick={handlePopUp}>
                {menu.label}
              </Link>
            )
          })}

          <hr className="upHr" />

          {props.showTeacherButton && (
            <button className="mode" onClick={handleChangeMode}>
              {token.type === 'student' ? 'teacher' : 'student'}
            </button>
          )}

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </AccountPopWrapper>
  )
}

AccountPopOver.defaultProps = {
  theme: 'light',
  userFName: 'Unknown',
  userLname: '',
  email: 'noemail@gmail.com',
  showTeacherButton: false,
  menuOptions: [
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
  ],
}
