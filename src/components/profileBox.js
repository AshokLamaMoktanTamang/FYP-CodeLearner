// importing dependencies
import React from 'react'
import styled from 'styled-components'

// importing components

// testing components
import defaultUserimage from '../Images/defaultUser.jpg'

// styled components
const Profile = styled.section`
  border: 0.13rem solid var(--light-border-color);
  padding-top: 0.7rem;
  border-radius: 0.3rem;
  box-shadow: 0px 5px 5px -3px rgb(145 158 171 / 20%), 0px 8px 10px 1px rgb(145 158 171 / 14%),
    0px 3px 14px 2px rgb(145 158 171 / 12%);

  & > div {
    text-align: center;
    line-height: 1.5;
    margin-bottom: 0.7rem;

    & > section {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;
      border: 0.13rem solid var(--light-border-color);
      display: block;
      margin: 0.5rem auto;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & > h2 {
      font-size: 0.97rem;
      color: var(--text-black);
    }

    & > span {
      font-size: 0.835rem;
      color: var(--text-light-black);
    }
  }

  & > section {
    padding: 0.7rem;
    display: flex;
    justify-content: space-around;
    border: 1px dashed var(--light-border-color);
    border-right: none;
    border-left: none;
    background-color: var(--background-white);

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: bold;

      & > p {
        font-size: 0.95rem;
        color: var(--text-black);
        line-height: 1.35;
      }

      & > span {
        display: block;
        color: var(--text-light-black);
        font-size: 0.875rem;
        line-height: 1.35;
      }
    }
  }

  & > button {
    padding: 0.9rem;
    width: 100%;
    border: none;
    font-weight: bold;
    background-color: var(--text-blue);
    color: white;
    border-radius: 0 0 0.3rem 0.3rem;
    cursor: pointer;
    
    :hover{
      background-color: var(--hover-404-blue);

    }
  }
`

export default function ProfileBox() {
  return (
    <Profile>
      <div>
        <section>
          <img src={defaultUserimage} alt="User Name" />
        </section>
        <h2>@ashoklama147</h2>
        <span>moktashok@gmail.com</span>
      </div>

      <section>
        <div>
          <p>Enrolled</p>
          <span>14</span>
        </div>
        <div>
          <p>Saved</p>
          <span>1</span>
        </div>
      </section>

      <button>Update Profile</button>
    </Profile>
  )
}
