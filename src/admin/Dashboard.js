import React, { useRef, useState } from "react";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardDetail from "./DashboardDetail";
import UserManager from "./userManager/UserManager";
import BlogManager from "./blogManager/BlogManager";
import SendMail from "./sendMail/SendMail";
import CourseManager from "./courseManager/CourseManager";
import VocherManager from "./vocherManager/VocherManager";
import CreateCourse from "./courseManager/CreateCourse";
import UpdateCourse from "./courseManager/UpdateCourse";
import { useDispatch, useSelector } from "react-redux";
import { isLogOut } from "../redux/slice/auth";
import { toast } from "react-toastify";
const Dashboard = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	const searchRef = useRef();

	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);

	const handleChangeInput = (e) => {
		if (e.key === "Enter") {
			if (searchRef.current.value) {
				navigate(`?search=${searchRef.current.value}`);
			} else {
				navigate(`?`);
			}
			searchRef.current.value = "";
		}
	};

	const [scrolldown, setScrolldown] = useState(false);
	return (
		<div className="dashboard">
			<div className="dashboard_navbar">
				<div className="dashboard_title"># DASHMIN</div>
				<div className="dashboard_account">
					<div className="dashboard_account_img">
						<img src={auth.user?.image} alt="Ảnh" />
					</div>
					<div className="dashboard_account_infor">
						<h6>{auth.user?.name}</h6>
						<span>Admin</span>
					</div>
				</div>
				<div
					onClick={() => {
						navigate(`/admin/dashboard`);
					}}
					className={`dashboard_navbar_items ${
						slug === "dashboard" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "dashboard" ? "active" : ""
						}`}
					>
						<i className="fa-solid fa-gauge icons_admin"></i>
					</div>{" "}
					Dashboard
				</div>
				<div
					onClick={() => {
						navigate(`/admin/user_manager`);
					}}
					className={`dashboard_navbar_items ${
						slug === "user_manager" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "user_manager" ? "active" : ""
						}`}
					>
						<i className="fa-solid fa-users"></i>
					</div>{" "}
					User Manager
				</div>
				<div
					onClick={() => {
						navigate(`/admin/course_manager`);
					}}
					className={`dashboard_navbar_items ${
						slug === "course_manager" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "course_manager" ? "active" : ""
						}`}
					>
						<i className="fa-brands fa-discourse"></i>
					</div>{" "}
					Courses Manager
				</div>
				<div
					onClick={() => {
						navigate(`/admin/blog_manager`);
					}}
					className={`dashboard_navbar_items ${
						slug === "blog_manager" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "blog_manager" ? "active" : ""
						}`}
					>
						<i className="fa-solid fa-blog"></i>
					</div>{" "}
					Blog Manager
				</div>
				<div
					onClick={() => {
						navigate(`/admin/vocher_manager`);
					}}
					className={`dashboard_navbar_items ${
						slug === "vocher_manager" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "vocher_manager" ? "active" : ""
						}`}
					>
						<i className="fa-brands fa-adversal"></i>
					</div>{" "}
					Vocher Manager
				</div>
				<div
					onClick={() => {
						navigate(`/admin/send_mail`);
					}}
					className={`dashboard_navbar_items ${
						slug === "send_mail" ? "active" : ""
					}`}
				>
					<div
						className={`dashboard_icons_container ${
							slug === "send_mail" ? "active" : ""
						}`}
					>
						<i className="fa-solid fa-envelope"></i>
					</div>{" "}
					Send Mail
				</div>
			</div>
			<div className="dashboard_head">
				<div className="dashboard_input">
					<input
						ref={searchRef}
						onKeyDown={(e) => handleChangeInput(e)}
						type="text"
						placeholder="Searching"
					/>
				</div>
				<div className="dashboard_head_account">
					<div className="dashboard_head_img">
						<img src={auth.user?.image} alt="Ảnh" />
					</div>
					<div
						onClick={() => {
							setScrolldown(!scrolldown);
						}}
						className="dashboard_head_name"
					>
						<span>{auth.user?.name}</span>
						{!scrolldown ? (
							<i className="fa-solid fa-chevron-down"></i>
						) : (
							<i className="fa-solid fa-chevron-up"></i>
						)}
						{scrolldown && (
							<div className="dashboard_head_scrolldown">
								<Link className="dashboard_scrolldown_items" to="/">
									<div className="dashboard_scrolldown_items_detail">
										HomePage
									</div>
								</Link>
								<Link className="dashboard_scrolldown_items" to="/me/profile">
									<div className="dashboard_scrolldown_items_detail">
										My Profile
									</div>
								</Link>
								<Link
									className="dashboard_scrolldown_items"
									to="/settings/personal"
								>
									<div className="dashboard_scrolldown_items_detail">
										Setting
									</div>
								</Link>
								<div
									onClick={() => {
										toast.success("Log Out Successfully.");
										dispatch(isLogOut());
										navigate("/");
									}}
									className="dashboard_scrolldown_items_detail"
								>
									Log Out
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="dashboard_detail">
				{slug === "dashboard" && <DashboardDetail />}
				{slug === "user_manager" && <UserManager />}
				{slug === "blog_manager" && <BlogManager />}
				{slug === "send_mail" && <SendMail />}
				{slug === "vocher_manager" && <VocherManager />}
				{slug === "course_manager" && <CourseManager />}
				{slug === "create_course" && <CreateCourse />}
				{slug === "update_course" && <UpdateCourse />}
			</div>
		</div>
	);
};

export default Dashboard;
