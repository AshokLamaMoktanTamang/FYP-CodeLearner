// importing dependencies
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// importing components and images
import Page from '../components/page'
import AlertMessage from '../components/alertMessage'

export default function Login() {
  const [passwordType, setpasswordType] = useState('password')
  const [eyeBtnIcon, seteyeBtnIcon] = useState('ant-design:eye-invisible-filled')
  const navigate = useNavigate()

  const handleDisplayPassword = () => {
    return passwordType === 'password'
      ? (setpasswordType('text'), seteyeBtnIcon('ant-design:eye-filled'))
      : (setpasswordType('password'), seteyeBtnIcon('ant-design:eye-invisible-filled'))
  }

  // initializing the states for input fields and alerts
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/v1`,
      headers: {
        'content-type': 'application/Json',
      },
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        localStorage.setItem(
          'token',
          JSON.stringify({
            token: response.data.token,
            type: 'student',
          }),
        )
        navigate('/app')
      })
      .catch((error) => {
        setmessage(error.response.data.msg)
        setstatus('error')
        setopen(true)
      })
  }

  return (
    <Page title="Log In">
      <h2>Log In</h2>
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />

      <form onSubmit={handleLogin}>
        <label htmlFor="userName">
          <i>
            <Icon icon="carbon:user-filled" />
          </i>
          <input
            type="email"
            placeholder="Username or Email"
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
