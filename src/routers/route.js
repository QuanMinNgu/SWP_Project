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
import Dashboard from "../admin/Dashboard";
import PrivateLayout from "../components/privateLayout/PrivateLayout";
import SaleDashboard from "../saler/SaleDashboard";
import CourseExpertDashboard from "../courseExpert/CourseExpertDashboard";
import ViewPdf from "../viewPdf/ViewPdf";
import ActiveAccount from "../auth/ActiveAccount";
import Voucher from "../voucher/Voucher";
import UpdateBlog from "../user/userblog/UpdateBlog";
import UserProfile from "../profile/UserProfile";
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
    element: ViewPdf,
    path: "/bdfview",
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
    element: ActiveAccount,
    path: "/account/active/:slug",
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
    path: "/learning/:courseid/:lessonid",
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
  {
    element: UpdateBlog,
    path: "/me/blog/:slug",
    layout: DefaultLayout,
  },
  {
    element: UserProfile,
    path: "/profile/:slug",
    layout: DefaultLayout,
  },
];
export const adminRouter = [
  {
    element: Dashboard,
    path: "/admin/:slug",
  },
];

export const saleRouter = [
  {
    element: SaleDashboard,
    path: "/sale/:slug",
  },
];

export const courseExpertRouter = [
  {
    element: CourseExpertDashboard,
    path: "/course_expert/:slug",
  },
];
