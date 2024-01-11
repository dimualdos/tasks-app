import { BoardTasks, TasksList, AddTask, LoginPage, ProfileUser } from "../../pages";
import { ProtectedRoute } from "../../protected/protected-route";
import { TasksDetail } from "../tasks-detail/tasks-detail";
import { leftDrawerLinks } from "./left-drawer-links";
import { LeftDrawer } from '../left-drawer/left-drawer';

export const linkLists = [
    {
        path: 'board-tasks/*',
        element: <ProtectedRoute ><BoardTasks /></ProtectedRoute>,
    },
    {
        path: 'list-tasks/*',
        element: <ProtectedRoute ><TasksList /></ProtectedRoute>,
    },
    {
        path: 'add-task/*',
        element: <ProtectedRoute ><AddTask /></ProtectedRoute>,
    },
    {
        path: 'tasks-number/:id/*',
        element: <ProtectedRoute ><TasksDetail /></ProtectedRoute>,
    },
    {
        path: 'login/*',
        element: <ProtectedRoute onlyUnAuth={true}><LoginPage /></ProtectedRoute>,
    },
    {
        path: 'profile/*',
        element: <ProtectedRoute ><ProfileUser /></ProtectedRoute>,
    },
    {
        path: 'user-panel/*',
        element: <LeftDrawer />,
        children: leftDrawerLinks.map(item => item),
    }
]
