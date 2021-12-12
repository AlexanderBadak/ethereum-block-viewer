//augment the material ui theme
declare module '@mui/system' {
    interface Theme {
        colors: {
            white: string
            primary: string
            primaryBright: string
            background: string
        }
    }

    interface ThemeOptions {
        colors?: {
            white?: string
            primary?: string
            primaryBright?: string
            background?: string
        }
    }
}