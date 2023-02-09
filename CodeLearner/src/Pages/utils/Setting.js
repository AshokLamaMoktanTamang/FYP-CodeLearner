// importinig dependencies
import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// importing components
import Page from '../../components/page'
import { useNavigate } from 'react-router-dom'

// importing testing component
// import TestImage from '../../Images/registration.jpg'

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

      & > div{
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

  const HandleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/registration')
  }

  // drop down states
  const [profileDropdown, setprofileDropdown] = useState(false)
  const [accountDropdown, setaccountDropdown] = useState(false)

  return (
    <Page title="Setting">
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
              <div>
                <label>
                  <section>
                    {/* <img src={TestImage} alt="Profile Image" /> */}
                    <Icon icon="carbon:user-avatar-filled" />
                  </section>
                  <input type="file" hidden />
                </label>
                <label>
                  <span>First Name</span>
                  <input type="text" placeholder="First Name" />
                </label>
                <label>
                  <span>Last Name</span>
                  <input type="text" placeholder="Last Name" />
                </label>
                <label>
                  <span>Current Password</span>
                  <input type="password" placeholder="Current Password" />
                </label>
                <button>Update</button>
              </div>
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
                  <input type="password" placeholder="New Password" />
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input type="password" placeholder="Confirm Password" />
                </label>
                <label>
                  <span>Current Password</span>
                  <input type="password" placeholder="Current Password" />
                </label>

                <section>
                  <button>Change Password</button>
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
