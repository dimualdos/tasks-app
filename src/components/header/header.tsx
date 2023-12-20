import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import GroupHeaderButtons from './header-button';
import HeaderFilter from './header-filter';
import { CustomizedSwitches } from '../tabs-radio/tabs-radio';
import { Link, useLocation } from 'react-router-dom';
import { HeaderButtonActive } from '../../constants/constant-mui';
import { userDataPath } from './user-links';
import { StyledLink } from '../../constants/constant-mui';
import { useAuth } from '../../hooks/hooks';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.70),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


function Header() {
    let location = useLocation();
    const { logout } = useAuth();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',

                        }}
                    >
                        <StyledLink to={'/'}>
                            LOGO
                        </StyledLink>

                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar1"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/*  Тут должен быть компонент для отображения задач и фильтрации */}

                            <Link to={'add-task'}>
                                <HeaderButtonActive size="small" variant="contained">+ Добавить задачу</HeaderButtonActive>
                            </Link>
                            {/* Группа кнопок */}
                            <GroupHeaderButtons />
                            {/* фильтр кнопка */}
                            {location.pathname === '/list-tasks' ? <HeaderFilter /> : null}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap

                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        <StyledLink to={'/'}>
                            LOGO
                        </StyledLink>
                    </Typography>
                    {/*  Тут должен быть компонент для отображения задач и фильтрации */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to={'add-task'}>
                            <HeaderButtonActive size="small" variant="contained">+ Добавить задачу</HeaderButtonActive>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <GroupHeaderButtons />
                        {location.pathname === '/list-tasks' ? <HeaderFilter /> : null}
                    </Box>
                    {/* поисковое поле */}
                    <Box sx={{ mr: 2 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box >

                    {/* Переключение на темный режим */}
                    <Box sx={{ mr: 2 }}>
                        <CustomizedSwitches />
                    </Box>
                    {/* пользователь приложения  */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userDataPath.map((setting, i) => (
                                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                                    <StyledLink to={setting.path}>
                                        <Typography textAlign="center">{setting.text}</Typography>
                                    </StyledLink>
                                </MenuItem>
                            ))}
                            <Box onClick={handleCloseUserMenu}>
                                <MenuItem onClick={logout}>Выйти</MenuItem>

                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Header;
