// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DefaultThumbnail from '../Images/registration.jpg'

// styled components
const Card = styled(Link)`
  background-color: var(--background-white);
  border: 0.13rem solid var(--light-border-color);
  border-radius: 0.35rem;
  overflow: hidden;
  max-width: 700px;
  text-decoration: none;
  line-height: 1.35;
  color: var(--text-black);
  display: grid;
  grid-template-columns: 300px auto;
  grid-gap: 1rem;
  max-width: 650px;
  
      :hover {
        filter: brightness(0.7);
      }
  
  & section {
    width: 100%;
    overflow: hidden;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: .25rem;
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
      padding: 0.1rem 0.5rem;
      line-height: 1.7;
      margin-bottom: 1rem;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      :last-child{
        color: var(--text-blue);
      }
    }
  }
`

export default function TeacherCard({ thumbnail, courseName, courseDescription, price, id }) {
    return (
        <Card to={id}>
            <section>
                {thumbnail ? (
                    <img src={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${thumbnail}`} alt="thumbnail" />
                ) : (
                    <img src={DefaultThumbnail} alt="thumbnail" />
                )}
            </section>

            <div>
                <h1>{courseName}</h1>
                <p>
                    {courseDescription}
                </p>
                <p>
                    $ {price}
                </p>
            </div>
        </Card>
    )
}
