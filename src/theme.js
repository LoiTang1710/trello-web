import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#ada8a8ff',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#000',
                },
            },
        },
    },
    // ...other properties
});

export default theme;
