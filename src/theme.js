import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

// Create a theme instance.
const theme = extendTheme(
    {
        trello: {
            appBarHeight: APP_BAR_HEIGHT,
            boardBarHeight: BOARD_BAR_HEIGHT,
            boardContentHeight: BOARD_CONTENT_HEIGHT,
        },
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: '#464646',
                        contrastText: '#ecececff',
                    },
                },
            },
            dark: {
                palette: {
                    primary: {
                        main: '#ecececff',
                        contrastText: '#464646',
                    },
                },
            },
        },
        components: {
            // Name of the component
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    body: {
                        '*::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px',
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: '#bdc3c7',
                        },
                        '*::-webkit-scrollbar-thumb:hover ': {
                            backgroundColor:
                                theme.palette.mode === 'light'
                                    ? '#474646ff'
                                    : '#f4f4f5',
                        },
                    },
                }),
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
            MuiTypography: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        '& .MuiTypography-body1': { fontSize: '0.875rem' },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    // Name of the slot
                    root: {
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
