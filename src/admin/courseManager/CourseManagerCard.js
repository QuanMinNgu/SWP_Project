import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../style.scss";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const CourseManagerCard = ({ checkAll, setExpert, item }) => {
	const cardRef = useRef(null);

	const [bars, setBars] = useState(false);
	const dispatch = useDispatch();

	const nagivate = useNavigate();

	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (cardRef.current) {
			if (checkAll) {
				cardRef.current.checked = true;
			} else {
				cardRef.current.checked = false;
			}
		}
	}, [checkAll]);

	const handeleDeleteCourse = async () => {
		const check = window.confirm(`Do you really wanna delete ${item?.name} ?`);
		if (check) {
			dispatch(isLoading());
			try {
				const data = await axios.post(
					`/api/course/delete/${item?.id}`,
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
	return (
		<tr className="thead_wrap_items">
			<th className="thead_title">
				<div className="thead_card_container">
					<div className="thead_img">
						<img src={item?.image} alt="Ảnh" />
					</div>
					<div className="thead_card_name">
						<div>
							<Link className="thead_card_name-link" to="/">
								{item?.name}
							</Link>
						</div>
						<span className="thead_card_price">
							<i className="">${item?.price}</i>
						</span>
					</div>
				</div>
			</th>
			<th className="thead_price">SE</th>
			<th className="thead_courseExpert">
				<div className="courseExpert_infor">
					<div className="courseExpert_infor_img">
						<img src={item?.courseExpert?.image} alt="Ảnh" />
					</div>
					<div className="courseExpert_infor_name">
						<h6>
							<Link className="courseExpert_name" to="/">
								{item?.courseExpert?.name}
							</Link>
						</h6>
						<span>ID:{item?.courseExpert?.id}</span>
					</div>
				</div>
			</th>
			<th className="thead_status noactive_status">{item?.status}</th>
			<th style={{ fontWeight: "700" }} className="thead_checkbox">
				<input ref={cardRef} id="checkall" type="checkbox" />
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
							<div className="bars_detail_items">
								<i>Cg Status</i>
							</div>
							<div
								onClick={() => {
									setExpert(true);
								}}
								className="bars_detail_items"
							>
								<i>Cg CExpert</i>
							</div>
							<div
								onClick={() => {
									nagivate(`/admin/update_course?id=${item?.id}`);
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
