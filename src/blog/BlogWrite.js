import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Editor } from "react-draft-wysiwyg";
import {
	EditorState,
	ContentState,
	convertToRaw,
	Modifier,
	convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isSuccess, isLoading, isFailing } from ".././redux/slice/auth";
import axios from "axios";
import Select from "react-select";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
const BlogWrite = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [selectedOption, setSelectedOption] = useState(null);

	const [optionsKind, setOptionKind] = useState({});
	const { cache } = useContext(UserContext);
	const [types, setTypes] = useState([]);

	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (!auth.user) {
			toast.error("Please login first.");
			navigate("/login");
		}
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		if (types) {
			const arr = types?.map((item) => {
				return {
					value: item?.courseTypeID,
					label: item?.courseTypeName,
				};
			});
			setOptionKind([...arr]);
		}
	}, [types]);

	useEffect(() => {
		if (auth.user) {
			let here = true;
			const url = "/api/type_course";
			if (cache.current[url]) {
				return setTypes(cache.current[url]);
			}
			dispatch(isLoading());
			axios
				.get(url)
				.then((res) => {
					if (!here) {
						return;
					}
					setTypes(res?.data?.types);
					cache.current[url] = res?.data?.types;

					dispatch(isSuccess());
				})
				.catch((err) => {
					dispatch(isFailing());
				});
			return () => {
				here = false;
			};
		}
	}, []);
	const titleRef = useRef();
	const metaRef = useRef();
	const [content, setContent] = useState("");
	const handleChange = (data) => {
		setEditorState(data);
	};

	const dispatch = useDispatch();
	useEffect(() => {
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	const handleCreateNewBlog = async () => {
		const title = titleRef.current.value;
		const meta = metaRef.current.value;
		if (!title || !content || !selectedOption?.value) {
			return toast.error("Please enter all information.");
		}
		if (!auth.user?.token) {
			return toast.error("Please login first");
		}
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/blog/create",
				{
					blogName: title,
					blogMeta: meta,
					content: content,
					courseTypeId: selectedOption.value,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg);
			titleRef.current.value = "";
			metaRef.current.value = "";
			setSelectedOption(null);
			dispatch(isSuccess());
			setEditorState(EditorState.createEmpty());
			setContent("");
			navigate("/blog");
		} catch (err) {
			toast.error(err?.response?.data?.msg);
			dispatch(isFailing());
		}
	};
	const cloudinaryRef = useRef();
	const widgetRef = useRef();
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: "sttruyen",
				uploadPreset: "xmqhuwyw",
				showAdvancedOptions: true,
				cropping: true,
				multiple: false,
				transformations: [
					{
						width: 100,
					},
				],
			},
			function (error, result) {
				if (!error && result && result.event === "success") {
					const newUrl = "https://" + result.info.url.split("://")[1];
				}
			}
		);
	}, []);

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
							console.log(percentCompleted);
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

	const handleImageUpload = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve({ data: { link: e.target.result } });
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const insertImage = (url) => {
		const editorStateWithImage = EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML(`<p><img src="${url}" /></p>`)
			)
		);
		setEditorState(editorStateWithImage);
	};

	const onImageUpload = (file) => {
		return new Promise((resolve, reject) => {
			uploadCallback(file)
				.then((response) => {
					insertImage(response.data.link);
					resolve({ data: { link: response.data.link } });
				})
				.catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	};

	return (
		<div className="newPost">
			<div className="newPost_title">
				<textarea
					ref={titleRef}
					className="newPost_input_title"
					type="text"
					placeholder="Enter title"
				/>
			</div>
			<div className="newPost_title">
				<div>
					<Select
						className="search_wrap_select"
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={optionsKind}
						placeholder="Kind"
					/>
				</div>
				<div className="newPost_title_input">
					<textarea
						ref={metaRef}
						className="newPost_input_title_meta"
						type="text"
						placeholder="Enter Meta"
					/>
				</div>
			</div>
			<div className="newPost_content">
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
				{!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text && (
					<div className="newPost_content_title">Content in here</div>
				)}
			</div>
			<div className="newPost_update">
				<button className="button_update_post" onClick={handleCreateNewBlog}>
					Create Blog
				</button>
			</div>
		</div>
	);
};

export default BlogWrite;
