import Box from '@mui/material/Box';
import React from 'react';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import LoupeIcon from '@mui/icons-material/Loupe';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
function ListColumns({ columns }) {
    return (
        <SortableContext
            items={columns?.map(c => c._id)}
            strategy={horizontalListSortingStrategy}
        >
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
                {columns?.map((column) => (
                    <Column key={column._id} column={column} />
                ))}

                {/* Add new column button */}
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
        </SortableContext>
    );
}

export default ListColumns;
