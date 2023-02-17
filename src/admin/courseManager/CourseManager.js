import React, { useContext, useEffect, useRef, useState } from "react";
import "../style.scss";
import Select from "react-select";
import CourseManagerCard from "./CourseManagerCard";
import Pagination from "../../paginating/Pagination";
import { useNavigate } from "react-router-dom";
import TypeCourseCard from "./TypeCourseCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { UserContext } from "../../App";
const CourseManager = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { cache } = useContext(UserContext);

	const [courses, setCourse] = useState([]);

	const [update, setUpdate] = useState(false);

	const [types, setTypes] = useState([]);

	const auth = useSelector((state) => state.auth);

	const [checkAll, setCheckAll] = useState(false);
	const [create, setCreate] = useState(false);
	const titleRef = useRef();
	const [bars, setBars] = useState(false);

	const [expert, setExpert] = useState(false);
	const [typeCourse, setTypeCourse] = useState(false);
	const checkRef = useRef();
	const options = [
		{ value: "free", label: "Free" },
		{ value: "no-free", label: "Not Free" },
	];

	const optionsKind = [
		{ value: "ha-noi", label: "Software" },
		{ value: "strawberry", label: "Financial" },
		{ value: "vanilla", label: "Marketing" },
	];

	const optionsSort = [
		{ value: "vanilla", label: "Stars Increased" },
		{ value: "asd", label: "Stars Decreased" },
		{ value: "vaniasdlla", label: "Newest" },
		{ value: "vanilsla", label: "Oldest" },
	];

	const handleChangeInput = () => {
		if (checkRef.current?.checked) {
			setCheckAll(true);
		} else {
			setCheckAll(false);
		}
	};

	useEffect(() => {
		let here = true;
		const url = "/api/course/tim-kiem?limit=20";
		if (cache.current[url]) {
			return setCourse(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setCourse(res?.data?.courses);
				cache.current[url] = res?.data?.courses;
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error("Sorry, We get something wrong in server.");
			});
		return () => {
			here = false;
		};
	}, []);
	useEffect(() => {
		let here = true;
		const url = "/api/type_course";
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
	}, [update]);

	const handleChooseExpert = async (e) => {
		const check = window.confirm(
			"Bạn có muốn chọn Minh Quang thành course expert của khóa học này không?"
		);
		if (check) {
			// try {
			//     const data = await axios.post(`/api/course/change_course_expert/${e?.id}`,{
			//     })
			// } catch (err) {
			// 	return toast.error(err?.response?.data?.msg);
			// }
		}
	};

	const handleCreateNewType = async () => {
		if (!titleRef.current.value) {
			return toast.error("Please,enter value.");
		}
		dispatch(isLoading());
		console.log({
			token: auth.user?.token,
			courseTypeName: titleRef.current.value,
		});
		try {
			const data = await axios.post(
				"/api/type_course/create",
				{
					courseTypeName: titleRef.current.value,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			setTypes(data?.data?.types);
			toast.success(data?.data?.msg);
			console.log(data?.data?.types);
			setUpdate(!update);
			titleRef.current.value = "";
		} catch (err) {
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};

	const [selectedOption, setSelectedOption] = useState(null);
	return (
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
			<div className="createButton">
				<button
					onClick={() => {
						navigate("/admin/create_course");
					}}
				>
					Create New Course
				</button>
				<button
					onClick={() => {
						setTypeCourse(true);
					}}
					style={{ marginLeft: "1rem" }}
					className="button"
				>
					Types Course Manager
				</button>
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
							<th style={{ fontWeight: "700" }} className="thead_courseExpert">
								Course Expert
							</th>
							<th style={{ fontWeight: "700" }} className="thead_status">
								Status
							</th>
							<th style={{ fontWeight: "700" }} className="thead_checkbox">
								<label htmlFor="checkall">All</label>
								<input
									onChange={() => {
										handleChangeInput();
									}}
									ref={checkRef}
									id="checkall"
									type="checkbox"
								/>
							</th>
							<th className="thead_bars">
								<div className="thead_bars_icons">
									<i
										onClick={() => {
											setBars(!bars);
										}}
										className="fa-solid fa-ellipsis"
									></i>
									{bars && (
										<div className="bars_detail">
											<div className="bars_detail_items">
												<i>Cg Inactive</i>
											</div>
											<div className="bars_detail_items">
												<i>Cg Active</i>
											</div>
											<div
												onClick={() => {
													setExpert(true);
													setBars(false);
												}}
												className="bars_detail_items"
											>
												<i>Cg CExpert</i>
											</div>
											<div className="bars_detail_items">
												<i>Delete</i>
											</div>
										</div>
									)}
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{courses?.map((item) => (
							<CourseManagerCard
								key={item?.id}
								item={item}
								checkAll={checkAll}
								setExpert={setExpert}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="pagination">
				<Pagination />
			</div>
			{expert && (
				<div
					onClick={() => {
						setExpert(false);
					}}
					className="user_manager_information"
				></div>
			)}
			{expert && (
				<div className="expertCourse_container">
					<div className="expertCourse_close">
						<div
							onClick={() => {
								setExpert(false);
							}}
							className="expertCourse_close_icons"
						>
							&times;
						</div>
					</div>
					<div className="expertCourse_searching">
						<input type="text" placeholder="Searching by id, name or email" />
						<button className="button">Search</button>
					</div>
					<div className="expertCourse_form">
						<table className="ex_table">
							<thead className="ex_thead">
								<tr className="ex_thead_wrap">
									<th className="ex_thead_title">User</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button>Choose</button>
									</th>
								</tr>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button onClick={handleChooseExpert}>Choose</button>
									</th>
								</tr>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button>Choose</button>
									</th>
								</tr>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button>Choose</button>
									</th>
								</tr>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button>Choose</button>
									</th>
								</tr>
								<tr className="ex_thead_wrap_items">
									<th className="ex_thead_title">
										<div className="ex_thead_user">
											<div className="ex_thead_user_img">
												<img
													src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
													alt="Ảnh"
												/>
											</div>
											<div className="ex_thead_user_infor">
												<div className="ex_thead_user_infor_name">
													Minh Quang
												</div>
												<i className="ex_thead_user_infor_email">
													quangminhnguyen265@gmail.com
												</i>
												<i className="ex_thead_user_infor_id">ID:1231232</i>
											</div>
										</div>
									</th>
									<th className="ex_thead_button">
										<button>Choose</button>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)}
			{typeCourse && (
				<div
					onClick={() => {
						setTypeCourse(false);
					}}
					className="user_manager_information"
				></div>
			)}
			{typeCourse && (
				<div className="type_course_manager">
					<div className="expertCourse_close">
						<div
							onClick={() => {
								setTypeCourse(false);
							}}
							className="expertCourse_close_icons"
						>
							&times;
						</div>
					</div>
					<div className="expertCourse_type_title">Types of Course Manager</div>
					<div className="expertCourse_type_button">
						<button
							onClick={() => {
								setCreate(true);
							}}
							style={{ height: "4rem" }}
							className="button"
						>
							Create new type
						</button>
					</div>
					<div className="expertCourse_type_course_remain">
						<div className="expertCourse_type_Card_container">
							{types?.map((item) => (
								<TypeCourseCard
									key={item?.id}
									item={item}
									update={update}
									setUpdate={setUpdate}
								/>
							))}
						</div>
					</div>
					{create && (
						<div className="edit_type_course">
							<div className="edit_type_course_form">
								<div className="expertCourse_close">
									<div
										onClick={() => {
											setCreate(false);
										}}
										style={{ color: "black" }}
										className="expertCourse_close_icons"
									>
										&times;
									</div>
								</div>
								<textarea
									ref={titleRef}
									className="textArea_type"
									type="text"
									placeholder="Enter title of new type"
								/>
								<div className="button_type_container">
									<button
										onClick={handleCreateNewType}
										style={{ height: "4rem" }}
										className="button"
									>
										Create New Type
									</button>
									<button
										onClick={() => {
											setCreate(false);
										}}
										style={{
											height: "4rem",
											marginLeft: "0.5rem",
										}}
										className="button button_cancel"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CourseManager;
