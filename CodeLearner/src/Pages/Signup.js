// importing dependencies
import React, { useState } from 'react'
import { Icon } from '@iconify/react'

// importing components and images
import Page from '../components/page'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [passwordType, setpasswordType] = useState('password')
  const [eyeBtnIcon, seteyeBtnIcon] = useState('ant-design:eye-invisible-filled')

  const handleDisplayPassword = () => {
    return passwordType === 'password'
      ? (setpasswordType('text'), seteyeBtnIcon('ant-design:eye-filled'))
      : (setpasswordType('password'), seteyeBtnIcon('ant-design:eye-invisible-filled'))
  }

  return (
    <Page title="Sign Up">
      <h2>Sign Up</h2>

      <form>
        <label htmlFor="fName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input type="text" placeholder="First Name" id="fName" />
        </label>
        <label htmlFor="lName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input type="text" placeholder="Last Name" id="LName" />
        </label>
        <label htmlFor="Email">
          <i>
          <Icon icon="ic:baseline-email" />
          </i>
          <input type="email" placeholder="Email" id="userName" />
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
        <label htmlFor="Cpassword">
          <i>
            <Icon icon="bi:lock-fill" />
          </i>
          <input type={passwordType} placeholder="Confirm Password" id="Cpassword" />
        </label>
        <button>Sign Up</button>
      </form>

      <span>
        Already registered? <Link to={'/registration'}>Log In</Link>
      </span>
    </Page>
  )
}
