import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import RatingCard from "./RatingCard";
import "./style.scss";
const Rating = ({ course }) => {
	const [star, setStar] = useState(null);
	const [hover, setHover] = useState(null);

	const [comment, setComment] = useState("");

	const [ratings, setRatings] = useState([]);

	const { search } = useLocation();

	const [update, setUpdate] = useState(false);

	const page = new URLSearchParams(search).get("page") || 1;

	const { slug } = useParams();

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		let here = true;
		const url = `/api/common/course/rating?id=${slug}&page=${page}&limit=20`;
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return;
				}
				setRatings(res?.data);
				console.log(res?.data);
			})
			.catch((err) => {
				toast.error(err?.response?.data?.msg);
			});
	}, [slug, page, update]);

	const handleCreateRating = async () => {
		if (!auth.user?.token) {
			return toast.error("Please login first.");
		}
		if (!star) {
			return toast.error("Please rating stars for this course.");
		}
		if (!comment) {
			return toast.error("Please give a comment for this reviewing");
		}
		if (!course?.enrolled) {
			return toast.error("Please enroll this course first.");
		}
		console.log({ stars: star, content: comment, courseID: slug });
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/common/course/rating/create",
				{
					stars: star,
					content: comment,
					courseID: slug,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			toast.success(data?.data?.msg);
			setUpdate(!update);
		} catch (err) {
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg);
		}
	};

	const starArr = Array(5).fill(0);
	return (
		<div className="detail_body_infor_content_2">
			<div className="detail_body_infor_content_title">
				<div>
					<div>
						<i
							style={{
								marginRight: "0.5rem",
								marginTop: "0.5rem",
							}}
							className="fa-solid fa-comment"
						></i>
						<h2>Review</h2>
					</div>
					<div>
						{starArr.map((_, index) => (
							<i
								onMouseOver={() => {
									setHover(index + 1);
								}}
								onMouseLeave={() => {
									setHover(null);
								}}
								onClick={() => {
									setStar(index + 1);
								}}
								key={index + "star"}
								className={
									hover
										? hover > index
											? "fa-solid fa-star"
											: "fa-regular fa-star"
										: star > index
										? "fa-solid fa-star"
										: "fa-regular fa-star"
								}
							></i>
						))}
					</div>
				</div>
				<div>
					<button onClick={handleCreateRating}>Send</button>
				</div>
			</div>
			<div className="detail_body_infor_content_input_wrap">
				<div
					onInput={(e) => {
						setComment(e.target.innerHTML);
					}}
					contentEditable="true"
					className="detail_body_infor_content_input"
				></div>
				<div
					style={!comment ? { display: "flex" } : { display: "none" }}
					className="detail_body_infor_content_input_abs"
				>
					Comment in here
				</div>
			</div>
			<div className="detail_body_infor_content_rating">
				{ratings?.rating?.map((item, index) => (
					<RatingCard key={index + "rating"} item={item} />
				))}
			</div>
		</div>
	);
};

export default Rating;
