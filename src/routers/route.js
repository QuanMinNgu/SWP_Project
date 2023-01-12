import Home from "../home/Home";
import DefaultLayout from "../components/detaultLayout/DefaultLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ChangePassword from "../auth/ChangePassword";
import CourseDetail from "../courses/CourseDetail";
import Blog from "../blog/Blog";
import CourseLearn from "../courseLearn/CourseLearn";
import BlogDetail from "../blog/BlogDetail";
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
        element: Blog,
        path: "/blog",
        layout: DefaultLayout,
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
    {
        element: CourseLearn,
        path: "/learning/:slug",
    },
    {
        element: CourseDetail,
        path: "/course/:slug",
        layout: DefaultLayout,
    },
    ,
    {
        element: BlogDetail,
        path: "/blog/:slug",
        layout: DefaultLayout,
    },
];
export const privateRouter = [];
