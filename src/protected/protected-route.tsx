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

