import React, { useState } from "react";
import "./style.scss";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const ViewPdf = () => {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);

    const handleChangeFile = async (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = async (e) => {
            console.log(e.target.result);
            setPDFFile(e.target.result);
        };
    };

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5rem",
                    marginBottom: "5rem",
                }}
            >
                <input
                    type="file"
                    onChange={(e) => handleChangeFile(e.target.files[0])}
                />
            </div>
            <div style={{ width: "80%", margin: "auto" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                    {pdfFile && (
                        <Viewer
                            fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    )}
                </Worker>
            </div>
        </div>
    );
};

export default ViewPdf;
