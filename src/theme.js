import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme(
    {
        trello: {
            appBarHeight: '58px',
            boardBarHeight: '60px',
        },
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: '#464646',
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
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        '*::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px',
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: '#bdc3c7',
                        },
                        '*::-webkit-scrollbar-thumb:hover ': {
                            backgroundColor: '#474646ff',
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        textTransform: 'none',
                        borderWidth: '0.5px',
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        fontSize: '0.875rem',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    // Name of the slot
                    root:{
                        fontSize: '0.875rem',
                        '& fieldset': {
                            borderWidth: '0.5px !important',
                        },
                        '&:hover fieldset': {
                            borderWidth: '1px !important',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: '1px !important',
                        },
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.primary.main,
                    }),
                },
            },
        },
    }
    // ...other properties
);

export default theme;
