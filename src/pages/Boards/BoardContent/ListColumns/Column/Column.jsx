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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IosShareIcon from '@mui/icons-material/IosShare';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ListCards from './ListCards/ListCards';



function Column() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box
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
                        theme.palette.mode === 'dark' ? '#57534e' : '#bdc3c7',
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#94a3b8' : '#e2e8f0',
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
                    Column Title
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
                                open ? 'basic-menu-column-dropdown' : undefined
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
            <ListCards />
            {/* FOOTER */}
            <Box
                sx={{
                    height: (theme) => theme.trello.columnFooterHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    sx={{ color: 'primary.contrastText' }}
                    startIcon={
                        <AddCardIcon sx={{ color: 'primary.contrastText' }} />
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
        </Box>
    );
}

export default Column;
