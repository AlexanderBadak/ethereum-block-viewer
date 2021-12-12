import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { defaultTheme } from './styles/theme'
import LatestBlockContainer from 'views/latest-block-container'

const App = () => {
    const theme = createTheme(defaultTheme)

    return (
        <ThemeProvider theme={theme}>
            <LatestBlockContainer />
        </ThemeProvider>
    )
}

export default App
