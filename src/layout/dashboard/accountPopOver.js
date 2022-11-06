// dependencies imported
import React, {useState} from 'react'
import Styled from "styled-components"
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

// declaring styles
const AccountPopWrapper= Styled.section`
  position: relative;
  
  .account-head{
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.15s ease-in-out;
    filter: brightness(1);
    
    svg{
      font-size: 3rem;
      color: #aab8c9;
    }
  }
  
  .shade{
    filter: brightness(0.3);
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
    background-color: white;
    border-radius: 0.3rem;
    box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%), 0px 3px 14px 2px rgb(145 158 171 / 12%);
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
      color: var(--text-light-black);
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
        color: black;
        font-size: 0.875rem;
        font-weight: 600;
      }
      
      p{
        margin: 0;
        color: var(--text-light-black);
      }
    }

    hr{
      margin: 0 -20px;
      margin-bottom: 8px;
      border-width: 0;
      border-color: var(--light-border-color);
      border-bottom-width: thin;
      border-style: dashed;
    }

    .upHr{
      margin-top: 8px
    }

    .logout{
      color: var(--text-light-black);
      background-color: transparent;
      border: none;
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

// initializing the menus
const menuOptions = [
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

export default function AccountPopOver() {
  const [popOverDisplay, setpopOverDisplay] = useState('none')
  const [accountHeadShade, setaccountHeadShade] = useState('')

	const handlePopUp = ()=>{
		setpopOverDisplay(popOverDisplay===`none` ? `grid` : `none`)
    setaccountHeadShade(popOverDisplay===`none` ? `shade` : ``)
	}

  return (
    <AccountPopWrapper>
      <div className={`account-head ${accountHeadShade}`} onClick={handlePopUp}>
        <Icon icon="carbon:user-avatar-filled" />
      </div>

      <div className='transparent-background' style={{display: popOverDisplay}} onClick={handlePopUp}></div>

      <div className='account-box' style={{display: popOverDisplay}}>
        <Link to='profile' className='account-user' onClick={handlePopUp}>
          <h2>Username</h2>
          <p>username@gmail.com</p>
        </Link>

        <hr/>

        {
          menuOptions.map((menu)=>{
            return (
              <Link to={menu.linkTo} key={menu.label} onClick={handlePopUp}>
                  {menu.label}
              </Link>
            )
          })
        }

        <hr className='upHr'/>
        
        <button className='logout' onClick={handlePopUp}>Logout</button >
      </div>
    </AccountPopWrapper>
  )
}
