import React, { useState } from "react";
import "./style.scss";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
const CourseDetail = () => {
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
        <div className="course_detail">
            <div className="row">
                <div className="col c-12 m-8 l-8">
                    <div className="course_detail_name">
                        <h3>Responsive Với Grid System</h3>
                    </div>
                    <div className="course_detail_content">
                        <span>
                            Trong khóa này chúng ta sẽ học về cách xây dựng giao
                            diện web responsive với Grid System, tương tự
                            Bootstrap 4.
                        </span>
                    </div>
                    <div className="course_detail_learn">
                        <h3>Bạn sẽ học được gì?</h3>
                    </div>
                    <ul className="course_detail_learn_items">
                        <li>Biết cách xây dựng website Responsive</li>
                        <li>Hiểu được tư tưởng thiết kế với Grid system</li>
                        <li>Tự tay xây dựng được thư viện CSS Grid</li>
                        <li>Tự hiểu được Grid layout trong bootstrap</li>
                    </ul>
                    <div className="course_detail_learn">
                        <h3>Nội dung khóa học</h3>
                    </div>
                    <div className="course_detail_timeLine">
                        <ul>
                            <li>
                                <b>7</b> chương
                            </li>
                            <li>.</li>
                            <li>
                                <b>37</b> bài học
                            </li>
                            <li>.</li>
                            <li>
                                Thời lượng <b>06 giờ 45 phút</b>
                            </li>
                        </ul>
                    </div>
                    <input
                        type="file"
                        onChange={(e) => handleChangeFile(e.target.files[0])}
                    />
                </div>
            </div>
            <div>
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

export default CourseDetail;
