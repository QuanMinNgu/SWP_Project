import React, { useEffect, useState } from "react";
import "./style.scss";
import Card from "../card/Card";
import Pagination from "../paginating/Pagination";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
const Searching = () => {
	const [courses, setCourses] = useState([]);

	const options = [
		{ value: "ha-noi", label: "Hà Nội" },
		{ value: "strawberry", label: "TP Hồ Chí Minh" },
		{ value: "vanilla", label: "Vũng Tàu" },
		{ value: "vanilla", label: "Huế" },
		{ value: "vanilla", label: "Cần Thơ" },
		{ value: "vanilla", label: "Tân Xã" },
	];

	const optionsKind = [
		{ value: "ha-noi", label: "Nước Uống" },
		{ value: "strawberry", label: "Đồ Ăn Nhanh" },
		{ value: "vanilla", label: "Đồ Ăn Chậm" },
	];

	const optionsSort = [
		{ value: "ha-noi", label: "Yêu Thích Tăng" },
		{ value: "strawberry", label: "Yêu Thích Giảm" },
		{ value: "vanilla", label: "Số Sao Tăng" },
		{ value: "vanilla", label: "Số Sao Giảm" },
		{ value: "vanilla", label: "Số Người Đánh Giá Tăng" },
		{ value: "vanilla", label: "Số Người Đánh Giá Giảm" },
		{ value: "vanilla", label: "Mới Nhất" },
		{ value: "vanilla", label: "Cũ Nhất" },
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		let here = false;
		const url = `/api/common/course/get?page=1&limit=20`;
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				dispatch(isSuccess());
				console.log(res?.data?.courses);
				setCourses(res?.data?.courses);
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, []);

	const [selectedOption, setSelectedOption] = useState(null);
	return (
		<div className="searching">
			<div className="searching_title">
				<h1>Course Search</h1>
			</div>
			<div className="searching_head">
				<Select
					className="search_wrap_select"
					defaultValue={selectedOption}
					onChange={setSelectedOption}
					options={options}
					placeholder="Chọn vị trí"
				/>
				<Select
					className="search_wrap_select"
					defaultValue={selectedOption}
					onChange={setSelectedOption}
					options={optionsKind}
					placeholder="Chọn loại"
				/>
				<Select
					className="search_wrap_select"
					defaultValue={selectedOption}
					onChange={setSelectedOption}
					options={optionsSort}
					placeholder="Sắp xếp"
				/>
				<div className="button_container_searching">
					<button>Search</button>
				</div>
			</div>
			<div className="searching_card">
				<div className="row">
					{courses?.map((item) => (
						<div className="col c-12 m-6 l-3">
							<Card key={item?.courseID + "searching"} item={item} />
						</div>
					))}

					{courses?.length === 0 && (
						<i className="no_course_found">No Courses Found</i>
					)}
				</div>
			</div>
			<div className="searching_paginating">
				<Pagination />
			</div>
		</div>
	);
};

export default Searching;
