import * as React from "react";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { useAuth } from "../hooks/hooks";
import { AuthProvider } from "../provider/auth-provider";
import { LoginPage } from "../pages";

export const App = () => {
    return (
        <AuthProvider>
            <h1>Auth Example</h1>

            <p>
                This example demonstrates a simple login flow with three pages: a public
                page, a protected page, and a login page. In order to see the protected
                page, you must first login. Pretty standard stuff.
            </p>

            <p>
                First, visit the public page. Then, visit the protected page. You're not
                yet logged in, so you are redirected to the login page. After you login,
                you are redirected back to the protected page.
            </p>

            <p>
                Notice the URL change each time. If you click the back button at this
                point, would you expect to go back to the login page? No! You're already
                logged in. Try it out, and you'll see you go back to the page you
                visited just *before* logging in, the public page.
            </p>

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<PublicPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/protected"
                        element={
                            <RequireAuth>
                                <ProtectedPage />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

function Layout() {
    return (
        <div>
            <AuthStatus />

            <ul>
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}



function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            {/* Welcome {auth.user}!{" "} */}
            <button
                onClick={() => {
                    auth.logout();
                }}
            >
                Sign out
            </button>
        </p>
    );
}

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}



function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}

