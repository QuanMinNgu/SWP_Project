import React, { useRef, useState } from "react";
import "../style.scss";
import Select from "react-select";
import CourseManagerCard from "./CourseManagerCard";
import Pagination from "../../paginating/Pagination";
import { useNavigate } from "react-router-dom";
const CourseManager = () => {
    const [checkAll, setCheckAll] = useState(false);

    const navigate = useNavigate();

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
                            <th
                                style={{ fontWeight: "700" }}
                                className="thead_checkbox"
                            >
                                <label htmlFor="checkall">All</label>
                                <input
                                    onChange={() => {
                                        handleChangeInput();
                                    }}
                                    ref={checkRef}
                                    id="checkall"
                                    type="checkbox"
                                />
                            </th>
                            <th className="thead_bars">
                                <div className="thead_bars_icons">
                                    <i
                                        onClick={() => {
                                            setBars(!bars);
                                        }}
                                        className="fa-solid fa-ellipsis"
                                    ></i>
                                    {bars && (
                                        <div className="bars_detail">
                                            <div className="bars_detail_items">
                                                <i>Cg Inactive</i>
                                            </div>
                                            <div className="bars_detail_items">
                                                <i>Cg Active</i>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setExpert(true);
                                                    setBars(false);
                                                }}
                                                className="bars_detail_items"
                                            >
                                                <i>Cg CExpert</i>
                                            </div>
                                            <div className="bars_detail_items">
                                                <i>Delete</i>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                        <CourseManagerCard
                            checkAll={checkAll}
                            setExpert={setExpert}
                        />
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination />
            </div>
            {expert && (
                <div
                    onClick={() => {
                        setExpert(false);
                    }}
                    className="user_manager_information"
                ></div>
            )}
            {expert && (
                <div className="expertCourse_container">
                    <div className="expertCourse_close">
                        <div
                            onClick={() => {
                                setExpert(false);
                            }}
                            className="expertCourse_close_icons"
                        >
                            &times;
                        </div>
                    </div>
                    <div className="expertCourse_searching">
                        <input
                            type="text"
                            placeholder="Searching by id, name or email"
                        />
                        <button className="button">Search</button>
                    </div>
                    <div className="expertCourse_form">
                        <table className="ex_table">
                            <thead className="ex_thead">
                                <tr className="ex_thead_wrap">
                                    <th className="ex_thead_title">User</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button>Choose</button>
                                    </th>
                                </tr>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button onClick={handleChooseExpert}>
                                            Choose
                                        </button>
                                    </th>
                                </tr>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button>Choose</button>
                                    </th>
                                </tr>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button>Choose</button>
                                    </th>
                                </tr>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button>Choose</button>
                                    </th>
                                </tr>
                                <tr className="ex_thead_wrap_items">
                                    <th className="ex_thead_title">
                                        <div className="ex_thead_user">
                                            <div className="ex_thead_user_img">
                                                <img
                                                    src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className="ex_thead_user_infor">
                                                <div className="ex_thead_user_infor_name">
                                                    Minh Quang
                                                </div>
                                                <i className="ex_thead_user_infor_email">
                                                    quangminhnguyen265@gmail.com
                                                </i>
                                                <i className="ex_thead_user_infor_id">
                                                    ID:1231232
                                                </i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="ex_thead_button">
                                        <button>Choose</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManager;
