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
import Profile from "../user/Profile";
import BlogWrite from "../blog/BlogWrite";
import Setup from "../setup/Setup";
import Searching from "../searching/Searching";
import UserBlog from "../user/userblog/UserBlog";
import MarkBlog from "../user/markblog/MarkBlogs";
export const publicRouter = [
  {
    element: Home,
    path: "/",
    layout: DefaultLayout,
    type: "Home",
  },
  {
    element: Login,
    path: "/login",
  },
  {
    element: Profile,
    path: "/me/profile",
    layout: DefaultLayout,
    type: "Home",
  },
  {
    element: Searching,
    path: "/courses/tim-kiem",
    layout: DefaultLayout,
    type: "Learning",
  },
  {
    element: BlogWrite,
    path: "/me/new-post",
    layout: DefaultLayout,
    type: "Blog",
  },
  {
    element: Setup,
    path: "/settings/:slug",
    layout: DefaultLayout,
    type: "Home",
  },
  {
    element: Blog,
    path: "/blog",
    layout: DefaultLayout,
    type: "Blog",
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
    type: "Learning",
  },
  ,
  {
    element: BlogDetail,
    path: "/blog/:slug",
    layout: DefaultLayout,
    type: "Blog",
  },
  {
    element: UserBlog,
    path: "/me/blog",
    layout: DefaultLayout,
  },
  {
    element: MarkBlog,
    path: "/me/markblog",
    layout: DefaultLayout,
  },
];
export const privateRouter = [];
