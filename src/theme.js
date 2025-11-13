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
                    main: '#161616ff',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#ecececff',
                },
            },
        },
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light,
                    },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    '& fieldset': {
                        borderWidth: '1px !important',
                    },
                }),
            },
        },
        MuiSvgIcon:{
            styleOverrides: {
                root: ({theme}) => ({
                    color: theme.palette.primary.main,
                })
            }
        }
    },
    // ...other properties
});

export default theme;
