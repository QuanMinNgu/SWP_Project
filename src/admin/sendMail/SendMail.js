import React, { useEffect, useState } from "react";
import "../style.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Receiver from "./Receiver";
const SendMail = () => {
	const [content, setContent] = useState(false);
	const [receive, setReceive] = useState(false);
	const [receivers, setReceivers] = useState([]);

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	useEffect(() => {
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	const handleChange = (data) => {
		setEditorState(data);
	};
	return (
		<div className="managerCourse">
			<div className="sendMailTitle">
				<input placeholder="Title" />
			</div>
			<div className="sendMailTitle">
				<div
					onClick={() => {
						setReceive(true);
					}}
					className="sendMail_receive"
				>
					Receiver
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
					setReceive={setReceive}
					receivers={receivers}
					setReceivers={setReceivers}
				/>
			)}
		</div>
	);
};

export default SendMail;
