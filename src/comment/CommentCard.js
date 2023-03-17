import React, { useContext, useEffect, useRef, useState } from "react";
import ReplyInput from "./ReplyInput";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { UserContext } from "../App";
const CommentCard = ({ item, type, id }) => {
	const [time, setTime] = useState(0);

	const { socket } = useContext(UserContext);

	useEffect(() => {
		if (time === 0) {
			return;
		}
		const timesInterval = setInterval(() => {
			setTime((prev) => {
				if (prev < 1) {
					return prev;
				}
				return prev - 1;
			});
		}, 1000);
		return () => {
			clearInterval(timesInterval);
		};
	}, [time]);

	const [reply, setReply] = useState(false);
	const [bars, setBars] = useState(false);
	const [edit, setEdit] = useState(false);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const commentRef = useRef(null);

	const handleDeleteComment = async () => {
		const check = window.confirm("Do you wanna delete this comment?");
		if (!check) {
			setBars(!bars);
			return;
		}
		try {
			const data = await axios.post(
				`/api/comment/delete/${item?.commentID}`,
				{
					token: auth.user?.token,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg, {
				autoClose: 2000,
			});
			socket.emit("delete_comment", {
				id: id,
				parentID: item?.parentID,
				commentID: item?.commentID,
				content: commentRef.current.innerHTML,
			});
		} catch (err) {
			return toast.error(err?.response?.data?.msg, {
				autoClose: 2000,
			});
		}
	};

	const handleUpdateComment = async () => {
		setEdit(false);
		if (commentRef.current.innerHTML == item?.content) {
			return;
		}
		try {
			const data = await axios.post(
				`/api/comment/update`,
				{
					commentID: item?.commentID,
					content: commentRef.current.innerHTML,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg, {
				autoClose: 2000,
			});
			socket.emit("update_comment", {
				id: id,
				parentID: item?.parentID,
				commentID: item?.commentID,
				content: commentRef.current.innerHTML,
			});
		} catch (err) {
			commentRef.current.innerHTML = item?.content;
			return toast.error(err?.response?.data?.msg);
		}
	};

	const handleReport = async () => {
		if (time > 0) {
			return toast.error(`Please wating ${time} second to repord again.`);
		}
		dispatch(isLoading());
		try {
			const data = await axios.post(
				`/api/comment/report/${item?.commentID}`,
				{
					type: "lesson",
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg, {
				autoClose: 2000,
			});
			dispatch(isSuccess());
			setTime(300);
			socket.emit("report_comment", {
				id: id,
				parentID: item?.parentID,
				commentID: item?.commentID,
				content: commentRef.current.innerHTML,
			});
		} catch (err) {
			dispatch(isFailing());
			return toast.error(err?.response?.data?.msg, {
				autoClose: 2000,
			});
		}
	};

	useEffect(() => {
		if (commentRef) {
			if (edit) {
				commentRef.current.contentEditable = true;
				commentRef.current.focus();
			} else {
				commentRef.current.contentEditable = false;
			}
		}
	}, [edit, commentRef]);

	useEffect(() => {
		if (item) {
			commentRef.current.innerHTML = item?.content;
		}
	}, [item]);

	return (
		<div style={{ marginTop: "1rem" }} className="commentCard">
			<div className="commentCard_img">
				<img
					style={{ border: "0.1rem solid rgba(0,0,0,0.1)" }}
					src={item?.image}
					alt="Ảnh"
				/>
			</div>
			<div className="commentCard_body">
				<div className="commentCard_infor">
					<div className="commentCard_infor_title">
						{item?.userName}
						{edit && (
							<div className="comment_button_update">
								<button onClick={handleUpdateComment} className="button">
									Update
								</button>
								<button
									onClick={() => {
										setEdit(false);
									}}
									style={{
										backgroundColor: "rgb(141,141,141)",
										color: "white",
									}}
									className="button button_cancel"
								>
									Cancel
								</button>
							</div>
						)}
					</div>
					<div ref={commentRef} className="commentCard_infor_content"></div>
				</div>
				<div className="commentCard_navbar">
					<div
						onClick={() => {
							setReply(!reply);
						}}
						className="commentCard_navbar_items"
					>
						Reply
					</div>
					<div className="commentCard_navbar_items">
						<i>{item?.commentID && moment(item?.commentID).fromNow()}</i>
					</div>
				</div>
				{reply && (
					<div className="commentCard_replyInput">
						<ReplyInput
							type={type}
							parentID={item?.parentID ?? item?.commentID}
							name={item?.userName}
							id={id}
							setReply={setReply}
						/>
					</div>
				)}
				<div className="commentCard_reply">
					{item?.childComment?.map((infor, index) => (
						<CommentCard
							type={type}
							id={id}
							setReply={setReply}
							name={infor?.userName}
							key={index + "lesson for more" + infor?.commentID}
							item={infor}
						/>
					))}
				</div>
			</div>
			<div
				onClick={() => {
					setBars(!bars);
				}}
				className="comment_bars"
			>
				<i className="fa-solid fa-ellipsis"></i>
			</div>
			{bars && auth.user?.id?.toString() == item?.userID?.toString() && (
				<div className="comment_bars_items">
					<div
						onClick={() => {
							setBars(false);
							setEdit(true);
						}}
						title="Update"
						className="comment_bars_item"
					>
						Update
					</div>
					<div
						onClick={handleDeleteComment}
						title="Delete"
						className="comment_bars_item"
					>
						Delete
					</div>
				</div>
			)}
			{bars && auth.user?.id?.toString() != item?.userID?.toString() && (
				<div className="comment_bars_items">
					<div
						onClick={handleReport}
						title="Update"
						className="comment_bars_item"
					>
						Report
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentCard;
