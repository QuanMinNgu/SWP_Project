import Home from "../home/Home";
import DefaultLayout from "../components/detaultLayout/DefaultLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ChangePassword from "../auth/ChangePassword";
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
    {
        element: ForgotPassword,
        path: "/forgot_password",
    },
    {
        element: ChangePassword,
        path: "/change_password",
    },
];
export const privateRouter = [];
