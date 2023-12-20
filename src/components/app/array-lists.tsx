import { MainPage, BoardTasks, TasksList, AddTask, LoginPage, AdminPage, ProfileUser } from "../../pages";
import { RequireAuth } from "../../protected/protected-route";
import { TasksDetail } from "../tasks-detail/tasks-detail";

export const pageLists = [
    {
        path: '/',
        element: <AdminPage />,
    },

    {
        path: 'board-tasks',
        element: <RequireAuth><BoardTasks /></RequireAuth>,
    },

    {
        path: 'list-tasks',
        element: <RequireAuth><TasksList /></RequireAuth>,
    },
    {
        path: 'add-task',
        element: <RequireAuth><AddTask /></RequireAuth>,
    },
    {
        path: '/tasks-number/:id',
        element: <RequireAuth><TasksDetail /></RequireAuth>,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'profile',
        element: <ProfileUser />,
    }

]
