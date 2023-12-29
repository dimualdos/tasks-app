import * as React from "react";
import {
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/hooks";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../utils/fire-base";
// export const RequireAuth = ({ children }: { children: JSX.Element }) => {
//     let auth = useAuth();
//     let location = useLocation();

//     if (!auth.user) {
//         // Redirect them to the /login page, but save the current location they were
//         // trying to go to when they were redirected. This allows us to send them
//         // along to that page after they login, which is a nicer user experience
//         // than dropping them off on the home page.
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     return children;
// }

type TProtectedRoute = {
    onlyUnAuth?: boolean;
    children: any;
    rest?: string;
    path?: string;
}


export const ProtectedRoute: React.FC<TProtectedRoute> = ({ onlyUnAuth = false, children, ...rest }) => {
    const location = useLocation();
    const [user] = useAuthState(auth);
    const { userBaseData } = useAuth();

    if (onlyUnAuth && user) {
        const { from }: any = location.state || { from: { pathname: '/' } };
        return (
            <Routes {...rest}>
                <Route path="/" element={<Navigate to={from} />} />
            </Routes>
        )
    };

    if (!onlyUnAuth && !user) {

        return (
            <Routes {...rest}>
                <Route path="/" element={<Navigate to={'/login'} state={{ from: location }} replace />} />
            </Routes>
        );
    }

    return (
        <Routes {...rest}>
            <Route path="/" element={children} />

        </Routes>
    )
}

