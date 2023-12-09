import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./component/DefaultLayout.jsx";
import GuestLayout from "./component/GuestLayout.jsx";
import Dashboard from "./page/dashboard/dashboard.jsx";
import Login from "./page/login/login.jsx";
import NotFound from "./page/notfound/notfound.jsx";
import Signup from "./page/signup/signup.jsx";
import Users from "./page/users/users.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
