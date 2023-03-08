import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import {
	EditorState,
	convertToRaw,
	ContentState,
	convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import ReactPlayer from "react-player/lazy";
import "../style.scss";
const ListeningUpdate = ({
	lesson,
	setLesson,
	addLesson,
	data,
	index,
	setUpdateLesson,
}) => {
	const [url, setUrl] = useState("");
	const urlRef = useRef();

	const [update, setUpdate] = useState({});
	const [typeVideo, setTypeVideo] = useState("youtube");

	useEffect(() => {
		if (data) {
			if (data?.link?.includes("cloudinary")) {
				setTypeVideo("no_youtube");
				setUpdate({
					link: data?.link,
					duration: data?.duration,
				});
			}
		}
	}, [data]);

	const playerRef = useRef(null);

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

	const [create, setCreate] = useState(false);
	const titleRef = useRef();
	const [content, setContent] = useState("");

	useEffect(() => {
		if (data?.type === "listening") {
			setContent(data?.description);
		}
	}, [data]);

	useEffect(() => {
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	const handleCheckYoutube = () => {
		if (!urlRef.current.value) {
			return toast.error("Please enter link!");
		}
		if (typeVideo === "no_youtube") {
			setUpdate({
				link: data?.link,
				duration: data?.duration,
			});
		} else {
			setUrl(urlRef.current.value);
		}
	};
	const handleChange = (data) => {
		setEditorState(data);
	};

	const handleCreateListening = () => {
		if (!content) {
			return toast.error("Please enter value.");
		}
		const arr = lesson;
		arr[index].numLesson[addLesson] = {
			title: titleRef.current.value,
			type: "listening",
			value: null,
			description: content,
			link: typeVideo === "youtube" ? url || data?.link : update?.link,
			time:
				typeVideo === "youtube"
					? playerRef.current.getDuration()
					: update?.duration,
			lessonID: arr[index].numLesson[addLesson]?.lessonID || null,
		};
		setLesson([...arr]);
		setCreate(false);
		setUpdateLesson(false);
	};

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
					console.log(result.info);
					const newUrl = "https://" + result.info.url.split("://")[1];
					setUpdate({
						link: newUrl,
						duration: result.info.duration,
					});
					playerRef.current.value = "";
				}
			}
		);
	}, []);
	return (
		<div className="listening">
			<div className="listening_link">
				<input
					ref={urlRef}
					type="text"
					defaultValue={data?.link}
					placeholder="Add link youtube in here!"
				/>
				<button onClick={handleCheckYoutube} className="button">
					Check
				</button>
			</div>
			<div className="youtube_check">
				<div className="youtube_link">
					{typeVideo === "youtube" ? (
						<ReactPlayer ref={playerRef} width="100%" height="100%" url={url} />
					) : (
						<iframe
							width="100%"
							height="100%"
							src={update?.link}
							title="YouTube video player"
							allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					)}
				</div>
			</div>
			<div className="lesson_content_title">Content</div>
			<div className="lesson_content">
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
			</div>
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
						<div className="lessonCreate_button_form">
							<button
								onClick={handleCreateListening}
								style={{ height: "4rem" }}
								className="button"
							>
								Updating Listening
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
				<button
					onClick={() => {
						setCreate(true);
					}}
					className="button_create"
				>
					Update
				</button>
			</div>
			<div
				onClick={() => {
					setTypeVideo("no_youtube");
					widgetRef.current.open();
				}}
				style={{ padding: "0 2rem", width: "auto" }}
				className="createQuesion listeningCreate"
			>
				Upload video from device
			</div>
		</div>
	);
};

export default ListeningUpdate;
