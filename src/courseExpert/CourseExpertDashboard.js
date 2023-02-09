import React, { useRef, useState } from "react";
import "./style.scss";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../admin/style.scss";
import Pagination from "../paginating/Pagination";
import CourseExpertCard from "./CourseExpertCard";
import CourseExpertUpdate from "./CourseExpertUpdate";
const CourseExpertDashboard = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [scrolldown, setScrolldown] = useState(false);

    const [checkAll, setCheckAll] = useState(false);

    const [expert, setExpert] = useState(false);
    const checkRef = useRef();
    const options = [
        { value: "free", label: "Free" },
        { value: "no-free", label: "Not Free" },
    ];

    const optionsKind = [
        { value: "ha-noi", label: "Software" },
        { value: "strawberry", label: "Financial" },
        { value: "vanilla", label: "Marketing" },
    ];

    const optionsSort = [
        { value: "vanilla", label: "Stars Increased" },
        { value: "asd", label: "Stars Decreased" },
        { value: "vaniasdlla", label: "Newest" },
        { value: "vanilsla", label: "Oldest" },
    ];

    const handleChangeInput = () => {
        if (checkRef.current?.checked) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    };

    const handleChooseExpert = () => {
        const check = window.confirm(
            "Bạn có muốn chọn Minh Quang thành course expert của khóa học này không?"
        );
    };

    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="dashboard">
            <div className="dashboard_navbar">
                <div className="dashboard_title"># DASHMIN</div>
                <div className="dashboard_account">
                    <div className="dashboard_account_img">
                        <img
                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="dashboard_account_infor">
                        <h6>Quang Minh</h6>
                        <span>Course Expert</span>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate(`/course_expert/dashboard`);
                    }}
                    className={`dashboard_navbar_items ${
                        slug === "dashboard" ? "active" : ""
                    }`}
                >
                    <div
                        className={`dashboard_icons_container ${
                            slug === "dashboard" ? "active" : ""
                        }`}
                    >
                        <i className="fa-solid fa-gauge icons_admin"></i>
                    </div>{" "}
                    Course Manager
                </div>
            </div>
            <div className="dashboard_head">
                <div className="dashboard_input">
                    <input type="text" placeholder="Searching" />
                </div>
                <div className="dashboard_head_account">
                    <div className="dashboard_head_img">
                        <img
                            src="https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg"
                            alt="Ảnh"
                        />
                    </div>
                    <div
                        onClick={() => {
                            setScrolldown(!scrolldown);
                        }}
                        className="dashboard_head_name"
                    >
                        <span>Minh Quang</span>
                        {!scrolldown ? (
                            <i className="fa-solid fa-chevron-down"></i>
                        ) : (
                            <i className="fa-solid fa-chevron-up"></i>
                        )}
                        {scrolldown && (
                            <div className="dashboard_head_scrolldown">
                                <Link
                                    className="dashboard_scrolldown_items"
                                    to="/me/profile"
                                >
                                    <div className="dashboard_scrolldown_items_detail">
                                        My Profile
                                    </div>
                                </Link>
                                <Link
                                    className="dashboard_scrolldown_items"
                                    to="/settings/personal"
                                >
                                    <div className="dashboard_scrolldown_items_detail">
                                        Setting
                                    </div>
                                </Link>
                                <div className="dashboard_scrolldown_items_detail">
                                    Log Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="dashboard_detail">
                {slug === "dashboard" && (
                    <div className="managerCourse">
                        <div className="managerCourse_navbar">
                            <Select
                                className="search_wrap_select"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder="Price"
                            />
                            <Select
                                className="search_wrap_select"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={optionsKind}
                                placeholder="Kind"
                            />
                            <Select
                                className="search_wrap_select"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={optionsSort}
                                placeholder="Sort"
                            />
                            <button>Tìm Kiếm</button>
                        </div>
                        <div className="manageCourse_table">
                            <table className="table">
                                <thead className="thead">
                                    <tr className="thead_wrap">
                                        <th
                                            style={{ fontWeight: "700" }}
                                            className="thead_title"
                                        >
                                            Course Name & Detail
                                        </th>
                                        <th
                                            style={{ fontWeight: "700" }}
                                            className="thead_price"
                                        >
                                            Type
                                        </th>
                                        <th
                                            style={{ fontWeight: "700" }}
                                            className="thead_courseExpert"
                                        >
                                            Course Expert
                                        </th>
                                        <th
                                            style={{ fontWeight: "700" }}
                                            className="thead_status"
                                        >
                                            Status
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CourseExpertCard />
                                    <CourseExpertCard />
                                    <CourseExpertCard />
                                    <CourseExpertCard />
                                    <CourseExpertCard />
                                    <CourseExpertCard />
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <Pagination />
                        </div>
                    </div>
                )}
                {slug === "update" && <CourseExpertUpdate />}
            </div>
        </div>
    );
};

export default CourseExpertDashboard;
