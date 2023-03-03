import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.scss";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
const RatingCard = ({ item }) => {
	const [percent, setPercent] = useState(0);

	const [bars, setBars] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (item) {
			setPercent(100 - ((item?.stars * 1) / 5) * 100);
			console.log(item);
		}
	}, [item]);

	const auth = useSelector((state) => state.auth);
	const clipPath = {
		clipPath: `inset(0% ${percent}% 0% 0%)`,
	};

	const handleDeleteRating = async () => {
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/course/rating/delete",
				{
					ratingID: item?.courseRateID,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg);
			dispatch(isSuccess());
			setBars(false);
		} catch (err) {
			setBars(false);
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};

	const handleReportRating = async () => {
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/course/rating/report",
				{
					ratingID: item?.courseRateID,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg);
			setBars(false);
			dispatch(isSuccess());
		} catch (err) {
			setBars(false);
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};
	return (
		<div className="ratingCard">
			<div className="ratingCard_img">
				<img src={item?.userImage} alt="Ảnh" />
			</div>
			<div className="ratingCard_infor">
				<div className="ratingCard_infor_name">
					{item?.userName}
					<div className="ratingCard_infor_rate">
						<div className="ratingCard_infor_rate_star">
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<div
								style={clipPath}
								className="ratingCard_infor_rate_star-color"
							>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="ratingCard_infor_content">{item?.content}</div>
			</div>
			<div className="rating_bars">
				<i
					onClick={() => {
						setBars(!bars);
					}}
					className="fa-solid fa-ellipsis"
				></i>
			</div>
			{bars && (
				<div className="rating_bars_items">
					{auth.user?.id === item?.userID ? (
						<div
							onClick={handleDeleteRating}
							title="Delete this rating"
							className="rating_bars_items_item"
						>
							Delete
						</div>
					) : (
						<div
							onClick={handleReportRating}
							title="Report this rating"
							className="rating_bars_items_item"
						>
							Report
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default RatingCard;
