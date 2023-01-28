import React, { useEffect, useState } from "react";
import "./style.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const BlogWrite = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleChange = (data) => {
        setEditorState(data);
    };

    // useEffect(() => {
    //     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    // }, [editorState]);

    return (
        <div className="newPost">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleChange}
                wrapperClassName="editor-wrapper"
                editorClassName="message-editor"
                toolbarClassName="message-toolbar"
            />
        </div>
    );
};

export default BlogWrite;
