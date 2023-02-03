// importing dependencies
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'

// importing components
import Page from '../../components/page'
import AlertMessage from '../../components/alertMessage'
import Loading from '../../components/loading'
import { Link, useNavigate } from 'react-router-dom'
import { addTeacherInfo, fetchTeacherInfo } from '../../slice/teacherSlice'

// styled component
const Wrapper = styled.section`
  & > h1 {
    display: block;
    font-size: 1.3rem;
    color: var(--text-black);
    position: relative;
    width: fit-content;

    ::before {
      position: absolute;
      content: '';
      width: 40%;
      height: 5px;
      border-radius: 10px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
      transition: 0.19s ease-in-out;
    }
  }
  & > form {
    display: block;

    .ifcpph {
      position: relative;

      & > input {
        outline: none;
        padding-right: 30px;
      }

      & > svg {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(50%);
        cursor: pointer;
      }
    }

    & > label {
      display: block;
      margin-top: 1.5rem;
      width: 100%;
      max-width: 500px;
      cursor: pointer;

      & > span {
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--text-black);
        line-height: 1.7;
      }

      & > input,
      textarea {
        display: block;
        resize: none;
        width: 100%;
        font-family: inherit;
        font-size: 0.9rem;
        padding: 0.7rem 0.35rem;
        border-radius: 0.15rem;
        border: 0.1rem solid var(--dark-border-color);
      }

      textarea{
        line-height: 1.7;
        padding: 0.5rem;
      }
    }

    .fileLabel {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      border: 2px solid var(--dark-border-color);
      border-radius: 0.25rem;
      width: fit-content;

      & > div {
        display: flex;
        align-items: center;
        font-size: 0.835rem;
        color: var(--text-black);
        font-weight: bold;

        & svg {
          font-size: 3.5rem;
          color: var(--pdf-red);
          margin-right: 0.35rem;
        }
      }
    }

    .upload {
      border-style: dashed;
      padding: 1.5rem;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      width: 100%;

      & > section {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--dark-border-color);

        & > svg {
          font-size: 3rem;
          margin-bottom: 0.9rem;
        }
      }
    }

    & > section {
      max-width: 500px;
      width: 100%;
      display: block;
      margin-bottom: 2.5rem;
      margin-top: 1.5rem;

      & > span {
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--text-black);
        line-height: 1.7;
      }

      & > label {
        border: 0.1rem solid var(--dark-border-color);
        width: 100%;
        padding: 0.7rem 1rem;
        margin-bottom: 1rem;
        border-radius: 0.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;

        & > span {
          color: var(--text-light-black);
          font-size: 0.9rem;
          font-weight: bold;
        }

        & > input {
          margin-right: 1rem;
          appearance: none;
          border: 0.11rem solid var(--background-black);
          border-radius: 50%;
          height: 1.1rem;
          width: 1.1rem;
        }

        & > input:checked {
          background-color: var(--background-black);
          position: relative;
        }

        & > input:checked::before {
          position: absolute;
          content: '';
          width: 50%;
          height: 50%;
          border-radius: 50%;
          border: 0.15rem solid white;
          background-color: var(--background-black);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    & > button {
      display: block;
      margin-top: 1.5rem;
      padding: 0.7rem;
      font-weight: bold;
      background-color: var(--text-blue);
      color: white;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;

      :hover {
        background-color: var(--hover-404-blue);
      }
    }
  }

  .lightColor {
    color: var(--text-light-black) !important;
  }

  .terms {
    display: flex;
    align-items: center;

    & > input {
      width: fit-content;
      margin: 0;
      margin-right: 0.5rem;
    }

    & > p {
      font-size: 0.875rem;
      color: var(--text-black);
      line-height: 1.5;

      & > a {
        color: var(--hover-404-blue);
        font-weight: bold;
        text-decoration: none;

        :hover {
          text-decoration: underline;
        }
      }
    }
  }
`

export default function TeachonCodeLearner() {
  const [CV, setCV] = useState(null)
  const [profession, setprofession] = useState(null)
  const [aboutSelf, setaboutSelf] = useState(null)
  const [currentPassword, setcurrentPassword] = useState(null)
  const [teachingType, setTeachingType] = useState('informal')
  const [passwordType, setpasswordType] = useState('password')
  const [acceptTerms, setacceptTerms] = useState(false)

  const handleTeachingType = (e) => {
    setTeachingType(e.target.value)
  }

  // for alerts and loading
  const [open, setopen] = useState(false)
  const [message, setmessage] = useState(null)
  const [status, setstatus] = useState(null)
  const [showLoading, setshowLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setshowLoading(true)
    dispatch(fetchTeacherInfo())
      .unwrap()
      .then(() => {
        navigate('/app/teacherInformation')
      })

    setshowLoading(false)
  }, [dispatch, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    setshowLoading(true)
    if (!acceptTerms) {
      setstatus('error')
      setmessage('The condition must be accepted before form submitted.')
      setopen(true)
      setshowLoading(false)
      return
    }

    if (CV === null || profession === null || aboutSelf === null || currentPassword === null || teachingType === null) {
      setstatus('error')
      setmessage('Please fill all the field')
      setopen(true)
      setshowLoading(false)
      return
    }

    if (CV.type !== 'application/pdf') {
      setstatus('error')
      setmessage('CV must be in PDF format')
      setopen(true)
      setshowLoading(false)
      return
    }

    const teacherData = new FormData()
    teacherData.append('teachingType', teachingType)
    teacherData.append('profession', profession)
    teacherData.append('aboutSelf', aboutSelf)
    teacherData.append('CV', CV)

    dispatch(addTeacherInfo(teacherData))
      .unwrap()
      .then(() => {
        setstatus('sucess')
        setmessage('Information uploaded sucessfully.')
        setopen(true)
        setshowLoading(false)
        navigate('/app/teacherInformation')
      })
      .catch(() => {
        setstatus('error')
        setmessage('Failed to add information.')
        setopen(true)
        setshowLoading(false)
      })
  }

  return (
    <Page title="Teach On CodeLearner">
      <Wrapper>
        <AlertMessage display={open} setdisplay={setopen} message={message} status={status} />
        {showLoading && <Loading />}

        <h1>Teach On CodeLearner</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            <span>Select CV</span>
            <div className={`fileLabel ${!CV && 'upload'}`}>
              <input type="file" onChange={(e) => setCV(e.target.files[0])} accept="application/pdf" hidden />
              {CV ? (
                <div>
                  {CV.type === 'application/pdf' ? (
                    <Icon icon="bi:file-earmark-pdf-fill" />
                  ) : (
                    <Icon icon="ant-design:file-unknown-twotone" />
                  )}
                  <p>{CV.name}</p>
                </div>
              ) : (
                <section>
                  <Icon icon="ic:baseline-cloud-upload" />
                  <p>Select CV</p>
                </section>
              )}
            </div>
          </label>

          <section>
            <span>What kind of Teaching have you done before?</span>
            <label>
              <input
                type="radio"
                value="informal"
                checked={teachingType === 'informal'}
                onChange={handleTeachingType}
              />
              <span>Informally in person.</span>
            </label>
            <label>
              <input type="radio" value="formal" checked={teachingType === 'formal'} onChange={handleTeachingType} />
              <span>Professional in person</span>
            </label>
            <label>
              <input type="radio" value="online" checked={teachingType === 'online'} onChange={handleTeachingType} />
              <span>Online</span>
            </label>
            <label>
              <input type="radio" value="never" checked={teachingType === 'never'} onChange={handleTeachingType} />
              <span>Never became an instructor.</span>
            </label>
            <label>
              <input type="radio" value="other" checked={teachingType === 'other'} onChange={handleTeachingType} />
              <span>Other</span>
            </label>
          </section>

          <label>
            <span>Profession</span>
            <input type="text" placeholder="Profession" onChange={(e) => setprofession(e.target.value)} />
          </label>

          <label>
            <span>About Yourself</span>
            <textarea
              cols="30"
              rows="10"
              placeholder="About Yourself"
              minLength={20}
              onChange={(e) => setaboutSelf(e.target.value)}
            />
          </label>

          <label className="ifcpph">
            <span>Current Password</span>
            <input
              type={passwordType}
              placeholder="Current Password"
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <Icon
              className={passwordType === 'password' ? 'lightColor' : ''}
              icon={passwordType === 'password' ? 'mdi:eye-off' : 'mdi:eye'}
              onClick={() => (passwordType === 'password' ? setpasswordType('text') : setpasswordType('password'))}
            />
          </label>

          <label className="terms">
            <input type="checkbox" onChange={() => setacceptTerms(true)} />
            <p>
              I accept all <Link to={'/terms-and-conditions'}>terms & conditions</Link>
            </p>
          </label>

          <button>Submit</button>
        </form>
      </Wrapper>
    </Page>
  )
}
