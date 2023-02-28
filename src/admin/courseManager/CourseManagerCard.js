import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../style.scss";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const CourseManagerCard = ({
	checkAll,
	setExpert,
	item,
	courseSelected,
	setCourseSelected,
}) => {
	const cardRef = useRef(null);

	const [bars, setBars] = useState(false);
	const dispatch = useDispatch();

	const nagivate = useNavigate();

	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (cardRef.current) {
			if (checkAll) {
				cardRef.current.checked = true;
				const some = courseSelected?.some(
					(infor) => infor * 1 === item?.courseID
				);
				if (!some) {
					const ar = courseSelected;
					ar.push(item?.courseID);
					setCourseSelected([...ar]);
				}
			} else {
				cardRef.current.checked = false;
				const ar = courseSelected?.filter(
					(infor) => infor * 1 !== item?.courseID
				);
				setCourseSelected([...ar]);
			}
		}
	}, [checkAll]);

	const handeleDeleteCourse = async () => {
		const check = window.confirm(
			`Do you really wanna delete ${item?.courseName} ?`
		);
		if (check) {
			dispatch(isLoading());
			try {
				const data = await axios.post(
					`/api/course/delete/${item?.courseID}`,
					{
						token: auth.user?.token,
					},
					{
						headers: {
							token: auth.user?.token,
						},
					}
				);
				dispatch(isSuccess());
				toast.success(data?.data?.msg);
			} catch (er) {
				dispatch(isFailing());
				toast.error(er?.response?.data?.msg);
			}
		}
	};

	const handleChangeStatus = async () => {
		dispatch(isLoading());
		try {
			const data = await axios.post(`/api/course/change_status`, {
				status: !item?.status,
				courseID: [item?.courseID],
			});
			toast.success(data?.data?.msg);
			item.status = !item?.status;
			dispatch(isSuccess());
		} catch (err) {
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};

	const handleChangeSelect = () => {
		if (cardRef.current.checked) {
			const some = courseSelected?.some(
				(infor) => infor * 1 === item?.courseID
			);
			if (!some) {
				const ar = courseSelected;
				ar.push(item?.courseID);
				setCourseSelected([...ar]);
			}
		} else {
			const ar = courseSelected?.filter(
				(infor) => infor * 1 !== item?.courseID
			);
			setCourseSelected([...ar]);
		}
	};
	return (
		<tr className="thead_wrap_items">
			<th className="thead_title">
				<div className="thead_card_container">
					<div className="thead_img">
						<img src={item?.image} alt="Ảnh" />
					</div>
					<div className="thead_card_name">
						<div>
							<Link
								className="thead_card_name-link"
								to={`/course/${item?.courseID}`}
							>
								{item?.courseName}
							</Link>
						</div>
						<span className="thead_card_price">
							<i className="">${item?.price}</i>
						</span>
					</div>
				</div>
			</th>
			<th className="thead_type">{item?.numberOfEnroll}</th>
			<th className="thead_type">{item?.starRated}</th>
			<th className="thead_type">{item?.typeName}</th>
			<th className="thead_courseExpert">
				<div className="user_maner_infor">
					<div className="user_maner_infor_img">
						<img src={item?.courseExpert?.image} alt="Ảnh" />
					</div>
					<div className="user_maner_infor_name">
						<h6>
							<div className="user_maner_name">{item?.courseExpert?.name}</div>
						</h6>
						<i className="user_email_infor_email">
							{item?.courseExpert?.gmail}
						</i>
						<span>
							<i>ID:{item?.courseExpert?.accountID}</i>
						</span>
					</div>
				</div>
			</th>
			<th
				className={`thead_status ${
					item?.status ? "active_status" : "noactive_status"
				}`}
			>
				{item?.status ? "Active" : "Inactive"}
			</th>
			<th style={{ fontWeight: "700" }} className="thead_checkbox">
				<input
					ref={cardRef}
					onChange={(e) => handleChangeSelect(e)}
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
							<div onClick={handleChangeStatus} className="bars_detail_items">
								<i>Cg Status</i>
							</div>
							<div
								onClick={() => {
									if (item?.status) {
										toast.error(
											"Please change status to inactive to update this course."
										);
									} else {
										nagivate(`/admin/update_course?id=${item?.courseID}`);
									}
								}}
								className="bars_detail_items"
							>
								<i>Update</i>
							</div>
							<div onClick={handeleDeleteCourse} className="bars_detail_items">
								<i>Delete</i>
							</div>
						</div>
					)}
				</div>
			</th>
		</tr>
	);
};

export default CourseManagerCard;
