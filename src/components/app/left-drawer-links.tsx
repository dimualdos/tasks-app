import { CreateDirections, CreateJobTitle, CreateStatusTask, CreateUser, Messenger, UsersList } from "../../pages/pages-left-driwer";
import { ProtectedRoute } from "../../protected/protected-route";


export const leftDrawerLinks = [
    {
        path: 'create-user/*',
        element: <ProtectedRoute changesData={true}><CreateUser /></ProtectedRoute>,
    },
    {
        path: 'users-list/*',
        element: <ProtectedRoute changesData={true}><UsersList /></ProtectedRoute>,
    },
    {
        path: 'job-title/*',
        element: <ProtectedRoute changesData={true}><CreateJobTitle /></ProtectedRoute>,
    },
    {
        path: 'create-direction/*',
        element: <ProtectedRoute changesData={true}><CreateDirections /></ProtectedRoute>,
    },
    {
        path: 'status-task/*',
        element: <ProtectedRoute changesData={true}><CreateStatusTask /></ProtectedRoute>,
    },
    {
        path: 'messenger/*',
        element: <ProtectedRoute ><Messenger /></ProtectedRoute>,
    },

]

