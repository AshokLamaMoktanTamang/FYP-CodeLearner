// importing dependencies
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// styled components
const Message = styled.section`
  position: fixed;
  left: 50%;
  padding: 1.5rem 1rem;
  transform: translateX(-50%);
  background-color: var(--footer-background);
  border: 1px dashed var(--light-border-color);
  box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
    0px 3px 14px 2px rgb(145 158 171 / 12%);
  max-width: 250px;
  width: 100%;
  z-index: 100;
  animation: pop 3.5s;
  animation-iteration-count: 1;
  top: -100%;
  border-radius: 0.35rem;

  @keyframes pop {
    0% {
      top: -100%;
    }

    10% {
      top: 1.7rem;
    }

    90% {
      top: 1.7rem;
    }

    100% {
      top: -100%;
    }
  }

  .sucess {
    color: #4bb543;
  }

  .error {
    color: #cf3030;
  }

  & > i {
    font-size: 3rem;
    margin-bottom: 0.35rem;
    display: block;

    & > svg {
      display: block;
      margin: auto;
    }
  }

  & > p {
    font-size: 0.87rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.7;
  }
`

const AlertMessage = ({ display, setdisplay, status, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setdisplay(false)
    }, 3500)

    return () => {
      clearTimeout(timer)
    }
  }, [display, setdisplay])

  return (
    display && (
      <Message>
        <i className={status}>
          {status === 'sucess' ? (
            <Icon icon="icon-park-outline:link-cloud-sucess" />
          ) : (
            <Icon icon="material-symbols:error" />
          )}
        </i>
        <p>{message}</p>
      </Message>
    )
  )
}

export default AlertMessage
