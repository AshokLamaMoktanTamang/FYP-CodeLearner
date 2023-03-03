// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import OtpInput from 'react18-input-otp'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// importing components
import Page from '../../components/page'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { seedAdmin } from '../../slice/userSlice'

// styled components
const Wrapper = styled.section`
  & > form {
    background-color: #fefefe;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #888;
    width: 90%;
    padding: 1.7rem;
    border-radius: 0.25rem;
    max-width: 500px;

    & > label {
      & > input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: block;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
    }

    & > button {
      border-radius: 0.25rem;
      background-color: #04aa6d;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
    }

    & > h1 {
      font-size: 1.5rem;
      color: var(--text-black);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    & > p {
      font-size: 1rem;
      color: var(--text-light-black);
      line-height: 1.5;
    }

    & > div {
      display: flex;
      justify-content: center;
      margin: 1.7rem 0;
    }
  }
`

export default function Login() {
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (token) {
      navigate('/app/admin')
    }
  }, [token, navigate])

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [otp, setOtp] = useState('')

  const [initialLoged, setinitialLoged] = useState(false)

  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  // redux
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      if (process.env.REACT_APP_SEED_ADMIN === 'false') {
        return
      }

      dispatch(seedAdmin())
    }
  }, [dispatch])

  // controllers
  const HandleLogin = async (e) => {
    e.preventDefault()
    setshowLoadng(true)
    setstatus('error')

    if (email.trim().length < 3 || password.trim().length < 8) {
      setmessage('Please enter a valid credentials')
      setshowLoadng(false)
      setopen(true)
      return
    }

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/v1/admin`,
      headers: {
        'content-type': 'application/Json',
      },
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        setinitialLoged(true)
        setshowLoadng(false)
      })
      .catch((error) => {
        setmessage(error.response.data.msg)
        setstatus('error')
        setopen(true)
        setshowLoadng(false)
      })
  }

  const HandleOtp = async (e) => {
    e.preventDefault()
    setshowLoadng(true)
    setstatus('error')
    if (otp.trim().length < 6) {
      setmessage('Please enter a valid OTP')
      setshowLoadng(false)
      setopen(true)
      return
    }

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/v1/otp`,
      headers: {
        'content-type': 'application/Json',
      },
      data: {
        email,
        otp,
      },
    })
      .then((response) => {
        localStorage.setItem('adminToken', response.data.token)
        navigate('/app/admin')
      })
      .catch((error) => {
        setmessage(error.response.data.msg)
        setstatus('error')
        setopen(true)
        setshowLoadng(false)
      })
  }

  return (
    <Page title="Admin Login">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
      {showLoadng && <Loading />}
      <Wrapper>
        {initialLoged ? (
          <form onSubmit={HandleOtp}>
            <h1>Please enter the OTP sent to your mail.</h1>
            <p>The OTP can only be used once and the otp will be expired after 1 hour.</p>
            <div>
              <OtpInput
                value={otp}
                onChange={(pin) => setOtp(pin)}
                placeholder="######"
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={{
                  padding: '1rem .3rem',
                  fontSize: '1.1rem',
                  width: '3rem',
                  border: '2px solid black',
                  borderRadius: '.51rem',
                  fontWeight: 'bold',
                }}
                focusStyle={{
                  border: '2px solid var(--text-blue)',
                }}
              />
            </div>
            <button>Submit</button>
          </form>
        ) : (
          <form onSubmit={HandleLogin}>
            <label>
              <b>Email</b>
              <input type="email" placeholder="Enter Email" onChange={(e) => setemail(e.target.value)} required />
            </label>
            <label>
              <b>Password</b>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </label>

            <button>Login</button>
          </form>
        )}
      </Wrapper>
    </Page>
  )
}
