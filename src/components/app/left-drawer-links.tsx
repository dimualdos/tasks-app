import { CreateDirections, CreateJobTitle, CreateStatusTask, CreateUser, Messenger, UsersList } from "../../pages/pages-left-driwer";
import { ProtectedRoute } from "../../protected/protected-route";


export const leftDrawerLinks = [
    {
        path: 'create-user/*',
        element: <ProtectedRoute ><CreateUser /></ProtectedRoute>,
    },
    {
        path: 'users-list/*',
        element: <ProtectedRoute ><UsersList /></ProtectedRoute>,
    },
    {
        path: 'job-title/*',
        element: <ProtectedRoute ><CreateJobTitle /></ProtectedRoute>,
    },
    {
        path: 'create-direction/*',
        element: <ProtectedRoute ><CreateDirections /></ProtectedRoute>,
    },
    {
        path: 'status-task/*',
        element: <ProtectedRoute ><CreateStatusTask /></ProtectedRoute>,
    },
    {
        path: 'messenger/*',
        element: <ProtectedRoute ><Messenger /></ProtectedRoute>,
    },

]

