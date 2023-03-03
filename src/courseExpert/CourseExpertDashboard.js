import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../admin/style.scss";
import Pagination from "../paginating/Pagination";
import CourseExpertCard from "./CourseExpertCard";
import CourseExpertUpdate from "./CourseExpertUpdate";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isLogOut, isSuccess } from "../redux/slice/auth";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import axios from "axios";
const CourseExpertDashboard = () => {
	const { slug } = useParams();

	const { cache } = useContext(UserContext);

	const navigate = useNavigate();

	const [scrolldown, setScrolldown] = useState(false);
	const [course, setCourse] = useState([]);

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const options = [
		{ value: "free", label: "Free" },
		{ value: "no-free", label: "Not Free" },
	];

	const [optionsKind, setOptionKind] = useState({});
	const [types, setTypes] = useState([]);

	useEffect(() => {
		if (types) {
			const arr = types?.map((item) => {
				return {
					value: item?.courseTypeID,
					label: item?.courseTypeName,
				};
			});
			setOptionKind([...arr]);
		}
	}, [types]);

	const optionsSort = [
		{ value: "vanilla", label: "Stars Increased" },
		{ value: "asd", label: "Stars Decreased" },
		{ value: "vaniasdlla", label: "Newest" },
		{ value: "vanilsla", label: "Oldest" },
	];
	useEffect(() => {
		let here = true;
		const url = "/api/type_course";
		if (cache.current[url]) {
			return setTypes(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return;
				}
				setTypes(res?.data?.types);
				cache.current[url] = res?.data?.types;
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
			});
		return () => {
			here = false;
		};
	}, []);

	const [updateCourse, setUpdateCourse] = useState(false);

	useEffect(() => {
		let here = true;
		const url = "/api/common/course/getAllCourse?limit=20&page=1";
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setCourse(res?.data);
				cache.current[url] = res?.data;
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error("Sorry, We get something wrong in server.");
			});
		return () => {
			here = false;
		};
	}, [updateCourse]);

	const handleLogOut = () => {
		toast.success("Logout successfully.");
		dispatch(isLogOut());
		navigate("/");
	};

	const [selectedOption, setSelectedOption] = useState(null);
	return (
		<div className="dashboard">
			<div className="dashboard_navbar">
				<div className="dashboard_title"># DASHMIN</div>
				<div className="dashboard_account">
					<div className="dashboard_account_img">
						<img src={auth.user?.image} alt="Avatar" />
					</div>
					<div className="dashboard_account_infor">
						<h6>{auth.user?.name}</h6>
						<span>Course Expert</span>
					</div>
				</div>
				<div
					onClick={() => {
						navigate(`/course_expert/dashboard`);
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
					Course Manager
				</div>
			</div>
			<div className="dashboard_head">
				<div className="dashboard_input">
					<input type="text" placeholder="Searching" />
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
									onClick={handleLogOut}
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
				{slug === "dashboard" && (
					<div className="managerCourse">
						<div className="managerCourse_navbar">
							<Select
								className="search_wrap_select"
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								options={options}
								placeholder="Price"
							/>
							<Select
								className="search_wrap_select"
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								options={optionsKind}
								placeholder="Kind"
							/>
							<Select
								className="search_wrap_select"
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								options={optionsSort}
								placeholder="Sort"
							/>
							<button>Tìm Kiếm</button>
						</div>
						<div className="manageCourse_table">
							<table className="table">
								<thead className="thead">
									<tr className="thead_wrap">
										<th style={{ fontWeight: "700" }} className="thead_title">
											Course Name & Detail
										</th>
										<th style={{ fontWeight: "700" }} className="thead_price">
											Type
										</th>
										<th
											style={{ fontWeight: "700" }}
											className="thead_courseExpert"
										>
											Course Expert
										</th>
										<th style={{ fontWeight: "700" }} className="thead_status">
											Status
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{course?.courses?.map((item, index) => (
										<CourseExpertCard
											item={item}
											key={index + "courseExpert"}
										/>
									))}
								</tbody>
							</table>
						</div>
						<div className="pagination">
							<Pagination count={course?.numPage} />
						</div>
					</div>
				)}
				{slug === "update" && <CourseExpertUpdate />}
			</div>
		</div>
	);
};

export default CourseExpertDashboard;
