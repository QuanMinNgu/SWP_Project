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

	const [out, setOut] = useState(false);

	const [page, setPage] = useState(1);

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
			const url = `/api/comment/get?id=${id}&type=${type}&page=${page}`;
			dispatch(isLoading());
			axios
				.get(url)
				.then((res) => {
					if (!here) {
						return dispatch(isSuccess());
					}
					dispatch(isSuccess());
					setOut(res?.data?.out);

					setCommentArray([...commentArray, ...res?.data?.comments]);
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
	}, [id, page]);

	let countRef = useRef(0);

	useEffect(() => {
		if (socket) {
			socket.on("recieve", (data) => {
				if (!data?.parentID) {
					const ar = commentArray;
					const some = ar?.some(
						(item) =>
							item?.commentID?.toString() === data?.commentID?.toString()
					);
					if (some) {
						return;
					}
					countRef.current++;
					ar.unshift({ ...data });
					setCommentArray([...ar]);
				} else {
					const ar = commentArray;
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

			socket.on("update_back", (data) => {
				const ar = commentArray;
				const newAr = ar.map((item) => {
					if (!data?.parentID) {
						if (data?.commentID?.toString() === item?.commentID?.toString()) {
							return {
								...item,
								content: data?.content,
							};
						}
						return item;
					} else {
						if (data?.parentID?.toString() === item?.commentID?.toString()) {
							const child = item?.childComment?.map((infor) => {
								if (
									infor?.commentID?.toString() === data?.commentID?.toString()
								) {
									return {
										...infor,
										content: data?.content,
									};
								}
							});
							return {
								...item,
								childComment: child,
							};
						}
						return item;
					}
				});

				setCommentArray([...newAr]);
			});

			socket.on("delete_back", (data) => {
				const ar = commentArray;
				let newAr = [];
				if (!data?.parentID) {
					newAr = ar.filter(
						(item) =>
							item?.commentID?.toString() !== data?.commentID?.toString()
					);
				} else {
					newAr = ar.map((item) => {
						if (item?.commentID?.toString() === data?.parentID?.toString()) {
							const child = item?.childComment?.filter(
								(infor) =>
									infor?.commentID?.toString() !== data?.commentID?.toString()
							);
							return {
								...item,
								childComment: child,
							};
						}

						return item;
					});
				}
				setCommentArray([...newAr]);
			});

			socket.on("report_back", (data) => {
				const ar = commentArray;
				let newAr = [];
				if (!data?.parentID) {
					newAr = ar.filter(
						(item) =>
							item?.commentID?.toString() !== data?.commentID?.toString()
					);
				} else {
					newAr = ar.map((item) => {
						if (item?.commentID?.toString() === data?.parentID?.toString()) {
							const child = item?.childComment?.filter(
								(infor) =>
									infor?.commentID?.toString() !== data?.commentID?.toString()
							);
							return {
								...item,
								childComment: child,
							};
						}

						return item;
					});
				}
				setCommentArray([...newAr]);
			});
		}
	}, [socket, commentArray]);

	useEffect(() => {
		if (countRef.current === 1) {
			const ar = commentArray;
			let newAr = [];
			ar.forEach((item) => {
				const check = newAr?.some(
					(infor) =>
						infor?.commentID?.toString() === item?.commentID?.toString()
				);
				if (!check) {
					newAr.push(item);
				}
			});
			setCommentArray([...ar]);
		}
	}, [countRef.current]);

	const handleComment = async () => {
		if (!comment) {
			return toast.error("Please enter content in comment", {
				autoClose: 2000,
			});
		}
		try {
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
			toast.success(res?.data?.msg, {
				autoClose: 2000,
			});
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
			return toast.error(error?.response?.data?.msg, {
				autoClose: 2000,
			});
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
			{!out && (
				<div className="comment_loadMore">
					<button
						onClick={() => {
							setPage((prev) => prev + 1);
						}}
						style={{ height: "4rem" }}
						className="button"
					>
						Load More Comment
					</button>
				</div>
			)}
		</div>
	);
};

export default Comment;
