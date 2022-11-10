// importing the react and external libraries
import React from "react";
import styled from "styled-components";

// importing the react components
import Page from "../components/page"

// styled components
const SearchWrapper = styled.section`
	
`

export default function Article() {
  return (
      <Page title={`Search $query}`}>
        <h2>This is a Search</h2>
      </Page>
  );
}
