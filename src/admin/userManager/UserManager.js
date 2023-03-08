import React, { useContext, useEffect, useState } from "react";
import "../style.scss";
import Select from "react-select";
import Pagination from "../../paginating/Pagination";
import UserManagerCard from "./UserManagerCard";
import { UserContext } from "../../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const UserManager = () => {
	const { search } = useLocation();

	const optionsKind = [
		{
			value: "",
			label: "All",
		},
		{
			value: "ROLE_COURSE_EXPERT",
			label: "Course Expert",
		},
		{
			value: "ROLE_SALE",
			label: "Sale",
		},
		{
			value: "ROLE_ADMIN",
			label: "Admin",
		},
		{
			value: "ROLE_USER",
			label: "User",
		},
	];

	const optionsSort = [
		{ value: "", label: "All" },
		{ value: "astar", label: "Stars Increased" },
		{ value: "dstar", label: "Stars Decreased" },
		{ value: "dcreatedAt", label: "Newest" },
		{ value: "acreatedAt", label: "Oldest" },
	];

	const auth = useSelector((state) => state.auth);
	const { cache } = useContext(UserContext);

	const [users, setUsers] = useState([]);
	const dispatch = useDispatch();
	const [types, setTypes] = useState([]);

	const navigate = useNavigate();

	const [updatePagePart, setUpdatePagePart] = useState(false);

	const [userUpdate, setUserUpdate] = useState(false);

	useEffect(() => {
		let here = true;
		const url = "/api/type_course";
		if (cache.current[url]) {
			return setTypes(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
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

	useEffect(() => {
		let here = true;
		const sort = new URLSearchParams(search).get("sort") || "";
		const role = new URLSearchParams(search).get("role") || "";
		const searchingU = new URLSearchParams(search).get("search") || "";
		const page = new URLSearchParams(search).get("page") || 1;
		const sortSearch = {
			sort: sort,
			role: role,
			page: page,
			limit: 20,
			search: searchingU,
		};
		const excludedFields = ["role", "sort", "search"];
		excludedFields.forEach((item) => {
			if (!sortSearch[item]) {
				delete sortSearch[item];
			}
		});
		const sortSearching = new URLSearchParams(sortSearch).toString();
		const url = `/api/account?${sortSearching}`;
		console.log(url);
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: `${auth.user?.token}`,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setUsers(res?.data);
				cache.current[url] = res?.data;
				dispatch(isSuccess());
			})
			.catch((err) => {
				if (here) {
					toast.error(err?.response?.data?.msg);
				}
				dispatch(isFailing());
			});
		return () => {
			here = false;
		};
	}, [userUpdate, search]);

	const handleSearching = () => {
		const searchingU = new URLSearchParams(search).get("search") || "";
		const searching = {
			role: selectedOptionRole?.value,
			sort: selectedOptionSort?.value,
			search: searchingU,
		};

		const excludedFields = ["sort", "role", "search"];
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

	const [selectedOptionRole, setSelectedOptionRole] = useState(null);
	const [selectedOptionSort, setSelectedOptionSort] = useState(null);
	return (
		<div className="managerCourse">
			<div className="managerCourse_navbar">
				<Select
					className="search_wrap_select"
					defaultValue={selectedOptionRole}
					onChange={setSelectedOptionRole}
					options={optionsKind}
					placeholder="Role"
				/>
				<Select
					className="search_wrap_select"
					defaultValue={selectedOptionSort}
					onChange={setSelectedOptionSort}
					options={optionsSort}
					placeholder="Sort"
				/>
				<button onClick={handleSearching}>Search</button>
			</div>
			<div className="manageCourse_table">
				<table className="s_table">
					<thead className="s_thead">
						<tr className="s_trow">
							<th className="u_tstt">STT</th>
							<th className="u_tuser">User</th>
							<th className="u_trule">Role</th>
							<th className="u_tbars"></th>
						</tr>
					</thead>
					<tbody>
						{users?.users?.map((item, index) => (
							<UserManagerCard
								index={index}
								userUpdate={userUpdate}
								setUserUpdate={setUserUpdate}
								key={item?.gmail}
								item={item}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="pagination">
				<Pagination count={users?.numPage} updatePagePart={updatePagePart} />
			</div>
		</div>
	);
};

export default UserManager;
