import React, { useEffect, useState } from "react";
import "./style.scss";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const Comment = ({ type, id }) => {
	const [comment, setComment] = useState("");

	const [commentArray, setCommentArray] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (id) {
			let here = true;
			const url = `/api/comment?type=${type}&id=${id}`;
			dispatch(isLoading());
			axios
				.get(url)
				.then((res) => {
					if (!here) {
						return dispatch(isSuccess());
					}
					dispatch(isSuccess());
					setCommentArray(res?.data?.comments);
				})
				.catch((err) => {
					if (!here) {
						return dispatch(isFailing());
					}
					toast.error(err?.response?.data?.msg);
					dispatch(isFailing());
				});
			return () => {
				here = false;
			};
		}
	}, [id]);
	return (
		<div className="comment">
			<div className="comment_navbar">
				<div className="comment_navbar_title">
					<i
						style={{
							marginRight: "0.5rem",
							marginTop: "0.5rem",
						}}
						className="fa-solid fa-comment"
					></i>
					<h2>Comment</h2>
				</div>
				<div className="comment_navbar_button">
					<button>Send</button>
				</div>
			</div>
			<div className="comment_input">
				<div
					onInput={(e) => {
						setComment(e.target.innerHTML);
					}}
					contentEditable="true"
					className="comment_input_detail"
				></div>
				<div
					style={!comment ? { display: "flex" } : { display: "none" }}
					className="comment_input_detail_abs"
				>
					Comment in here
				</div>
			</div>
			<div className="comment_cards">
				{commentArray?.map((item, index) => (
					<CommentCard key={index + id} item={item} />
				))}
			</div>
		</div>
	);
};

export default Comment;
