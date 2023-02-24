// importinig dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'

// importing components
import Page from '../../components/page'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { fetchUser, updateUserPassword, updateUserProfile } from '../../slice/userSlice'

// styled components
const Wrapper = styled.section`
  max-width: 900px;

  & > section {
    & > h1 {
      font-size: 1.1rem;
      line-height: 1.5;ss
    }

    & > button {
      padding: 0.5rem;
      border: none;
      font-weight: bold;
      outline: none;
      border-radius: 0.15rem;
      background-color: var(--text-blue);
      color: white;
      display: block;
      float: right;
      cursor: pointer;

      :hover {
        filter: brightness(0.7);
      }
    }

    & > div {
      display: block;
      background-color: var(--teacher-content-background);
      border-radius: 0.35rem;
      overflow: hidden;
      margin-top: 1rem;
      backdrop-filter: blur(10px);

      & > section {
        display: block;
        position: relative;
        padding: 0.7rem;
        padding-right: 1.7rem;
        cursor: pointer;

        :hover{
          background-color: var(--teacher-content-background);
        }

        & > h2 {
          font-size: 1rem;
          line-height: 1.5;
        }

        & > p {
          font-size: 0.875rem;
          color: gray;
          line-height: 1.5;
        }

        & > div {
          position: absolute;
          right: 0.3rem;
          top: 50%;
          transform: translateY(-50%);

          & > svg {
            font-size: 1.5rem;
            color: gray;
          }
        }
      }

      & > form, & > div{
        display: grid;
        grid-gap: 1.9rem;
        padding: 0.7rem;
        border-top: 1px dashed var(--teacher-hover-white);
        padding-top: 1.5rem;

        .lkpc{
          width: 100% !important;
        }

        & > label{
          display: block;
          width: 100%;
          max-width: 400px;
          margin: auto;

          :first-child{
            width: fit-content;

            & > section{
              width: 7rem;
              height: 7rem;
              border-radius: 50%;
              background-color: var(--teacher-hover-white);
              overflow: hidden;
              cursor: pointer;

              :hover{
                filter: brightness(.7);
              }

              & > img{
                height: 100%;
                width: 100%;
                object-fit: cover;
              }

              & > svg{
                font-size: 7rem;
                color: #fff;
              }
            }
          }

          & > span{
            display: block;
            font-size: 0.875rem;
            line-height: 1.5;
            font-weight: bold;
          }

          & > input{
            width: 100%;
            padding: 0.5rem 0;
            background-color: transparent;
            border: none;
            outline: none;
            border-bottom: 0.07rem solid var(--teacher-hover-white);
            color: var(--teacher-white);
            
            :focus{
              border-bottom: 0.07rem solid var(--teacher-white);
            }
          }
        }

        & > button{
          width: fit-content;
          padding: 0.7rem;
          border: none;
          outline: none;
          background-color: var(--text-blue);
          color: #fff;
          border-radius: 0.15rem;
          cursor: pointer;
          margin: auto;

          :hover{
            filter: brightness(.7);
          }
        }

        & > section{
          display: grid;
          grid-template-columns: max-content max-content;
          grid-gap: 1rem;
          margin: auto;

          & > button{
            padding: 0.7rem;
            border: none;
            outline: none;
            border-radius: 0.15rem;
            cursor: pointer;
            color: #fff;
            background-color: var(--pdf-red);

            :first-child{
              background-color: var(--text-blue);
            }

            :hover{
              filter: brightness(.7);
            }
          }
        }
      }
    }
  }

  .Light {
    color: var(--text-black);

    & > div{
      background-color: var(--footer-background);
      border: 1px dashed var(--light-border-color);
      box-shadow: 0px 1px 1px -7px rgb(145 158 171 / 20%), 0px 4px 6px -4px rgb(145 158 171 / 14%), -3px 0px 11px -1px rgb(145 158 171 / 12%);

      & > section{
        :hover{
          background-color: var(--light-border-color);
        }
      }

      & > div{
        border-color: var(--light-border-color);

        & > label{
          :first-child{
            & > section{
              background-color: var(--background-white);
              border: 1px dashed var(--light-border-color);

              & > svg{
                color: #aab8c9;
              }
            }
          }

          & > input{
            border-color: var(--dark-border-color);
            color: var(--text-black);

            :focus{
              border-color: var(--background-black);
            }
          }
        }
      }
    }
  }
`

export default function Setting({ theme }) {
  const navigate = useNavigate()

  // logout functionality
  const HandleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/registration')
  }

  // redux
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (user) {
        setfirstName(user.data.firstName)
        setlastName(user.data.lastName)
        setprofilePic(user.data.profilePic)
      }
    }
  }, [user])

  // controllers
  const HandleUpdateProfile = (e) => {
    e.preventDefault()

    setshowLoading(true)
    setstatus('error')
    if (
      firstName === null ||
      lastName === null ||
      currentPassword === null ||
      firstName.trim().length < 1 ||
      lastName.trim().length < 1 ||
      currentPassword.trim().length < 8
    ) {
      setmessage('Please provide a valid data!')
      setopen(true)
      setshowLoading(false)
      return
    }

    if (profileImg && profileImg.size > 5 * 1024 * 1024) {
      setmessage('Profile image cannot be greater then 5MB!')
      setopen(true)
      setshowLoading(false)
      return
    }

    const userData = new FormData()
    userData.append('firstName', firstName)
    userData.append('lastName', lastName)
    profileImg && userData.append('profile', profileImg)
    userData.append('currentPassword', currentPassword)
    dispatch(updateUserProfile(userData))
      .unwrap()
      .then(() => {
        setstatus('sucess')
        setmessage('Profile uploaded sucessfully.')
        setopen(true)
        dispatch(fetchUser())
        setcurrentPassword('')
        setshowLoading(false)
      })
      .catch((err) => {
        setmessage('Failed to update profile.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })

    setshowLoading(false)
  }

  const HandleUpdatePassword = (e) => {
    e.preventDefault()

    setshowLoading(true)
    setstatus('error')
    if (
      password === null ||
      confirmPassword === null ||
      currentPassword2 === null ||
      password.trim().length < 8 ||
      confirmPassword.trim().length < 8 ||
      currentPassword2.trim().length < 8
    ) {
      setmessage('Password must be 8 character long!')
      setopen(true)
      setshowLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setmessage('Please verify your password!')
      setopen(true)
      setshowLoading(false)
      return
    }

    dispatch(updateUserPassword({ currentPassword: currentPassword2, password }))
      .unwrap()
      .then(() => {
        setstatus('sucess')
        setmessage('Password updated sucessfully.')
        setopen(true)
        setcurrentPassword2('')
        setpassword('')
        setconfirmPassword('')
        setshowLoading(false)
      })
      .catch((err) => {
        setmessage('Failed to update password.')
        if (err.status) {
          setmessage('Poor Internet or Too Many Request')
        }
        setopen(true)
        setshowLoading(false)
      })

    setshowLoading(false)
  }

  // input states
  const [profileImg, setprofileImg] = useState(null)
  const [profilePic, setprofilePic] = useState(null)
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [currentPassword, setcurrentPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState(null)
  const [password, setpassword] = useState(null)
  const [currentPassword2, setcurrentPassword2] = useState('')

  // drop down states
  const [profileDropdown, setprofileDropdown] = useState(false)
  const [accountDropdown, setaccountDropdown] = useState(false)

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  return (
    <Page title="Setting">
      <AlertMessage display={open} setdisplay={setopen} message={message} status={status} theme="darkAlert" />
      {showLoading && <Loading />}
      <Wrapper>
        <section className={theme}>
          <button onClick={HandleLogout}>Logout</button>
          <h1>Setting</h1>

          <div>
            <section onClick={() => (profileDropdown ? setprofileDropdown(false) : setprofileDropdown(true))}>
              <h2>Edit Profile</h2>
              <p>You can update your profile detail but the updated detail must be valid and genuine.</p>

              <div>
                {profileDropdown ? (
                  <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
                ) : (
                  <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
                )}
              </div>
            </section>
            {profileDropdown && (
              <form onSubmit={HandleUpdateProfile} encType="multipart/form-data">
                <label>
                  <section>
                    {profileImg ? (
                      <img src={window.URL.createObjectURL(profileImg)} alt="Preview" />
                    ) : profilePic ? (
                      <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${profilePic}`} alt="Profile" />
                    ) : (
                      <Icon icon="carbon:user-avatar-filled" />
                    )}
                  </section>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    onChange={(e) => {
                      if (e.target.files[0] && e.target.files[0].type.split('/')[0] !== 'image') {
                        setmessage('Only image file accepted!')
                        setstatus('error')
                        setopen(true)
                        return
                      }
                      setprofileImg(e.target.files[0])
                    }}
                    hidden
                  />
                </label>
                <label>
                  <span>First Name</span>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Last Name</span>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Current Password</span>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setcurrentPassword(e.target.value)}
                  />
                </label>
                <button>Update</button>
              </form>
            )}
          </div>

          <div>
            <section onClick={() => (accountDropdown ? setaccountDropdown(false) : setaccountDropdown(true))}>
              <h2>Account Settings</h2>
              <p>In account setting user can change their account preferences.</p>
              <div>
                {accountDropdown ? (
                  <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
                ) : (
                  <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
                )}
              </div>
            </section>

            {accountDropdown && (
              <div>
                <label className="lkpc">
                  <span>New Password</span>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </label>
                <label>
                  <span>Current Password</span>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword2}
                    onChange={(e) => setcurrentPassword2(e.target.value)}
                  />
                </label>

                <section>
                  <button onClick={HandleUpdatePassword}>Change Password</button>
                  <button>Delete Account</button>
                </section>
              </div>
            )}
          </div>
        </section>
      </Wrapper>
    </Page>
  )
}
