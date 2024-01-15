import { CreateDirections, CreateJobTitle, CreateUser, Messenger, UsersList } from "../../pages/pages-left-driwer";
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
        path: 'create-direction/*',
        element: <ProtectedRoute ><CreateDirections /></ProtectedRoute>,
    },

    {
        path: 'messenger/*',
        element: <ProtectedRoute ><Messenger /></ProtectedRoute>,
    },
    {
        path: 'job-title/*',
        element: <ProtectedRoute ><CreateJobTitle /></ProtectedRoute>,
    }
]

