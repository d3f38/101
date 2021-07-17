import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Nunito', sans-serif;
  }

  button {
    font-family: 'Nunito', sans-serif;
  }

  *::selection {
    background: transparent;
  }

  div {
    box-sizing: border-box;
  }
`
