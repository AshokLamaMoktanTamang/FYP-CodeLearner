import React from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'

const Loader = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #00000099;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    font-size: 3rem;
    color: white;
  }
`

export default function Loading() {
  return (
    <Loader>
      <Icon icon="eos-icons:loading" />
    </Loader>
  )
}
