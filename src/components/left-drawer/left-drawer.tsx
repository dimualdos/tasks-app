import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { leftListPages } from './left-list-pages';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ItemGrid, ItemTaskOverflow } from '../../constants/constant-mui';
import Grid from "@mui/material/Unstable_Grid2";
import styles from './left-drawer.module.css'


const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export const LeftDrawer: React.FC = () => {
    let location = useLocation();
    const navigate = useNavigate()

    const drawer = (
        <ItemGrid>
            <ItemTaskOverflow>
                <List>
                    {leftListPages.map((item, index) => (

                        <ListItem key={index}
                            onClick={() => navigate(item.path)}
                            className={location.pathname === `/user-panel/${item.path}`
                                ? styles.pendingLinkDrawer : ''}
                        >
                            <Box >
                                <ListItemButton>
                                    <ListItemIcon >
                                        {location.pathname === `/user-panel/${item.path}` ? item.icon1 : item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </Box>
                        </ListItem>

                    ))}
                </List>
            </ItemTaskOverflow>
        </ItemGrid>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Box

                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Box>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, justifyContent: 'center' }}
            >
                <Toolbar />
                <ItemTaskOverflow>
                    <Grid container display={"flex"} flexDirection={"column"} gap={"20px"} alignItems="center" xs={12}>
                        <Outlet />
                    </Grid>
                </ItemTaskOverflow>

            </Box>
        </Box>
    );
}
