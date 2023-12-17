import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../servises/color-mode-context';



export const DarkThemeButton: React.FC = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <>
            {theme.palette.mode === 'dark' ? "Темная" : "Светлая"} тема
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </>


    );
}