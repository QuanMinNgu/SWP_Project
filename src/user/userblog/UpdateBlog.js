import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import "./main.scss";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isSuccess, isLoading, isFailing } from "../../redux/slice/auth";
import axios from "axios";
import Select from "react-select";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
const UpdateBlog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [optionsKind, setOptionKind] = useState({});
  const { cache } = useContext(UserContext);
  const [types, setTypes] = useState([]);
  const { slug } = useParams();
  const [blog, setBlog] = useState();
  const [msg, setMsg] = useState({});
  const navigate = useNavigate();
  const [currentType, setCurrentType] = useState({});
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
  }, []);
  const titleRef = useRef();
  const metaRef = useRef();
  const [content, setContent] = useState("");
  const handleChange = (data) => {
    setEditorState(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  const handleUpdate = async () => {
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
    if (!currentType) {
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
        `/api/blog/update/id=${slug}`,
        {
          blogName: title,
          blogMeta: meta,
          content: content,
          courseTypeId: currentType.value,
        },
        {
          headers: {
            token: auth.user?.token,
          },
        }
      );
      toast.success(data?.data?.msg);
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
  useEffect(() => {
    let here = true;
    const url = `/api/common/blog/blog_details?id=${slug}`;
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setBlog(res?.data?.blogDetail);
        setCurrentType({
          label: res?.data?.blogDetail?.courseTypeName,
          value: res?.data?.blogDetail?.courseTypeId,
        });
        console.log(res?.data);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(`<div>${res?.data?.blogDetail?.content}</div>`)
            )
          )
        );
        dispatch(isSuccess());
      })
      .catch((err) => {
        if (!here) {
          return dispatch(isFailing());
        }
        dispatch(isFailing());
        toast.error(err?.response?.data?.msg);
      });
    return () => {
      here = false;
    };
  }, []);

  return (
    <div className="newPost">
      <div className="newPost_title">
        <textarea
          ref={titleRef}
          className="newPost_input_title"
          type="text"
          placeholder="Enter title"
          defaultValue={blog?.blogName}
          onChange={() => setMsg({})}
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
            onChange={setCurrentType}
            options={optionsKind}
            value={currentType}
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
            ref={metaRef}
            className="newPost_input_title_meta"
            type="text"
            placeholder="Enter Meta"
            defaultValue={blog?.blogMeta}
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
          onChange={() => setMsg({})}
        />
        {!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text && (
          <div className="newPost_content_title">Nội dung viết tại đây</div>
        )}
      </div>
      <div className="newPost_update">
        <button className="button_update_post" onClick={handleUpdate}>
          <i
            style={{ marginRight: "0.5rem", fontSize: "1.3rem" }}
            className="fa-solid fa-upload"
          ></i>
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
