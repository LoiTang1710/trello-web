import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import LoupeIcon from '@mui/icons-material/Loupe';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import {
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
function ListColumns({ columns }) {
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenNewColumnForm = () =>
        setOpenNewColumnForm(!openNewColumnForm);
    const [newColumnTitle, setNewColumnTitle] = useState('');
    const addNewColumn = () => {
        if(!newColumnTitle){
            // console.error('please enter column title')
            return
        }
        // console.log(newColumnTitle)
        // goi api...
        

        //dong trang thai va clear input
        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }
    return (
        <SortableContext
            items={columns?.map((c) => c._id)}
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
                {!openNewColumnForm ? (
                    <Box
                        onClick={toggleOpenNewColumnForm}
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            borderRadius: '8px',
                            height: 'fit-content',
                            bgcolor: '#e5e5e5',
                            opacity: '50',
                        }}
                    >
                        <Button
                            sx={{
                                width: '100%',
                                px: 2,
                                py: 1,
                                color: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? 'primary.main'
                                        : 'primary.contrastText',
                            }}
                            startIcon={
                                <LoupeIcon
                                    sx={{
                                        color: 'inherit',
                                    }}
                                />
                            }
                        >
                            Add new column
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            p: 1,
                            borderRadius: '8px',
                            height: 'fit-content',
                            bgcolor: '#ecececff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <TextField
                            label="Enter column title..."
                            type="text"
                            size="small"
                            variant="outlined"
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                '& label': { color: 'black' },
                                '& input': { color: 'black' },
                                '& label.Mui-focused': { color: 'black' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'black' },
                                    '&:hover fieldset': {
                                        borderColor: 'black',
                                    },
                                    '&Mui-focused fieldset': {
                                        borderColor: 'black',
                                    },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Button
                                onClick={addNewColumn}
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) =>
                                        theme.palette.success.main,
                                    '&:hover': {
                                        bgcolor: (theme) =>
                                            theme.palette.success.main,
                                    },
                                }}
                            >
                                Add new column
                            </Button>
                            <CloseIcon
                                onClick={toggleOpenNewColumnForm}
                                sx={{
                                    color: '#464646',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.warning.main,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </SortableContext>
    );
}

export default ListColumns;
