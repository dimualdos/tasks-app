import React from 'react';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppDispatch } from '../../servises/store';
import { NavbarMain } from '../navbar/navbar-main';
import { useAppDispatch } from '../../hooks/hooks';
import { createBrowserRouter, createHashRouter, RouterProvider, } from 'react-router-dom';
import { ErrorPage } from '../../pages';
import { joinChat } from '../../servises/actions/user-actions';
import { getDesignTokens } from './getDesignTokens';
import { fetchDirectionServer, fetchStatuseServer, fetchUsers } from '../../servises/slices/task-slice';
import { ColorModeContext } from '../../servises/context';
import { styled } from "@mui/material";
import { pageLists } from './array-lists';
import { AuthProvider } from '../../provider/auth-provider';

import './app.css';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: < NavbarMain />,
    children: pageLists.map(item => item),
  },
]);

function App() {
  const dispatch: AppDispatch = useAppDispatch();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode]
  );
  useEffect(() => {
    // получение Body и заливка градиентом темы
    const childElemenet = document.querySelector("Body");
    childElemenet!.classList.add(theme.palette.mode === "dark" ? 'darkTheme' : 'lightTheme')
    // получение списков с сервера
    // dispatch(getItemsTasks());
    dispatch(fetchDirectionServer());
    dispatch(fetchStatuseServer());
    dispatch(fetchUsers());
    dispatch(joinChat());
    return () => {
      childElemenet!.classList.remove(theme.palette.mode === "dark" ? 'darkTheme' : 'lightTheme');

    }
    // parentElemenet?.prepend
  }, [dispatch, theme.palette.mode]);

  return (
    <div data-parents='app'>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;


