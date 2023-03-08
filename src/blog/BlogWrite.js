import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, Modifier } from "draft-js";
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
	const handleAddImage = (url) => {
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			"IMAGE",
			"IMMUTABLE",
			{ src: url }
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const newEditorState = EditorState.set(editorState, {
			currentContent: contentStateWithEntity,
		});
		const currentSelection = editorState.getSelection();
		const newContentState = Modifier.insertText(
			contentStateWithEntity,
			currentSelection,
			" ",
			null,
			entityKey
		);
		const newEditorStateWithEntity = EditorState.push(
			newEditorState,
			newContentState,
			"insert-characters"
		);
		const newEditorStateWithSelection = EditorState.forceSelection(
			newEditorStateWithEntity,
			currentSelection.merge({
				anchorOffset: currentSelection.getFocusOffset() + 1,
				focusOffset: currentSelection.getFocusOffset() + 1,
			})
		);
		setEditorState(newEditorStateWithSelection);
	};

	const entityDecorator = (contentBlock, callback, contentState) => {
		contentBlock.findEntityRanges((character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === "IMAGE" &&
				contentState.getEntity(entityKey).getData().src !== null
			);
		}, callback);
	};

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
					handleAddImage(newUrl);
				}
			}
		);
	}, []);

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
					editorStyle={{
						zIndex: "100",
						position: "relative",
					}}
					editorState={editorState}
					onEditorStateChange={handleChange}
					wrapperClassName="editor-wrapper"
					editorClassName="message-editor"
					toolbarClassName="message-toolbar"
					customDecorators={[{ strategy: entityDecorator, component: Image }]}
				></Editor>
				<div className="uploadImage_here">
					<i
						onClick={() => {
							widgetRef.current.open();
						}}
						className="fa-solid fa-image"
					></i>
				</div>
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
const Image = (props) => {
	const { src } = props.contentState.getEntity(props.entityKey).getData();
	return <img src={src} />;
};

export default BlogWrite;
