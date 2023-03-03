import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseExpertCard = ({ item }) => {
	const [bars, setBars] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(item);
	}, [item]);
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
								{item?.courseName}
							</Link>
						</div>
						<span className="thead_card_price">
							<i className="">${item?.price}</i>
						</span>
					</div>
				</div>
			</th>
			<th className="thead_price">{item?.typeName}</th>
			<th className="thead_courseExpert">
				<div className="courseExpert_infor">
					<div className="courseExpert_infor_img">
						<img src={item?.courseExpert?.image} alt="Ảnh" />
					</div>
					<div className="courseExpert_infor_name">
						<h6>
							<Link className="courseExpert_name" to="?">
								{item?.courseExpert?.name}
							</Link>
						</h6>
						<span>ID:{item?.courseExpert?.accountID}</span>
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
			<th className="thead_bars">
				<div
					onClick={() => {
						setBars(!bars);
					}}
					className="thead_bars_icons"
				>
					<i className="fa-solid fa-ellipsis"></i>
					{bars && (
						<div className="vc_bars_detail">
							<div
								onClick={() => {
									navigate(`/course_expert/update?id=${item?.courseID}`);
								}}
								className="vc_bars_detail_items"
							>
								<i>Update</i>
							</div>
						</div>
					)}
				</div>
			</th>
		</tr>
	);
};

export default CourseExpertCard;
