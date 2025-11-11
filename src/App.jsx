import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material';

//import Icon
import LightMode from '@mui/icons-material/LightMode';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightness from '@mui/icons-material/SettingsBrightness';


function ModeSelect() {
    const { mode, setMode } = useColorScheme();

    const handleChange = (event) => {
        const selectedMode = event.target.value;
        setMode(selectedMode);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="label-select-light-dark-mode">Mode</InputLabel>
            <Select
                labelId="label-select-light-dark-mode"
                id="select-light-dark-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
            >
                <MenuItem value="light">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <LightMode fontSize="small" /> Light
                    </Box>
                </MenuItem>
                <MenuItem value="dark">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DarkModeOutlined fontSize="small" /> Dark
                    </Box>
                </MenuItem>
                <MenuItem value="system">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SettingsBrightness fontSize="small" /> Custom
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

function App() {
    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{ height: '100vh'}}
        >
            <Box
                sx={{
                    backgroundColor: 'primary.light',
                    height: (theme) => theme.trello.appBarHeight,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <ModeSelect />
            </Box>
            <Box
                sx={{
                    backgroundColor: 'primary.dark',
                    height: (theme) => theme.trello.boardBarHeight,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Board Bar
            </Box>
            <Box sx={{
                backgroundColor: 'primary.main',
                width: '100%',
                height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
                display: 'flex',
                alignItems: 'center'
            }}>
                Board Content
            </Box>
        </Container>
    );
}

export default App;
