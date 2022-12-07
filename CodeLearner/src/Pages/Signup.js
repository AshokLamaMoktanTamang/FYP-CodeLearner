// importing dependencies
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'

// importing components and images
import Page from '../components/page'
import { Link } from 'react-router-dom'
import AlertMessage from '../components/alertMessage'

export default function Signup() {
  const [passwordType, setpasswordType] = useState('password')
  const [eyeBtnIcon, seteyeBtnIcon] = useState('ant-design:eye-invisible-filled')

  const handleDisplayPassword = () => {
    return passwordType === 'password'
      ? (setpasswordType('text'), seteyeBtnIcon('ant-design:eye-filled'))
      : (setpasswordType('password'), seteyeBtnIcon('ant-design:eye-invisible-filled'))
  }

  // initializing states for data inputs
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  // initializing state for the alertMessage
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword || password === '') {
      setmessage('Password confirmation doesnot match')
      setstatus('error')
      return setopen(true)
    }

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/v1`,
      headers: {
        'content-type': 'application/Json',
      },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    })
      .then((response) => {
        setmessage(response.data.msg)
        setstatus('sucess')
        setopen(true)

        setconfirmPassword('')
        setpassword('')
        setfirstName('')
        setlastName('')
        setemail('')
      })
      .catch((error) => {
        setmessage(error.response.data.msg)
        setstatus('error')
        setopen(true)
      })
  }

  return (
    <Page title="Sign Up">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />

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
            value={firstName}
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
            value={lastName}
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
            value={email}
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
            value={password}
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
            value={confirmPassword}
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
