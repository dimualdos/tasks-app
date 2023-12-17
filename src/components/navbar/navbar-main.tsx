import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../header/header';


export const NavbarMain: FunctionComponent = () => {

  return (
    <Box justifyContent="center" >
      <Box sx={{ mb: 3 }}>
        <Header />
      </Box>
      <Outlet />
    </Box>
  );
}
