import * as React from "react";
import {
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../utils/fire-base";
import { useProfile } from "../hooks";
import { IProfile } from "../utils/types";


type TProtectedRoute = {
    onlyUnAuth?: boolean;
    children: any;
    rest?: string;
    path?: string;
    changesData?: boolean;
}


export const ProtectedRoute: React.FC<TProtectedRoute> = ({ onlyUnAuth = false, changesData = false, children, ...rest }) => {
    const location = useLocation();
    const [user] = useAuthState(auth);
    const { profile } = useProfile();

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
    if (changesData && profile.changes === false) {
        const { from }: any = location.state || { from: { pathname: '/user-panel' } };

        return (
            <Routes {...rest}>
                <Route path="/" element={<Navigate to={from} />} />
            </Routes>
        );
    }

    return (
        <Routes {...rest}>
            <Route path="/" element={children} />

        </Routes>
    )
}

