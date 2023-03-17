import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import "./style.scss";
const ReplyInput = ({ name, type, id, parentID, setReply }) => {
	const [content, setContent] = useState("");

	const { socket } = useContext(UserContext);
	const commentRef = useRef();
	const auth = useSelector((state) => state.auth);

	const handleComment = async () => {
		if (!content) {
			return toast.error("Please enter content in comment");
		}
		try {
			const data =
				type === "blog"
					? {
							content: `<span>${name}</span>` + content,
							parentID: parentID,
							blogID: id,
							type,
							lessonID: null,
					  }
					: {
							content: `<span>${name}</span>` + content,
							parentID: parentID,
							lessonID: id,
							type,
							blogID: null,
					  };

			const res = await axios.post("/api/comment/create", data, {
				headers: { token: auth?.user?.token },
			});
			toast.success(res?.data?.msg, {
				autoClose: 2000,
			});
			socket.emit("send_mess", {
				commentID: res?.data?.commentID,
				content: `<span>${name}</span>` + content,
				id,
				userID: auth?.user?.id,
				image: auth?.user?.image,
				userName: auth?.user?.name,
				parentID: parentID,
				childComment: [],
			});
			commentRef.current.innerHTML = "";
			setReply(false);
		} catch (error) {
			return toast.error(error?.response?.data?.msg, {
				autoClose: 2000,
			});
		}
	};

	return (
		<div className="replyInput">
			<div
				onInput={(e) => {
					setContent(e.target.innerHTML);
				}}
				ref={commentRef}
				contentEditable="true"
				className="replyInput_input"
			></div>
			<div className="replyInput_button">
				<button onClick={handleComment}>Send</button>
			</div>
			{!content && (
				<div className="replyInput_abs">Reply comment of {name}</div>
			)}
		</div>
	);
};

export default ReplyInput;
