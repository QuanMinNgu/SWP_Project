import React, { useRef, useState } from "react";
import "./style.scss";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../admin/style.scss";
import Pagination from "../paginating/Pagination";
const CourseExpertDashboard = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [scrolldown, setScrolldown] = useState(false);

    const [checkAll, setCheckAll] = useState(false);

    const [bars, setBars] = useState(false);

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
                    <div className="createButton">
                        <button
                            onClick={() => {
                                navigate("/admin/create_course");
                            }}
                        >
                            Create New Course
                        </button>
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
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr className="thead_wrap_items">
                                    <th className="thead_title">
                                        <div className="thead_card_container">
                                            <div className="thead_img">
                                                <img
                                                    src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="thead_card_name">
                                                <div>
                                                    <Link
                                                        className="thead_card_name-link"
                                                        to="/"
                                                    >
                                                        Khóa học html,css for
                                                        begginer
                                                    </Link>
                                                </div>
                                                <span className="thead_card_price">
                                                    <i className="thead_card_oldPrice">
                                                        $120
                                                    </i>
                                                    <i className="thead_card_newPrice">
                                                        $100
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_price">SE</th>
                                    <th className="thead_courseExpert">
                                        <div className="courseExpert_infor">
                                            <div className="courseExpert_infor_img">
                                                <img
                                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="courseExpert_infor_name">
                                                <h6>
                                                    <Link
                                                        className="courseExpert_name"
                                                        to="/"
                                                    >
                                                        Quang Minh Nguyen
                                                    </Link>
                                                </h6>
                                                <span>ID:12323332</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="thead_status noactive_status">
                                        Inactive
                                    </th>
                                    <th className="thead_bars">
                                        <div
                                            onClick={() => {
                                                setBars(!bars);
                                            }}
                                            className="thead_bars_icons"
                                        >
                                            <i className="fa-solid fa-ellipsis"></i>
                                            {bars && (
                                                <div className="vc_bars_detail">
                                                    <div className="vc_bars_detail_items">
                                                        <i>Update</i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseExpertDashboard;
