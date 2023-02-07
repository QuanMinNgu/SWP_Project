import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { toast } from "react-toastify";
const Reading = ({ urlFileRef }) => {
    const [uploadFile, setUploadFile] = useState(false);

    const [oldUrl, setOldUrl] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleChange = (data) => {
        setEditorState(data);
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
                    const newUrl = "https://" + result.info.url.split("://")[1];
                    urlFileRef.push(newUrl);
                    setOldUrl(newUrl);
                }
            }
        );
    }, []);

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
                                    toast.success(
                                        "Please,waiting for some second."
                                    );
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
            <div className="lesson_create_button">
                <button className="button_create">Create</button>
            </div>
        </div>
    );
};

export default Reading;
