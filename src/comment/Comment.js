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

	const [update, setUpdate] = useState(false);

	const { socket } = useContext(UserContext);
	const dispatch = useDispatch();
	const commentRef = useRef();
	const auth = useSelector((state) => state?.auth);
	useEffect(() => {
		if (socket) {
			socket.emit("join_room", {
				id: id,
			});
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
	}, [id, update]);

	useEffect(() => {
		if (socket) {
			socket.on("recieve", (data) => {
				if (!data?.parentID) {
					const ar = commentArray || [];
					const some = ar?.some(
						(item) =>
							item?.commentID?.toString() === data?.commentID?.toString()
					);
					if (some) {
						return;
					}
					setCommentArray([
						{
							...data,
						},
						...ar,
					]);
				} else {
					const ar = commentArray || [];
					const newArr = ar?.map((item) => {
						if (item?.commentID?.toString() === data?.parentID?.toString()) {
							const some = item?.childComment?.some(
								(item) =>
									item?.commentID?.toString() === data?.commentID?.toString()
							);
							if (some) {
								return item;
							}
							item?.childComment?.push({
								...data,
							});
						}
						return item;
					});
					setCommentArray([...newArr]);
				}
			});
		}
	}, [socket, commentArray]);
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
							blogID: id,
							type,
							lessonID: null,
							parentID: null,
					  }
					: {
							content: comment,
							lessonID: id,
							type,
							blogID: null,
							parentID: null,
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
			socket.emit("send_mess", {
				commentID: res?.data?.commentID,
				content: comment,
				id,
				accountID: auth?.user?.id,
				image: auth?.user?.image,
				userName: auth?.user?.name,
				parentID: null,
				childComment: [],
				userID: auth?.user?.id,
			});
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
					<CommentCard
						update={update}
						setUpdate={setUpdate}
						id={id}
						type={type}
						key={index + id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
};

export default Comment;
