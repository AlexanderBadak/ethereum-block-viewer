import { ThemeOptions } from '@mui/material'

export const defaultTheme: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: {
                root: { backgroundColor: '#f4f4f5' },
            },
        },
    },
    colors: {
        white: '#f4f4f5',
        primary: '#00e676',
        primaryBright: '#0bc98d',
        background: '#0b2533'
    }
}