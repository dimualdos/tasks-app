import { CreateDirections, CreateUser, Messenger, UsersList } from "../../pages/pages-left-driwer";
import { ProtectedRoute } from "../../protected/protected-route";


export const leftDrawerLinks = [
    {
        path: 'create-user/*',
        element: <ProtectedRoute ><CreateUser /></ProtectedRoute>,
    },

    {
        path: 'create-direction/*',
        element: <ProtectedRoute ><CreateDirections /></ProtectedRoute>,
    },
    {
        path: 'users-list/*',
        element: <ProtectedRoute ><UsersList /></ProtectedRoute>,
    },
    {
        path: 'messenger/*',
        element: <ProtectedRoute ><Messenger /></ProtectedRoute>,
    }
]

