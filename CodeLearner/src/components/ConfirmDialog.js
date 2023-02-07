// importing the dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// styled component
const Dialog = styled.section`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  width: 90%;
  border-radius: 0.25rem;
  background-color: var(--teacher-content-background);
  padding: 0.7rem;
  z-index: 100;
  backdrop-filter: blur(20px);

  & > section {
    display: flex;
    align-items: center;

    & > div {
      margin-right: 0.7rem;

      & > svg {
        font-size: 1.9rem;
      }
    }

    & > h2 {
      font-size: 1.1rem;
      color: #fff;
    }
  }

  .danger {
    color: #ff5733;
  }

  .info {
    color: white;
  }

  .warning {
    color: #eed202;
  }

  & > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 0.7rem;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    & > button {
      display: block;
      padding: 0.5rem 0.7rem;
      border: none;
      border-radius: 0.15rem;
      outline: none;
      font-weight: bold;
      cursor: pointer;

      :nth-child(2) {
        margin-left: 1rem;
        background-color: var(--text-blue);
        color: white;
      }

      :hover {
        filter: brightness(0.7);
      }
    }
  }

  .Delete {
    background-color: var(--pdf-red) !important;
  }
`

const Back = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`

export default function ConfirmDialog(props) {
  return (
    <>
      <Dialog>
        <section>
          <div className={props.status}>
            {props.status === 'danger' && <Icon icon="jam:triangle-danger-f" />}
            {props.status === 'info' && <Icon icon="carbon:information-filled" />}
            {props.status === 'warning' && <Icon icon="material-symbols:warning-rounded" />}
          </div>

          <h2>{props.subject}</h2>
        </section>

        <p>{props.message}</p>

        <div>
          <button onClick={props.cancel}>Cancel</button>
          <button onClick={props.buttonAction} className={props.actionLabel}>
            {props.actionLabel}
          </button>
        </div>
      </Dialog>

      <Back onClick={props.cancel}></Back>
    </>
  )
}
