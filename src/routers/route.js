import Home from "../home/Home";
import DefaultLayout from "../components/detaultLayout/DefaultLayout";
export const publicRouter = [
    {
        element: Home,
        path: "/",
        layout: DefaultLayout,
    },
];
export const privateRouter = [];
