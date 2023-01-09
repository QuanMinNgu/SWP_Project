import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import CourseHeadCard from "../card/CourseHeadCard";
import AnnouceCard from "../card/AnnouceCard";
import axios from "axios";
const Header = () => {
    const [course, setCourse] = useState(false);
    const [annouce, setAnnouce] = useState(false);
    const [sign, setSign] = useState(false);

    return (
        <div className="header">
            <div className="header_brand">
                <Link className="header_brand_link" to="/">
                    <img
                        src="https://res.cloudinary.com/sttruyen/image/upload/v1672999350/another/fgg3gugtval0mdtgonie.png"
                        alt="brand"
                    />
                </Link>
                <span>Học lập trình để đi làm</span>
            </div>
            <div className="header_search">
                <div className="header_search_container">
                    <div className="header_search_icons">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học, video, bài viết."
                    />
                </div>
            </div>
            {sign ? (
                <div className="header_navbar">
                    <div className="header_navbar_items">
                        <span className="header_navbar_items_title">
                            <button
                                onClick={() => {
                                    setCourse(!course);
                                    setAnnouce(false);
                                }}
                            >
                                Khóa học của tôi
                            </button>
                            {course && (
                                <div className="header_navbar_items_course">
                                    <div className="header_navbar_items_course_title">
                                        <h5>Khóa học của tôi</h5>
                                    </div>
                                    <div className="header_navbar_items_course_card">
                                        <CourseHeadCard />
                                    </div>
                                </div>
                            )}
                        </span>
                    </div>
                    <div className="header_navbar_items header_navbar_items_bell">
                        <i
                            onClick={() => {
                                setAnnouce(!annouce);
                                setCourse(false);
                            }}
                            className="fa-solid fa-bell"
                        ></i>
                        {annouce && (
                            <div className="header_navbar_items_bell_noti">
                                <div className="header_navbar_items_bell_noti_title">
                                    <h6>Thông Báo</h6>
                                    <div>
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="header_navbar_items_bell_noti_card">
                                    <AnnouceCard />
                                    <AnnouceCard />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="header_navbar_items">
                        <div className="header_navbar_items_img_wrap">
                            <img
                                className="header_navbar_items_img"
                                src="https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg"
                                alt="Ảnh"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header_navbar">
                    <Link style={{ textDecoration: "none" }} to="/login">
                        <div className="header_navbar_button">Đăng Nhập</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
