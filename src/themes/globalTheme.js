// dependencies
import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
	:root{
		--background-white: #F9FAFB;
		--text-black: #212B36;
		--text-light-black: #637381;
		--text-blue: #2065D1;
		--hover-white: rgb(70 83 96 / 8%);
		--hover-light-white: rgba(145, 158, 171, 0.08);
		--light-border-color: rgba(145, 158, 171, 0.24); 
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
`
export default globalStyle