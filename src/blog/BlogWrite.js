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
  const [msg, setMsg] = useState({});

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
    setMsg({});
  }, [editorState]);

  const handleCreateNewBlog = async () => {
    const title = titleRef.current.value;
    const meta = metaRef.current.value;
    let m = {};
    if (!title) {
      m["blogName"] = "Please enter title of blog!";
    }
    console.log(editorState);
    if (!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text) {
      m["content"] = "Please enter content of blog!";
    }
    if (!selectedOption) {
      m["kind"] = "Please choose type of blog!";
    }
    if (m["blogName"] || m["content"] || m["kind"]) {
      setMsg({ ...m });
      return;
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
      let ms = {};
      err?.response?.data?.msgProgress?.forEach((item) => {
        ms[item?.errorName] = item?.message;
      });
      setMsg({ ...ms });
      dispatch(isFailing());
      window.scrollTo(0, 0);
    }
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

  useEffect(() => {
    setMsg({});
  }, [selectedOption]);

  return (
    <div className="newPost">
      {/* {msg["blogName"] && (
				<div
					style={{
						color: "red",
						margin: "0.5rem 0",
						fontSize: "1.5rem",
						textAlign: "center",
					}}
				>
					* <i>{msg["blogName"]}</i>
				</div>
			)}
			{msg["blogMeta"] && (
				<div
					style={{
						color: "red",
						margin: "0.5rem 0",
						fontSize: "1.5rem",
						textAlign: "center",
					}}
				>
					* <i>{msg["blogMeta"]}</i>
				</div>
			)}
			{msg["content"] && (
				<div
					style={{
						color: "red",
						margin: "0.5rem 0",
						fontSize: "1.5rem",
						textAlign: "center",
					}}
				>
					* <i>{msg["content"]}</i>
				</div>
			)} */}
      <div className="newPost_title">
        <textarea
          onChange={() => {
            setMsg({});
          }}
          ref={titleRef}
          className="newPost_input_title"
          type="text"
          placeholder="Enter title"
        />
        {msg["blogName"] && (
          <div className="errorManage">
            * <i>{msg["blogName"]}</i>
          </div>
        )}
      </div>
      <div className="newPost_title">
        <div style={{ position: "relative" }}>
          {msg["kind"] && (
            <div style={{ top: "-5.3rem" }} className="errorManage">
              * <i>{msg["kind"]}</i>
            </div>
          )}
          <Select
            className="search_wrap_select"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={optionsKind}
            placeholder="Kind"
          />
        </div>
        <div className="newPost_title_input">
          {msg["blogMeta"] && (
            <div className="errorManage">
              * <i>{msg["blogMeta"]}</i>
            </div>
          )}
          <textarea
            onChange={() => {
              setMsg({});
            }}
            ref={metaRef}
            className="newPost_input_title_meta"
            type="text"
            placeholder="Enter Meta"
          />
        </div>
      </div>
      <div className="newPost_content">
        {msg["content"] && (
          <div style={{ top: "4.5rem" }} className="errorManage">
            * <i>{msg["content"]}</i>
          </div>
        )}
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
