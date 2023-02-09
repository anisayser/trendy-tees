import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#FF8038',
            main: '#FF7038',
            dark: '#FF6038',
            contrastText: '#000',
        },
        secondary: {
            light: '#353535',
            main: '#252525',
            dark: '#151515',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'Itim',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Itim';
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
});

export default theme;
