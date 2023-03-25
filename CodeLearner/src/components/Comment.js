// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// styled components
const Wrapper = styled.div`
  display: block;
  width: 100%;
  padding: 0.7rem;
  border-radius: 0.15rem;
  background-color: var(--teacher-content-background);

  & > section {
    display: flex;
    align-items: center;

    & > div {
      margin-right: 0.5rem;

      & > svg {
        font-size: 2.5rem;
        color: #ffffff;
      }

      & > img {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    & > p {
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.5;
      margin-right: 1rem;
    }
  }

  & > p {
    font-size: 0.875rem;
    color: gray;
    line-height: 1.5;

    & > span {
      font-size: 0.7rem;
      display: block;
      font-weight: bold;
      margin-top: 0.7rem;
      text-align: right;
    }
  }
`

export default function Comment(props) {
  return (
    <Wrapper className={props.theme}>
      <section>
        <div>
          {props.profilePic ? <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${props.profilePic}`} alt="profile" /> : <Icon icon="carbon:user-avatar-filled" />}
        </div>
        <p>{props.userName}</p>
      </section>

      <p>
        {props.message}
        <span>{props.uploadDate === 0 ? 'Today' : `${props.uploadDate} day ago`}</span>
      </p>
    </Wrapper>
  )
}

Comment.defaultProps = {
  userName: 'Unknown',
  message: 'Unknown',
  uploadDate: 'N/A',
}
