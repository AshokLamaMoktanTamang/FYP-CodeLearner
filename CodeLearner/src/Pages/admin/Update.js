// importing dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

// importing components
import Page from '../../components/page'
import { updatePassword } from '../../slice/adminSlice'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { useNavigate } from 'react-router-dom'

// styled components
const Wrapper = styled.section`
  padding: 1rem;

  & > form {
    background-color: #fefefe;
    border: 1px solid #888;
    width: 90%;
    padding: 1.7rem;
    border-radius: 0.25rem;
    max-width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & > label {
      margin-bottom: 1.7rem;
      display: block;

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

export default function Update() {
  const [password, setpassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  // initializing the states for input fields,loading and alerts
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [showLoadng, setshowLoadng] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setshowLoadng(true)
    if (newPassword !== confirmPassword) {
      setmessage('Please confirm your message')
      setshowLoadng(false)
      setopen(true)
      return
    }

    if (password.trim().length < 8 && newPassword.trim().length < 8) {
      setmessage('Password must be 8 characters long')
      setshowLoadng(false)
      setopen(true)
      return
    }

    dispatch(updatePassword({ currentPassword: password, password: newPassword }))
      .unwrap()
      .then(() => {
        navigate('/app/admin')
      })
      .catch(() => {
        setmessage('Failed to update password')
        setshowLoadng(false)
        setopen(true)
        return
      })
  }

  return (
    <Page title="Update">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={'error'} />
      {showLoadng && <Loading />}

      <Wrapper>
        <form onSubmit={handleSubmit}>
          <label>
            Password
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </label>
          <label>
            Re-type password
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </label>
          <label>
            Current password
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>
          <button type="submit">Reset password</button>
        </form>
      </Wrapper>
    </Page>
  )
}
