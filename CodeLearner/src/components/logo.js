// importing dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// importing components
import LogoIcon from '../Images/favicon.png'

// styled components
const LogoWrapper = styled(Link)`
  overflow: hidden;
  display: flex;
  align-items: center;
  text-decoration: none;

  & > img {
    width: 2.3rem;
    height: 2.3rem;
  }

  & > span {
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.125rem;
    font-family: Public Sans, sans-serif;
    padding: 0 0.5rem;
    letter-spacing: 1px;
  }

  .dark {
    color: var(--text-black);
  }

  .light {
    color: white;
  }
`

export default function Logo(props) {
  return (
    <LogoWrapper to={props.location} onClick={props.OnClick}>
      <img src={props.logoIcon} alt="Code Learner" />
      <span className={props.textTheme}>Code{props.target}</span>
    </LogoWrapper>
  )
}

Logo.defaultProps = {
  target: 'Learner',
  logoIcon: LogoIcon,
  textTheme: 'dark',
}
