import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";
const Comment = ({ type, id }) => {
	const [comment, setComment] = useState("");
	const [commentArray, setCommentArray] = useState([]);
	const { socket } = useContext(UserContext);
	const dispatch = useDispatch();
	const commentRef = useRef();
	const auth = useSelector((state) => state?.auth);
	useEffect(() => {
		if (socket) {
			socket.emit("join_room", id + type);
		}
	}, [socket]);
	useEffect(() => {
		if (id) {
			let here = true;
			const url = `/api/comment/get?id=${id}&type=${type}&page=1`;
			dispatch(isLoading());
			axios
				.get(url)
				.then((res) => {
					if (!here) {
						return dispatch(isSuccess());
					}
					dispatch(isSuccess());
					console.log(res?.data);
					setCommentArray(res?.data?.comments);
				})
				.catch((err) => {
					if (!here) {
						return dispatch(isFailing());
					}
					console.log(err?.response);
					toast.error(err?.response?.data?.msg);
					dispatch(isFailing());
				});
			return () => {
				here = false;
			};
		}
	}, [id]);
	const handleComment = async () => {
		if (!comment) {
			return toast.error("Please enter content in comment");
		}
		try {
			dispatch(isLoading());
			const data =
				type === "blog"
					? {
							content: comment,
							accountID: auth?.user?.id,
							blogID: id,
							type,
							lessonID: null,
					  }
					: {
							content: comment,
							accountID: auth?.user?.id,
							lessonID: id,
							type,
							blogID: null,
					  };
			const res = await axios.post("/api/comment/create", data, {
				headers: { token: auth?.user?.token },
			});
			if (commentRef.current) {
				commentRef.current.innerHTML = "";
				setComment("");
			}
			toast.success(res?.data?.msg);
			dispatch(isSuccess());
			await socket.emit("send_mess", {
				commentID: res?.data?.commentID,
				content: comment,
				id,
				accountID: auth?.user?.id,
				image: auth?.user?.image,
				userName: auth?.user?.name,
			});
			setCommentArray([
				{
					commentID: res?.data?.commentID,
					content: comment,
					id,
					accountID: auth?.user?.id,
					image: auth?.user?.image,
					userName: auth?.user?.name,
				},
				...commentArray,
			]);
		} catch (error) {
			dispatch(isFailing());
			return toast.error(error?.response?.data?.msg);
		}
	};
	useEffect(() => {
		socket.on("recieve", (data) => {
			setCommentArray((pre) => [data, ...pre]);
		});
	}, [socket]);
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
					<button onClick={handleComment}>Send</button>
				</div>
			</div>
			<div className="comment_input">
				<div
					onInput={(e) => {
						setComment(e.target.innerHTML);
					}}
					ref={commentRef}
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
					<CommentCard id={id} type={type} key={index + id} item={item} />
				))}
			</div>
		</div>
	);
};

export default Comment;
