import Box from '@mui/material/Box';

function BoardContent() {
    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? '#fafafa' : '#3f3f46',
                width: '100%',
                height: (theme) =>
                    `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            Board Content
        </Box>
    );
}

export default BoardContent;
