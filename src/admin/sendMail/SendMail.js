import React, { useContext, useEffect, useState } from "react";
import "../style.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Receiver from "./Receiver";
import ReceiverItem from "./ReceiverItem";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../App";
const SendMail = () => {
	const [content, setContent] = useState(false);
	const [receive, setReceive] = useState(false);
	const [receivers, setReceivers] = useState([]);

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	useEffect(() => {
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	const [users, setUsers] = useState([]);

	const { cache } = useContext(UserContext);

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleChange = (data) => {
		setEditorState(data);
	};

	useEffect(() => {
		let here = true;
		const url = `/api/account?page=1&limit=20`;
		if (cache.current[url]) {
			return setUsers(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: `${auth.user?.token}`,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setUsers(res?.data);
				cache.current[url] = res?.data;
				dispatch(isSuccess());
			})
			.catch((err) => {
				if (here) {
					toast.error(err?.response?.data?.msg);
				}
				dispatch(isFailing());
			});
		return () => {
			here = false;
		};
	}, []);
	return (
		<div className="managerCourse">
			<div className="sendMailTitle">
				<input placeholder="Title" />
			</div>
			<div className="sendMailTitle">
				<div className="sendMail_receive">
					<div
						onClick={() => {
							setReceive(true);
						}}
					>
						Receiver
					</div>
					{receivers?.map((item) => (
						<ReceiverItem
							item={item}
							key={item?.accountID + "itemReceivers"}
							setReceive={setReceive}
							setReceivers={setReceivers}
							receivers={receivers}
						/>
					))}
				</div>
			</div>
			<div className="newPost_content sendMail_content">
				<Editor
					editorState={editorState}
					onEditorStateChange={handleChange}
					wrapperClassName="editor-wrapper"
					editorClassName="message-editor"
					toolbarClassName="message-toolbar"
				/>
				{!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text && (
					<div className="newPost_content_title sendMail_content_abs">
						Content
					</div>
				)}
			</div>
			{receive && (
				<div
					onClick={() => {
						setReceive(false);
					}}
					className="receiver_close"
				></div>
			)}
			{receive && (
				<Receiver
					users={users?.users}
					setReceive={setReceive}
					receivers={receivers}
					setReceivers={setReceivers}
				/>
			)}
		</div>
	);
};

export default SendMail;
