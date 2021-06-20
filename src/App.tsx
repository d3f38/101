import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { theme } from '@app/styles'

import { GlobalStyles } from './styles/GlobalStyles'
import { Routes } from './routes'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
