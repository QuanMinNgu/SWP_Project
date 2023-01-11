import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import CourseLearnCard from "./CourseLearnCard";
const CourseLearn = () => {
    const [percent, setPercent] = useState(86 * 3.6);
    const style = {
        background: `conic-gradient(#F05123 ${percent}deg,transparent 0deg)`,
    };
    return (
        <div className="CourseLearn">
            <div className="CourseLearn_Head">
                <div className="CourseLearn_Head_Navbar">
                    <Link style={{ textDecoration: "none" }} to="/">
                        <div className="CourseLearn_Head_Navbar_icons">
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                    </Link>
                    <div className="CourseLearn_Head_Navbar_image_container">
                        <Link to="/">
                            <img
                                className="CourseLearn_Head_Navbar_image"
                                src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png"
                                alt="Ảnh"
                            />
                        </Link>
                    </div>
                    <div className="CourseLearn_Head_Navbar_title">
                        <span>HTML CSS từ Zero đến Hero</span>
                    </div>
                </div>
                <div className="CourseLearn_Head_circle">
                    <div style={style} className="circle">
                        <div className="number">86%</div>
                    </div>
                    <span>1/166 bài học</span>
                </div>
            </div>
            <div className="CourseLearn_body">
                <div className="CourseLearn_body_detail_container">
                    <div className="CourseLearn_body_detail">
                        <div>
                            <div className="CourseLearn_body_detail_video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/Ocm9fxC1YAY"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="CourseLearn_body_detail_content">
                                <div className="CourseLearn_body_detail_content_title">
                                    <span>Nội dung</span>
                                </div>
                                <div className="CourseLearn_body_detail_content_teacher">
                                    <span>
                                        <i>
                                            Giáo viên giảng dạy:
                                            <Link
                                                style={{ marginLeft: "0.5rem" }}
                                                to="/"
                                            >
                                                Minh Quang
                                            </Link>
                                        </i>
                                    </span>
                                </div>
                                <div className="CourseLearn_body_detail_content_clearly">
                                    Tham gia các cộng đồng để cùng học hỏi, chia
                                    sẻ và "thám thính" xem F8 sắp có gì mới nhé!
                                    Fanpage:
                                    https://www.facebook.com/f8vnofficial Group:
                                    https://www.facebook.com/groups/649972919142215
                                    Youtube:
                                    https://www.youtube.com/F8VNOfficial Sơn
                                    Đặng: https://www.facebook.com/sondnf8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CourseLearn_body_content_wrap">
                    <div className="CourseLearn_body_content">
                        <div>
                            <div className="CourseLearn_body_title">
                                <span>Nội dung bài học</span>
                            </div>
                            <div>
                                <CourseLearnCard />
                                <CourseLearnCard />
                                <CourseLearnCard />
                                <CourseLearnCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseLearn;
