import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';

function BoardContent({ board }) {
    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? '#fafafa' : '#3f3f46',
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0',
            }}
        >
            <ListColumns columns={board?.columns} />
        </Box>
    );
}

export default BoardContent;
