// importing the react and external libraries
import React from 'react'
import styled from 'styled-components'
import ArticleItem from '../components/articleItem'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Icon } from '@iconify/react'

// importing the react components
import Page from '../components/page'
import { responsive } from '../service/responsive'

// importing testing component
import ArtcileThumbnail from '../Images/registration.jpg'
import { Link } from 'react-router-dom'

// styled components
const ArticleWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  & > div {
    margin-bottom: 1rem;

    & > section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

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

      & > a {
        display: flex;
        text-decoration: none;
        color: var(--text-light-black);
        align-items: center;
        margin-right: 3.5rem;
        font-weight: bold;
        font-size: 0.9rem;

        :hover {
          color: var(--text-blue);
        }

        & > svg {
          font-size: 1.3rem;
          margin-left: 0.1rem;
        }
      }
    }

    .carouselItem {
      display: block;
      padding-right: 1rem;
    }
  }
`

export default function Article() {
  return (
    <Page title="Articles">
      <ArticleWrapper>
        <div>
          <section>
            <h2>Popular</h2>
            <Link to={'popular'}>
              See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </Link>
          </section>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
            minimumTouchDrag={20}
          >
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
          </Carousel>
        </div>
        <div>
          <section>
            <h2>Latest</h2>
            <Link to={'latest'}>
              See All <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </Link>
          </section>

          <Carousel
            containerClass="carousel-container"
            responsive={responsive}
            swipeable={true}
            draggable={true}
            itemClass="carouselItem"
            partialVisible={false}
            minimumTouchDrag={20}
          >
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
            <ArticleItem />
          </Carousel>
        </div>
      </ArticleWrapper>
    </Page>
  )
}
