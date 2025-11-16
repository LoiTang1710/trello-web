import { useState } from 'react';
import Box from '@mui/material/Box';
import ModeSelect from '@/components/ModeSelect/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as TrelloIcon } from '@/assets/mdi--trello.svg';
import Typography from '@mui/material/Typography';
import Workspaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function AppBar() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Box
            sx={{
                height: (theme) => theme.trello.appBarHeight,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                paddingX: 2,
                overflowX: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? '#e4e4e7' : '#27272a',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon
                        component={TrelloIcon}
                        inheritViewBox
                        fontSize="small"
                        sx={{ color: 'primary.main' }}
                    />
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: 'primary.main',
                        }}
                    >
                        Trello
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button
                        sx={{
                            border: 'none',
                            '&:hover': {
                                border: 'none',
                            },
                        }}
                        variant="outlined"
                        startIcon={<AddIcon />}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchValue.length > 0 && (
                            <InputAdornment position="end">
                                <CloseIcon
                                    onClick={() => setSearchValue('')}
                                    sx={{
                                        fontSize: 'small',
                                        cursor: 'pointer',
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: '120px', maxWidth: '170px' }}
                />
                <ModeSelect />
                <Tooltip title="Notification">
                    <Badge
                        color="warning"
                        variant="dot"
                        sx={{ cursor: 'pointer' }}
                    >
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <HelpOutlineIcon
                        sx={{ cursor: 'pointer', color: 'primary.main' }}
                    />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBar;
