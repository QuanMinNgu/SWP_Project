import Home from "../home/Home";
import DefaultLayout from "../components/detaultLayout/DefaultLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
export const publicRouter = [
    {
        element: Home,
        path: "/",
        layout: DefaultLayout,
    },
    {
        element: Login,
        path: "/login",
    },
    {
        element: Register,
        path: "/register",
    },
];
export const privateRouter = [];
