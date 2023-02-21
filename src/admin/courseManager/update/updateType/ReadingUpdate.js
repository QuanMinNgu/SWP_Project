import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
	EditorState,
	convertToRaw,
	ContentState,
	convertFromHTML,
} from "draft-js";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import "../style.scss";
const ReadingUpdate = ({
	setUrlArray,
	urlArray,
	urlArrayRef,
	setLesson,
	lesson,
	index,
	addLesson,
	setUpdateLesson,
	data,
}) => {
	const [uploadFile, setUploadFile] = useState(false);

	const [oldUrl, setOldUrl] = useState("");
	const [content, setContent] = useState("");
	const [create, setCreate] = useState(false);
	const titleRef = useRef();
	const timesRef = useRef();
	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML(
					data?.type !== "reading" && data?.type !== "listening"
						? "<p></p>"
						: data?.description
				)
			)
		)
	);

	const handleChange = (data) => {
		setEditorState(data);
	};

	useEffect(() => {
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	const cloudinaryRef = useRef();
	const widgetRef = useRef();
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: "sttruyen",
				uploadPreset: "xmqhuwyw",
			},
			function (error, result) {
				if (!error && result && result.event === "success") {
					const newUrl = "https://" + result.info.url.split("://")[1];
					setOldUrl(newUrl);
					setUrlArray([...urlArray, newUrl]);
					urlArrayRef.push(newUrl);
				}
			}
		);
	}, []);

	const handleCreateReading = () => {
		if (!content) {
			return toast.error("Please enter value.");
		}
		const arr = lesson;
		arr[index].numLesson[addLesson] = {
			title: titleRef.current.value,
			type: "reading",
			value: null,
			link: null,
			time: timesRef.current.value * 1,
			description: content,
		};
		setLesson([...arr]);
		setCreate(false);
		setUpdateLesson(false);
	};

	return (
		<div className="content_edit">
			<Editor
				editorState={editorState}
				onEditorStateChange={handleChange}
				wrapperClassName="editor-wrapper"
				editorClassName="message-editor"
				toolbarClassName="message-toolbar"
			/>
			{!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text && (
				<div className="newPost_content_title">Content in here</div>
			)}
			<div
				onClick={() => {
					setUploadFile(true);
				}}
				className="uploadfile"
			>
				<i style={{ marginRight: "0.5rem" }} className="fa-solid fa-upload"></i>
				Upload File
			</div>
			{uploadFile && (
				<div className="uploadFile_wrap">
					<div className="uploadFile_container">
						<div className="expertCourse_close">
							<div
								onClick={() => {
									setUploadFile(false);
									widgetRef.current.close();
								}}
								className="expertCourse_close_icons"
							>
								&times;
							</div>
						</div>
						<div className="uploadFile_input">
							<button
								style={{ height: "4rem" }}
								className="button"
								onClick={() => {
									toast.success("Please,waiting for some second.");
									widgetRef.current.open();
								}}
							>
								Upload (pdf not support)
							</button>
						</div>
						<div className="uploadFile_input_form">
							<textarea
								style={{ resize: "vertical" }}
								defaultValue={oldUrl}
								placeholder="After upload file you will get a link in here!"
							/>
						</div>
					</div>
				</div>
			)}
			{create && (
				<div className="lessonCreate_input_form">
					<div className="lessonCreate_input_form_wrap">
						<div className="expertCourse_close">
							<div
								onClick={() => {
									setCreate(false);
								}}
								className="expertCourse_close_icons"
							>
								&times;
							</div>
						</div>
						<div className="lessonCreate_textarea">
							<textarea
								defaultValue={data?.title}
								ref={titleRef}
								placeholder="Enter title"
							/>
						</div>
						<div className="lessonCreate_input">
							<input
								ref={timesRef}
								type="number"
								defaultValue={data?.time}
								placeholder="Enter times"
							/>
						</div>
						<div className="lessonCreate_button_form">
							<button
								onClick={handleCreateReading}
								style={{ height: "4rem" }}
								className="button"
							>
								Create Reading
							</button>
							<button
								onClick={() => {
									setCreate(false);
								}}
								style={{ marginLeft: "1rem" }}
								className="button cancel_button"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="lesson_create_button">
				<button onClick={() => setCreate(true)} className="button_create">
					Update
				</button>
			</div>
		</div>
	);
};

export default ReadingUpdate;
