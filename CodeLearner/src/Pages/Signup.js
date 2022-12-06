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

  // initializing states for data inputs
  const [firstName, setfirstName] = useState(null)
  const [lastName, setlastName] = useState(null)
  const [email, setemail] = useState(null)
  const [password, setpassword] = useState(null)
  const [confirmPassword, setconfirmPassword] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()

    const signUp = await fetch
  }

  return (
    <Page title="Sign Up">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <label htmlFor="fName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input
            type="text"
            placeholder="First Name"
            id="fName"
            onChange={(e) => {
              setfirstName(e.target.value)
            }}
          />
        </label>
        <label htmlFor="lName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input
            type="text"
            placeholder="Last Name"
            id="LName"
            onChange={(e) => {
              setlastName(e.target.value)
            }}
          />
        </label>
        <label htmlFor="Email">
          <i>
            <Icon icon="ic:baseline-email" />
          </i>
          <input
            type="email"
            placeholder="Email"
            id="userName"
            onChange={(e) => {
              setemail(e.target.value)
            }}
          />
        </label>
        <label htmlFor="password">
          <i>
            <Icon icon="bi:lock-fill" />
          </i>
          <input
            type={passwordType}
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setpassword(e.target.value)
            }}
          />
          <i onClick={handleDisplayPassword}>
            <Icon icon={eyeBtnIcon} />
          </i>
        </label>
        <label htmlFor="Cpassword">
          <i>
            <Icon icon="bi:lock-fill" />
          </i>
          <input
            type={passwordType}
            placeholder="Confirm Password"
            id="Cpassword"
            onChange={(e) => {
              setconfirmPassword(e.target.value)
            }}
          />
        </label>
        <button>Sign Up</button>
      </form>

      <span>
        Already registered? <Link to={'/registration'}>Log In</Link>
      </span>
    </Page>
  )
}
