import React, { useEffect, useState } from "react";
import "./style.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const BlogWrite = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleChange = (data) => {
    setEditorState(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  return (
    <div className="newPost">
      <div className="newPost_title">
        <div
          className="newPost_title_edit"
          contentEditable={true}
          onInput={(e) => {
            setTitle(e.target.innerHTML);
          }}
        ></div>
        {!title && <div className="newPost_title_content">Tiêu đề</div>}
      </div>
      <div className="newPost_content">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleChange}
          wrapperClassName="editor-wrapper"
          editorClassName="message-editor"
          toolbarClassName="message-toolbar"
        />
        {!convertToRaw(editorState.getCurrentContent())?.blocks[0]?.text && (
          <div className="newPost_content_title">Nội dung viết tại đây</div>
        )}
      </div>
      <div className="newPost_update">
        <button>
          <i
            style={{ marginRight: "0.5rem", fontSize: "1.3rem" }}
            className="fa-solid fa-upload"
          ></i>
          Đăng
        </button>
      </div>
    </div>
  );
};

export default BlogWrite;
