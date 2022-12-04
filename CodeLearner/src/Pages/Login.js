// importing dependencies
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

// importing components and images
import Page from '../components/page'

export default function Login() {
  const [passwordType, setpasswordType] = useState('password')
  const [eyeBtnIcon, seteyeBtnIcon] = useState('ant-design:eye-invisible-filled')

  const handleDisplayPassword = () => {
    return passwordType === 'password'
      ? (setpasswordType('text'), seteyeBtnIcon('ant-design:eye-filled'))
      : (setpasswordType('password'), seteyeBtnIcon('ant-design:eye-invisible-filled'))
  }

  return (
    <Page title="Log In">
      <h2>Log In</h2>

      <form>
        <label htmlFor="userName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input type="text" placeholder="Username or Email" id="userName" />
        </label>
        <label htmlFor="password">
          <i>
            <Icon icon="bi:lock-fill" />
          </i>
          <input type={passwordType} placeholder="Password" id="password" />
          <i onClick={handleDisplayPassword}>
            <Icon icon={eyeBtnIcon} />
          </i>
        </label>
        <button>Log In</button>
      </form>

      <span>
        Not registered yet? <Link to={'/registration/signup'}>Sign Up</Link>
      </span>

      <button className="google-auth">
        <i>
          <Icon icon="akar-icons:google-fill" />
        </i>
        <span className="google-auth-text">continue with google</span>
      </button>
    </Page>
  )
}
