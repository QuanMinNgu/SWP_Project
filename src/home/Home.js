import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Card from "../card/Card";
import SwiperJs from "../swiper/SwiperJs";
import "./style.scss";
const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { store } = useContext(UserContext);
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.user?.token) {
			if (store?.rule === "[ROLE_ADMIN]") {
				return navigate("/admin/dashboard");
			} else if (store?.rule === "[ROLE_SALE]") {
				return navigate("/sale/vocher_manager");
			} else if (store?.rule === "[ROLE_COURSE_EXPERT]") {
				return navigate("/course_expert/dashboard");
			}
		}
	}, [auth.user?.token]);
	return (
		<div className="home_sp">
			<div className="home_sp_slide">
				<SwiperJs />
			</div>
			<div className="home_sp_wrap">
				<div className="home_sp_list">
					<div className="home_sp_list_title">
						<h1>New Courses</h1>
					</div>
					<div className="home_sp_list_card">
						<div className="row">
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
						</div>
					</div>
					<div className="home_sp_watch">
						<Link
							className="home_sp_watch_link"
							style={{ textDecoration: "none" }}
							to="/courses/tim-kiem"
						>
							See All <i className="fa-solid fa-angle-right"></i>
						</Link>
					</div>
				</div>
				<div className="home_sp_list">
					<div className="home_sp_list_title">
						<h1>Featured Courses</h1>
					</div>
					<div className="home_sp_list_card">
						<div className="row">
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
						</div>
					</div>
					<div className="home_sp_watch">
						<Link
							className="home_sp_watch_link"
							style={{ textDecoration: "none" }}
							to="/courses/tim-kiem"
						>
							See All <i className="fa-solid fa-angle-right"></i>
						</Link>
					</div>
				</div>
				<div className="home_sp_list">
					<div className="home_sp_list_title">
						<h1>Free Courses</h1>
					</div>
					<div className="home_sp_list_card">
						<div className="row">
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
							<div className="col c-12 m-6 l-3">
								<Card />
							</div>
						</div>
					</div>
					<div className="home_sp_watch">
						<Link
							className="home_sp_watch_link"
							style={{ textDecoration: "none" }}
							to="/courses/tim-kiem"
						>
							See All <i className="fa-solid fa-angle-right"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
