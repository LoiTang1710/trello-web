import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ListCards from './ListCards/ListCards';
import { mapOrder } from '@/utils/sorts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

function Column({ column }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumStyles = {
        // touchAction : 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);
    const [newCardTitle, setNewCardTitle] = useState('');
    const addNewCard = () => {
        if (!newCardTitle) {
            // console.error('please enter column title')
            return;
        }
        // console.log(newCardTitle)
        // goi api...

        //dong trang thai va clear input
        toggleOpenNewCardForm();
        setNewCardTitle('');
    };
    return (
        <div ref={setNodeRef} style={dndKitColumStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? '#334155' : '#cbd5e1',
                    ml: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    maxHeight: (theme) =>
                        `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? '#57534e'
                                : '#bdc3c7',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? '#94a3b8'
                                : '#e2e8f0',
                    },
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnHeaderHeight,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: 'primary.contrastText',
                        }}
                    >
                        {column?.title}
                    </Typography>
                    <Box>
                        <Tooltip title="More options">
                            <ExpandMoreIcon
                                sx={{
                                    color: 'primary.contrastText',
                                    cursor: 'pointer',
                                }}
                                id="basic-column-dropdown"
                                aria-controls={
                                    open
                                        ? 'basic-menu-column-dropdown'
                                        : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="basic-menu-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopy fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPaste fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <RemoveCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/* BODY */}
                <ListCards cards={orderedCards} />
                {/* FOOTER */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnFooterHeight,
                        p: 2,
                    }}
                >
                    {!openNewCardForm ? (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                sx={{ color: 'primary.contrastText' }}
                                onClick={toggleOpenNewCardForm}
                                startIcon={
                                    <AddCardIcon
                                        sx={{ color: 'primary.contrastText' }}
                                    />
                                }
                            >
                                Add new card
                            </Button>
                            <Tooltip title="Drag to move">
                                <DragIndicatorIcon
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'primary.contrastText',
                                    }}
                                />
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <TextField
                                label="Enter card title..."
                                type="text"
                                size="small"
                                variant="outlined"
                                autoFocus
                                data-no-dnd="true"
                                value={newCardTitle}
                                onChange={(e) =>
                                    setNewCardTitle(e.target.value)
                                }
                                sx={{
                                    '& label': {
                                        color: 'primary.contrastText',
                                    },
                                    '& input': {
                                        color: 'primary.contrastText',
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'white'
                                                : 'transparent',
                                    },
                                    // trang thai nhap
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'primary.contrastText', // Màu label khi focus
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        // color: 'white',
                                        '& fieldset': {
                                            borderColor: 'primary.contrastText',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.contrastText',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'primary.contrastText',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1,
                                    },
                                }}
                            />
                            <Box
                                data-no-dnd="true"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    onClick={addNewCard}
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
                                    Add
                                </Button>
                                <CloseIcon
                                    onClick={toggleOpenNewCardForm}
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.warning.light,
                                        cursor: 'pointer',
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default Column;
