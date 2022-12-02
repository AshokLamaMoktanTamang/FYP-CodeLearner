// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// importing components
import ArtcileThumbnail from '../Images/registration.jpg'

// styled components
const Article = styled.section`
  width: 100%;
  overflow: hidden;
  background-color: var(--background-white);
  border: 0.15rem solid var(--light-border-color);
  border-radius: 0.19rem;
  
  & > div {
    width: 100%;
    padding-top: 75%;
    position: relative;
    border-bottom: 0.15rem solid var(--light-border-color);

    & > img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

  & section {
    padding: 1rem;
  }
`

export default function ArticleItem(props) {
  return (
    <Article>
      <div>
        <img src={ArtcileThumbnail} alt="Thumbnail name" />
      </div>

      <section>
        <h3>Article Name</h3>
        <p>article brief</p>
        <Link to={props.destination}>Read full article ...</Link>

        <div>
          <span>By: Ashok Lama</span>
          <span>On: 6th October 2019</span>
        </div>
      </section>
    </Article>
  )
}
