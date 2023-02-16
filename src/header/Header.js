import React, { useContext, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import CourseHeadCard from "../card/CourseHeadCard";
import AnnouceCard from "../card/AnnouceCard";
import { useDispatch, useSelector } from "react-redux";
import HeaderMobile from "./HeaderMobile";
import { UserContext } from "../App";
import { isLogOut } from "../redux/slice/auth";
import { toast } from "react-toastify";
const Header = () => {
	const [course, setCourse] = useState(false);
	const [annouce, setAnnouce] = useState(false);
	const [account, setAccount] = useState(false);

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const { store } = useContext(UserContext);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
			}}
			className="header"
		>
			<div className="header_brand">
				<HeaderMobile />
				<Link className="header_brand_link" to="/">
					<img
						src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png"
						alt="brand"
					/>
				</Link>
				<span className="header_brand_title">Học lập trình để đi làm</span>
			</div>
			<div className="header_search">
				<div className="header_search_container">
					<div className="header_search_icons">
						<i className="fa-solid fa-magnifying-glass"></i>
					</div>
					<input type="text" placeholder="Tìm kiếm khóa học..." />
				</div>
			</div>
			{auth.user?.token ? (
				<div className="header_navbar">
					<div className="header_navbar_items">
						<span className="header_navbar_items_title">
							<button
								onClick={() => {
									setCourse(!course);
									setAnnouce(false);
									setAccount(false);
								}}
							>
								Khóa học của tôi
							</button>
							{course && (
								<div className="header_navbar_items_course">
									<div className="header_navbar_items_course_title">
										<h5>Khóa học của tôi</h5>
									</div>
									<div className="header_navbar_items_course_card">
										<CourseHeadCard />
									</div>
								</div>
							)}
						</span>
					</div>
					<div className="header_navbar_items header_navbar_items_bell">
						<i
							onClick={() => {
								setAnnouce(!annouce);
								setCourse(false);
								setAccount(false);
							}}
							className="fa-solid fa-bell"
						></i>
						{annouce && (
							<div className="header_navbar_items_bell_noti">
								<div className="header_navbar_items_bell_noti_title">
									<h6>Thông Báo</h6>
									<div>
										<i className="fa-solid fa-ellipsis"></i>
									</div>
								</div>
								<div className="header_navbar_items_bell_noti_card">
									<AnnouceCard />
									<AnnouceCard />
								</div>
							</div>
						)}
					</div>
					<div className="header_navbar_items">
						<div className="header_navbar_items_img_wrap">
							<img
								onClick={() => {
									setAccount(!account);
									setAnnouce(false);
									setCourse(false);
								}}
								className="header_navbar_items_img"
								src={auth.user?.image}
								alt="Ảnh"
							/>
							{account && (
								<div className="header_navbar_account">
									<div className="header_navbar_account_infor">
										<div className="header_navbar_account_infor_img">
											<img src={auth.user?.image} alt="Ảnh bìa" />
										</div>
										<div className="header_navbar_account_infor_name">
											<div>{auth.user?.name}</div>
											<div>
												<i>ID:{auth.user?.id}</i>
											</div>
										</div>
									</div>
									{store?.rule === "ROLE_ADMIN" && (
										<Link
											style={{ textDecoration: "none" }}
											to="/admin/dashboard"
										>
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items"
											>
												Dashboard
											</div>
										</Link>
									)}
									{store?.rule === "ROLE_SALE" && (
										<Link
											style={{ textDecoration: "none" }}
											to="/sale/vocher_manager"
										>
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items"
											>
												Dashboard
											</div>
										</Link>
									)}
									{store?.rule === "ROLE_COURSE_EXPERT" && (
										<Link
											style={{ textDecoration: "none" }}
											to="/course_expert/dashboard"
										>
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items"
											>
												Dashboard
											</div>
										</Link>
									)}
									<Link style={{ textDecoration: "none" }} to="/me/profile">
										<div
											onClick={() => {
												setAccount(false);
											}}
											className="header_navbar_account_items"
										>
											Trang cá nhân
										</div>
									</Link>
									<div className="header_navbar_account_items">
										<Link style={{ textDecoration: "none" }} to="/me/new-post">
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items_link"
											>
												Viết blog
											</div>
										</Link>
										<Link style={{ textDecoration: "none" }} to="/me/blog">
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items_link no_bottom"
											>
												Bài viết của tôi
											</div>
										</Link>
									</div>
									<Link style={{ textDecoration: "none" }} to="/me/markblog">
										<div
											onClick={() => {
												setAccount(false);
											}}
											className="header_navbar_account_items"
										>
											Bài viết đã lưu
										</div>
									</Link>
									<div className="header_navbar_account_items">
										<Link
											style={{ textDecoration: "none" }}
											to="/settings/personal"
										>
											<div
												onClick={() => {
													setAccount(false);
												}}
												className="header_navbar_account_items_link"
											>
												Cài đặt
											</div>
										</Link>
										<Link style={{ textDecoration: "none" }} to="/">
											<div
												onClick={() => {
													toast.success("Log out successfully.");
													dispatch(isLogOut());
												}}
												className="header_navbar_account_items_link no_bottom"
											>
												Đăng xuất
											</div>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="header_navbar">
					<Link style={{ textDecoration: "none" }} to="/login">
						<div className="header_navbar_button">Đăng Nhập</div>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
