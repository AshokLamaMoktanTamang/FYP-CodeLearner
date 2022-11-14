// importing dependencies
import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

// styled components
const Rank = styled.section`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  i {
    color: var(--rating-gold);
    font-size: 1.1rem;
    display: flex;
  }
`

export default function RatingCounter(props) {
  return (
    <Rank>
      {[...Array(Math.floor(props.rating))].map((data, index) => {
        return (
          <i key={index}>
            <Icon icon="fluent:star-20-filled" />
          </i>
        )
      })}
      {parseInt(props.rating.toString().split('.')[1]) > 0 && (
        <i>
          <Icon icon="fluent:star-half-16-regular" />
        </i>
      )}
      {[...Array(5 - Math.ceil(props.rating))].map((data, index) => {
        return (
          <i key={index}>
            <Icon icon="eva:star-outline" />
          </i>
        )
      })}
    </Rank>
  )
}
