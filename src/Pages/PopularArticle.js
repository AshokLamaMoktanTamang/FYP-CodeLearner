// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'

// importing the react components
import Page from '../components/page'
import ArticleItem from '../components/articleItem'

// importing testing component
import ArtcileThumbnail from '../Images/registration.jpg'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/pagination'

// styled components
const Container = styled.section`
  & > h2 {
    font-size: 1.1rem;
    color: var(--text-black);
    margin-bottom: 1rem;
    position: relative;
    width: fit-content;
    text-transform: capitalize;
    cursor: pointer;

    ::before {
      position: absolute;
      content: '';
      width: 40%;
      height: 5px;
      transition: 0.19s ease-in-out;
      border-radius: 10px;
      background-color: var(--text-blue);
      top: 100%;
      left: 0;
    }

    :hover {
      ::before {
        width: 90%;
      }
    }
  }

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    grid-gap: 1.5rem 1rem;
  }
`

export default function PopularArticle() {
  const [query] = useSearchParams()
  console.log(query.get('page'))

  return (
    <Page title="Popular Article">
      <Container>
        <h2>Popular - Article</h2>

        <div>
          <ArticleItem
            thumbnail={ArtcileThumbnail}
            articleName="Article Name"
            articleDescription=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quod error sint, soluta non, nostrum
  eos, ipsam nam numquam facilis atque? Accusamus placeat inventore nemo eum sunt temporibus ipsam ab, fuga
  error voluptates fugit recusandae enim consequuntur quasi deserunt quo laboriosam odio excepturi tenetur
  nostrum sequi! Expedita, alias."
            destination="/404"
            author="Ashok Lama"
            date="20th August 2022"
          />
          <ArticleItem
            thumbnail={ArtcileThumbnail}
            articleName="Article Name"
            articleDescription=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quod error sint, soluta non, nostrum
  eos, ipsam nam numquam facilis atque? Accusamus placeat inventore nemo eum sunt temporibus ipsam ab, fuga
  error voluptates fugit recusandae enim consequuntur quasi deserunt quo laboriosam odio excepturi tenetur
  nostrum sequi! Expedita, alias."
            destination="/404"
            author="Ashok Lama"
            date="20th August 2022"
          />
          <ArticleItem
            thumbnail={ArtcileThumbnail}
            articleName="Article Name"
            articleDescription=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quod error sint, soluta non, nostrum
  eos, ipsam nam numquam facilis atque? Accusamus placeat inventore nemo eum sunt temporibus ipsam ab, fuga
  error voluptates fugit recusandae enim consequuntur quasi deserunt quo laboriosam odio excepturi tenetur
  nostrum sequi! Expedita, alias."
            destination="/404"
            author="Ashok Lama"
            date="20th August 2022"
          />
          <ArticleItem
            thumbnail={ArtcileThumbnail}
            articleName="Article Name"
            articleDescription=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quod error sint, soluta non, nostrum
  eos, ipsam nam numquam facilis atque? Accusamus placeat inventore nemo eum sunt temporibus ipsam ab, fuga
  error voluptates fugit recusandae enim consequuntur quasi deserunt quo laboriosam odio excepturi tenetur
  nostrum sequi! Expedita, alias."
            destination="/404"
            author="Ashok Lama"
            date="20th August 2022"
          />
        </div>

        <Pagination pages={5} />
      </Container>
    </Page>
  )
}
