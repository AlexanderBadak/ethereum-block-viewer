import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import { defaultTheme } from './styles/theme'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

export const renderWithProviders = (children: JSX.Element) => {
    const theme = createTheme(defaultTheme)
    const renderResult = render(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
    return renderResult
}