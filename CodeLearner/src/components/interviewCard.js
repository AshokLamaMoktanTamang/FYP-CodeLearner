// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// styled components
const Card = styled.section`
  background-color: var(--background-white);
  border: 0.13rem solid var(--light-border-color);
  border-radius: 0.35rem;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  position: relative;
  line-height: 1.35;
  color: var(--text-black);
  display: grid;
  grid-template-columns: max-content auto;  
  max-width: 650px;
  
  :hover {
    filter: brightness(0.7);
  }   

  & section {
    margin: 1rem;
  
    & > img {
      width: 10rem;
      height: 10rem;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid var(--text-black);
    }
    
    & > svg {
      font-size: 10rem;
      border-radius: 50%;
      border: 2px solid var(--text-black);
    }
  }    
  
  & > div {
    & > h1 {
      font-size: 1rem;
      padding: 0.5rem;
    }  
    & > p {
      font-size: 0.9rem;
      font-weight: bold;
      color: var(--text-light-black);
      display: grid;
      grid-template-columns: 120px auto;
      padding: 0.1rem 0.5rem;  

      & > span {
        font-size: 0.835rem;
        color: var(--text-blue);
        line-height: 1.35;
        padding-bottom: 0.5rem;
        display: block;
      }
    }
  }
`

export default function InterviewCard({ profile, fname, lname, id, interviewTime, email }) {
    return (
        <Card>
            <section>
                {profile ? (
                    <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/profile/${profile}`} alt="Denim Jeans" />
                ) : (
                    <Icon icon="carbon:user-avatar-filled" />
                )}
            </section>

            <div>
                <h1>{`${fname} ${lname}`}</h1>
                <p>
                    <span>Email</span> {email}
                </p>
                <p>
                    <span>Interview Time</span> {interviewTime}
                </p>
            </div>
        </Card>
    )
}
