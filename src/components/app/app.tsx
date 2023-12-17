import React from 'react';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppDispatch } from '../../servises/store';
import { NavbarMain } from '../navbar/navbar-main';
import { useAppDispatch } from '../../hooks/hooks';
import { createBrowserRouter, createHashRouter, RouterProvider, } from 'react-router-dom';
import { AddTask, ErrorPage, MainPage, TasksList, BoardTasks } from '../../pages';
import { TasksDetail } from '../tasks-detail/tasks-detail';
import { joinChat } from '../../servises/actions/user-actions';
import { getDesignTokens } from './getDesignTokens';
import { fetchDirectionServer, fetchStatuseServer, fetchUsers } from '../../servises/slices/task-slice';
import { ILocationState } from '../../utils/types';
import { ColorModeContext } from '../../servises/color-mode-context';
import { styled } from "@mui/material";
import './app.css';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: < NavbarMain />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },

      {
        path: 'board-tasks',
        element: <BoardTasks />,
      },

      {
        path: 'list-tasks',
        element: <TasksList />,
      },
      {
        path: 'add-task',
        element: <AddTask />,
      },
      {
        path: '/tasks-number/:id',
        element: <TasksDetail />,
      },

    ],
  },
]);

//const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const BodyStyleCustom = styled('section')(({ theme }) => ({
  background: theme.palette.mode === "dark" ? '100% linear-gradient(to right, #01333F, #02124A)' : 'linear-gradient(to right, #0C5D71, #041654) transparent',
}));
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
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;


