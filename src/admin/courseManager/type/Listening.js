import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
const Listening = () => {
    const [url, setUrl] = useState("");
    const urlRef = useRef();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleCheckYoutube = () => {
        if (!urlRef.current.value) {
            return toast.error("Please enter link!");
        }
        const u =
            "https://www.youtube.com/embed/" +
            urlRef.current.value.split("v=")[1];
        setUrl(u);
    };
    const handleChange = (data) => {
        setEditorState(data);
    };

    return (
        <div className="listening">
            <div className="listening_link">
                <input
                    ref={urlRef}
                    type="text"
                    placeholder="Add link youtube in here!"
                />
                <button onClick={handleCheckYoutube} className="button">
                    Check
                </button>
            </div>
            <div className="youtube_check">
                <div className="youtube_link">
                    <iframe
                        width="100%"
                        height="100%"
                        src={url}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
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
                {!convertToRaw(editorState.getCurrentContent())?.blocks[0]
                    ?.text && (
                    <div className="newPost_content_title">Content in here</div>
                )}
            </div>
        </div>
    );
};

export default Listening;
