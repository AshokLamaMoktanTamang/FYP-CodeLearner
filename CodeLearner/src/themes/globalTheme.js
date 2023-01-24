// dependencies
import { createGlobalStyle } from 'styled-components'

const globalStyle = createGlobalStyle`
	:root{
		--background-white: #F9FAFB;
		--footer-background: #f3f3f3;
		--text-black: #212B36;
		--text-light-black: #637381;
		--text-blue: #2065D1;
		--rating-gold: #ffa534;
		--text-gold: #a66412;
		--hover-404-blue: #14438d;
		--scrollbar-color: #0000004d;
		--hover-white: rgb(70 83 96 / 8%);
		--hover-light-white: rgba(145, 158, 171, 0.08);
		--btn-color: #d7e6ff6e;
		--btn-hover-color: #d7e6ff;
		--light-border-color: rgba(145, 158, 171, 0.24); 
		--dark-border-color: rgb(137 142 147); 
		--hover-background-blue: rgba(32, 101, 209, 0.08);
		--transparent-background: rgba(249, 250, 251, 0.72);
		--pdf-red: #f40f02;

		// teacher color
		--background-black: #161b22;
		--teacher-dark-border: #30363d;
		--teacher-background: #0d1117;
		--teacher-white: #d2dce7;
		--hover-purple: #3f71ff;
		--dark-scroll-bar: #052424b0;
	}

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		text-transform: capitalize;
	}
	
	.none{
		display: none;
	}

	body{
		font-family: Public Sans,sans-serif;
		overflow-x: hidden;
	}

	::-webkit-scrollbar{
		width: 5px;
		height: 5px;
	}
	
	::-webkit-scrollbar-thumb{
		background-color: var(--scrollbar-color);
		border-radius: 1rem;
	}

	.react-multiple-carousel__arrow--right{
		z-index: 9;
	}
`
export default globalStyle
