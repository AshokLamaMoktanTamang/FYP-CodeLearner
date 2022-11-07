// dependencies
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

// components and theme
import AccountPopOver from './accountPopOver';

// importing the logo image
import LogoIcon from "../../Images/favicon.png" 


// styled components
const Header = styled.header`
	display: flex;
	background-color: var(--transparent-background);
	justify-content: flex-end;
	align-items: center;
	padding: 0.5rem 1rem;

	.hw48{
		width: 48px;
		height: 48px;
	}

	@media (max-width: 800px) {
		justify-content: space-between;	
		border-bottom: 1px solid var(--light-border-color);
	}
`

const Logo = styled.section`
display: none;

	a{
		text-decoration: none;
		color: black;
		display: flex;
		align-items: center;
	}

	img{
		width: 2.3rem;
		height: 2.3rem;
	}
	
	p{
		font-weight: 700;
		line-height: 1.5;
		font-size: 1.125rem;
		padding: 0 0.5rem;
		letter-spacing: 1px;
		color: var(--text-black);
	}

	@media (max-width: 800px) {
		display: block;
	}

	@media (max-width: 305px) {
		display: none;
	}
`

export default function NavBar() {
  return (
	<Header>
		<div className='hw48'></div>

		{/* making the logo of the company */}
		<Logo>
			<Link to='/app'>
				<img src={LogoIcon} alt="logo"></img>
				<p>
					CodeLearner
				</p>
			</Link>
		</Logo>

		{/* making the account popover */}
		<AccountPopOver/>
	</Header>
  )
}
