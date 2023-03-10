import React, { useContext, useEffect, useRef, useState } from "react";
import "../style.scss";
import Select from "react-select";
import CourseManagerCard from "./CourseManagerCard";
import Pagination from "../../paginating/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
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

	const [courseSelected, setCourseSelected] = useState([]);

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

	const [optionsKind, setOptionKind] = useState({});

	const options = [
		{ value: "", label: "All" },
		{ value: "free", label: "Free" },
		{ value: "no-free", label: "Not Free" },
	];

	const optionsSort = [
		{ value: "", label: "All" },
		{ value: "astar", label: "Stars Increased" },
		{ value: "dstar", label: "Stars Decreased" },
		{ value: "dcreatedAt", label: "Newest" },
		{ value: "acreatedAt", label: "Oldest" },
	];

	const handleChangeInput = () => {
		if (checkRef.current?.checked) {
			setCheckAll(true);
		} else {
			setCheckAll(false);
			setCourseSelected([]);
		}
	};
	useEffect(() => {
		if (types) {
			const arr = types?.map((item) => {
				return {
					value: item?.courseTypeID,
					label: item?.courseTypeName,
				};
			});
			arr.unshift({
				value: "",
				label: "No sort",
			});
			setOptionKind([...arr]);
		}
	}, [types]);

	const [updateCourse, setUpdateCourse] = useState(false);
	const [numPage, setNumPage] = useState(1);

	const { search } = useLocation();

	useEffect(() => {
		let here = true;
		const sort = new URLSearchParams(search).get("sort") || null;
		const type = new URLSearchParams(search).get("type") || null;
		const kind = new URLSearchParams(search).get("kind") || null;
		const page = new URLSearchParams(search).get("page") || 1;
		const searching = new URLSearchParams(search).get("search") || null;
		const sortSearch = {
			sort: sort,
			type: type,
			kind: kind,
			page: page,
			limit: 20,
			search: searching,
		};
		const sortSearching = new URLSearchParams(sortSearch).toString();
		const url = `/api/common/course/getAllCourse?${sortSearching}`;
		console.log(url);
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
				setCourse(res?.data?.courses);
				setNumPage(res?.data?.numPage);
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
	}, [updateCourse, search]);

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

	const [courseExperts, setCourseExperts] = useState([]);

	useEffect(() => {
		let here = true;
		const url = "/api/account/course_expert";
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setCourseExperts(res?.data?.users);
				cache.current[url] = res?.data?.users;
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
			});
	}, []);

	const handleCreateNewType = async () => {
		if (!titleRef.current.value) {
			return toast.error("Please,enter value.");
		}
		dispatch(isLoading());
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
			setUpdate(!update);
			titleRef.current.value = "";
		} catch (err) {
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};

	const handleChangeStatus = async (e) => {
		dispatch(isLoading());
		try {
			const data = await axios.post(`/api/course/change_status`, {
				status: e,
				courseID: courseSelected,
			});
			toast.success(data?.data?.msg);
			dispatch(isSuccess());
			setUpdateCourse(!updateCourse);
		} catch (err) {
			dispatch(isFailing());
			if (err?.response?.data?.msgProgress) {
				err?.response?.data?.msgProgress?.forEach((item) => {
					toast.error(item);
				});
			}
			return toast.error(err?.response?.data?.msg);
		}
	};

	const [updatePagePart, setUpdatePagePart] = useState(false);

	const handleSearching = () => {
		const searchingU = new URLSearchParams(search).get("search") || "";
		const searching = {
			kind: selectedOptionKind?.value,
			type: selectedOptionType?.value,
			sort: selectedOptionSort?.value,
			search: searchingU,
		};

		const excludedFields = ["kind", "type", "sort", "search"];
		excludedFields.forEach((item) => {
			if (!searching[item]) {
				delete searching[item];
			}
		});
		searching.page = 1;
		const searchingUrl = new URLSearchParams(searching).toString();
		navigate("?" + searchingUrl);
		setUpdatePagePart(!updatePagePart);
	};

	const [selectedOptionKind, setSelectedOptionKind] = useState(null);
	const [selectedOptionType, setSelectedOptionType] = useState(null);
	const [selectedOptionSort, setSelectedOptionSort] = useState(null);
	return (
		<div className="managerCourse">
			<div className="managerCourse_navbar">
				<Select
					className="search_wrap_select"
					defaultValue={selectedOptionKind}
					onChange={setSelectedOptionKind}
					options={options}
					placeholder="Kind"
				/>
				<Select
					className="search_wrap_select"
					defaultValue={selectedOptionType}
					onChange={setSelectedOptionType}
					options={optionsKind}
					placeholder="Type"
				/>
				<Select
					className="search_wrap_select"
					defaultValue={selectedOptionSort}
					onChange={setSelectedOptionSort}
					options={optionsSort}
					placeholder="Sort"
				/>
				<button onClick={handleSearching}>Seach</button>
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
							<th style={{ fontWeight: "700" }} className="thead_type">
								Enrolling
							</th>
							<th style={{ fontWeight: "700" }} className="thead_type">
								Stars Rate
							</th>
							<th style={{ fontWeight: "700" }} className="thead_type">
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
								<div
									onClick={() => {
										setBars(!bars);
									}}
									className="thead_bars_icons"
								>
									<i className="fa-solid fa-ellipsis"></i>
									{bars && (
										<div className="bars_detail">
											<div
												onClick={() => handleChangeStatus(false)}
												className="bars_detail_items"
											>
												<i>Cg Inactive</i>
											</div>
											<div
												onClick={() => handleChangeStatus(true)}
												className="bars_detail_items"
											>
												<i>Cg Active</i>
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
								key={item?.courseID + "couseMap"}
								item={item}
								checkAll={checkAll}
								setExpert={setExpert}
								courseSelected={courseSelected}
								setCourseSelected={setCourseSelected}
								setUpdateCourse={setUpdateCourse}
								updateCourse={updateCourse}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="pagination">
				<Pagination count={numPage} updatePagePart={updatePagePart} />
			</div>

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
