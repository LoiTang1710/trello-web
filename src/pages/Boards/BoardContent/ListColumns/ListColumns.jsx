import Box from '@mui/material/Box';
import React from 'react';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import LoupeIcon from '@mui/icons-material/Loupe';
function ListColumns() {
    return (
        <Box
            sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            {/* Column */}
            <Column />
            <Box
                sx={{
                    minWidth: '180px',
                    maxWidth: '180px',
                    mx: 2,
                    borderRadius: '8px',
                    height: 'fit-content',
                    bgcolor: '#e5e5e5',
                }}
            >
                <Button
                    sx={{ width: '100%', px: 2, py: 1 }}
                    startIcon={<LoupeIcon />}
                >
                    Add new column
                </Button>
            </Box>
        </Box>
    );
}

export default ListColumns;
