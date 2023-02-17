import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import Card from "../card/Card";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import SwiperJs from "../swiper/SwiperJs";
import "./style.scss";
const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { store, cache } = useContext(UserContext);
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const [courses, setCourses] = useState({});
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (auth.user?.token) {
	// 		if (store?.rule === "[ROLE_ADMIN]") {
	// 			return navigate("/admin/dashboard");
	// 		} else if (store?.rule === "[ROLE_SALE]") {
	// 			return navigate("/sale/vocher_manager");
	// 		} else if (store?.rule === "[ROLE_COURSE_EXPERT]") {
	// 			return navigate("/course_expert/dashboard");
	// 		}
	// 	}
	// }, [store?.rule]);

	useEffect(() => {
		let here = true;
		const url = "/api/home";
		if (cache.current[url]) {
			return setCourses(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setCourses(res?.data);
				cache.current[url] = res?.data;
				console.log(res?.data);
				dispatch(isSuccess());
			})
			.catch((err) => {
				if (!here) {
					return dispatch(isFailing());
				}
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, []);

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
