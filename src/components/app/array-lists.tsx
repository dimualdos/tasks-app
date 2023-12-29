import { BoardTasks, TasksList, AddTask, LoginPage, AdminPage, ProfileUser } from "../../pages";
import { ProtectedRoute } from "../../protected/protected-route";
import { TasksDetail } from "../tasks-detail/tasks-detail";

export const pageLists = [
    {
        path: '/',
        element: <ProtectedRoute path="/"><AdminPage /></ProtectedRoute>,
    },

    {
        path: 'board-tasks/*',
        element: <ProtectedRoute path="board-tasks"><BoardTasks /></ProtectedRoute>,
    },

    {
        path: 'list-tasks/*',
        element: <ProtectedRoute path="list-tasks"><TasksList /></ProtectedRoute>,
    },
    {
        path: 'add-task/*',
        element: <ProtectedRoute path="add-task"><AddTask /></ProtectedRoute>,
    },
    {
        path: '/tasks-number/:id/*',
        element: <ProtectedRoute path="/tasks-number/:id"><TasksDetail /></ProtectedRoute>,
    },
    {
        path: 'login/*',
        element: <ProtectedRoute path="/login" onlyUnAuth={true}><LoginPage /></ProtectedRoute>,
    },
    {
        path: 'profile/*',
        element: <ProtectedRoute path="profile"><ProfileUser /></ProtectedRoute>,
    }
]
