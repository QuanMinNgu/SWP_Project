import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
const Reading = ({
	setUrlArray,
	urlArray,
	urlArrayRef,
	setLesson,
	lesson,
	setAddLesson,
	addLesson,
	setType,
}) => {
	const [uploadFile, setUploadFile] = useState(false);

	const [oldUrl, setOldUrl] = useState("");
	const [content, setContent] = useState("");
	const [create, setCreate] = useState(false);
	const titleRef = useRef();
	const timesRef = useRef();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
		if (!content || !timesRef.current.value) {
			return toast.error("Please enter value.");
		}
		const arr = lesson;
		const inde = addLesson.index;
		if (addLesson.type === "create") {
			arr[inde].numLesson.push({
				title: titleRef.current.value,
				type: "reading",
				value: null,
				link: null,
				time: timesRef.current.value * 1,
				description: content,
				lessonID: null,
			});
		} else {
			arr[inde].numLesson.splice(addLesson?.childId, 0, {
				title: titleRef.current.value,
				type: "reading",
				value: null,
				link: null,
				time: 0,
				description: content,
				lessonID: null,
			});
		}
		setLesson([...arr]);
		setCreate(false);
		setAddLesson("");
		setType("listening");
	};
	const uploadCallback = (file) => {
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "sttruyenxyz");
			axios
				.post(
					"https://api.cloudinary.com/v1_1/sttruyen/image/upload",
					formData,
					{
						headers: { "X-Requested-With": "XMLHttpRequest" },
						onUploadProgress: (progressEvent) => {
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						},
					}
				)
				.then((response) => {
					resolve({ data: { link: response.data.secure_url } });
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	const [uploadImage, setUploadImage] = useState(false);

	const onImageUpload = (file) => {
		return new Promise((resolve, reject) => {
			uploadCallback(file)
				.then((response) => {
					setUploadImage(true);
					resolve({ data: { link: response.data.link } });
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	return (
		<div className="content_edit">
			<Editor
				editorState={editorState}
				onEditorStateChange={handleChange}
				wrapperClassName="editor-wrapper"
				editorClassName="message-editor"
				toolbarClassName="message-toolbar"
				toolbar={{
					options: [
						"inline",
						"blockType",
						"fontSize",
						"list",
						"textAlign",
						"image",
						"emoji",
						"link",
						"history",
					],

					image: {
						uploadEnabled: true,
						uploadCallback: onImageUpload,
						previewImage: true,
						inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
						alt: { present: false, mandatory: false },
						defaultSize: {
							height: "200px",
							width: "200px",
						},
					},
				}}
			/>
			{!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text &&
				!uploadImage && (
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
							<textarea ref={titleRef} placeholder="Enter title of this quiz" />
						</div>
						<div className="lessonCreate_input">
							<input
								ref={timesRef}
								type="number"
								placeholder="Enter times of quiz (second)"
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
					Create
				</button>
			</div>
		</div>
	);
};

export default Reading;
