// dependencies
import { createGlobalStyle } from 'styled-components'

const globalStyle = createGlobalStyle`
	:root{
		--background-white: #F9FAFB;
		--text-black: #212B36;
		--text-light-black: #637381;
		--text-blue: #2065D1;
		--rating-gold: #ffa534;
		--text-gold: #a66412;
		--hover-404-blue: #14438d;
		--scrollbar-color: #0000004d;
		--hover-white: rgb(70 83 96 / 8%);
		--hover-light-white: rgba(145, 158, 171, 0.08);
		--light-border-color: rgba(145, 158, 171, 0.24); 
		--dark-border-color: rgb(58 64 70 / 63%); 
		--hover-background-blue: rgba(32, 101, 209, 0.08);
		--transparent-background: rgba(249, 250, 251, 0.72)
	}

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	body{
		font-family: Public Sans,sans-serif;
		overflow-x: hidden;
	}

	::-webkit-scrollbar{
		width: 5px;
	}
	
	::-webkit-scrollbar-thumb{
		background-color: var(--scrollbar-color);
		border-radius: 1rem;
	}
`
export default globalStyle
