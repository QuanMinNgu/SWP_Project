import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
const Reading = () => {
    const [uploadFile, setUploadFile] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleChange = (data) => {
        setEditorState(data);
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
            {!convertToRaw(editorState.getCurrentContent())?.blocks[0]
                ?.text && (
                <div className="newPost_content_title">Content in here</div>
            )}
            <div
                onClick={() => {
                    setUploadFile(true);
                }}
                className="uploadfile"
            >
                <i
                    style={{ marginRight: "0.5rem" }}
                    className="fa-solid fa-upload"
                ></i>
                Upload File
            </div>
            {uploadFile && (
                <div className="uploadFile_wrap">
                    <div className="uploadFile_container">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setUploadFile(false);
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="uploadFile_input">
                            <input type="file" />
                        </div>
                        <div className="uploadFile_input_form">
                            <textarea placeholder="After upload file you will get a link in here!" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reading;
