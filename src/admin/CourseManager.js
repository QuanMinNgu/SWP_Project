import React, { useState } from "react";
import "./style.scss";
import Select from "react-select";
import { Link } from "react-router-dom";
const CourseManager = () => {
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

    const [selectedOption, setSelectedOption] = useState(null);
    return (
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
                                Price
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
                            <th className="thead_bars"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="thead_wrap_items">
                            <th className="thead_title">
                                Course Name & Detail
                            </th>
                            <th className="thead_price">$120</th>
                            <th className="thead_courseExpert">
                                <div className="courseExpert_infor">
                                    <div className="courseExpert_infor_img">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="courseExpert_infor_name">
                                        <h6>
                                            <Link
                                                className="courseExpert_name"
                                                to="/"
                                            >
                                                Minh Quang
                                            </Link>
                                        </h6>
                                        <span>Course Expert</span>
                                    </div>
                                </div>
                            </th>
                            <th className="thead_status active_status">
                                Active
                            </th>
                            <th className="thead_bars">
                                <div className="thead_bars_icons">
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </th>
                        </tr>
                        <tr className="thead_wrap_items">
                            <th className="thead_title">
                                Course Name & Detail
                            </th>
                            <th className="thead_price">$140</th>
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
                                                Quang Minh Nguy
                                            </Link>
                                        </h6>
                                        <span>Course Expert</span>
                                    </div>
                                </div>
                            </th>
                            <th className="thead_status noactive_status">
                                Inactive
                            </th>
                            <th className="thead_bars">
                                <div className="thead_bars_icons">
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManager;
