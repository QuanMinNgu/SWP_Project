import React, { useRef, useState } from "react";
import "./style.scss";
import Select from "react-select";
import CourseManagerCard from "./CourseManagerCard";
const CourseManager = () => {
    const [checkAll, setCheckAll] = useState(false);

    const [bars, setBars] = useState(false);
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
                                                <i>Cg Status</i>
                                            </div>
                                            <div className="bars_detail_items">
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
                        <CourseManagerCard checkAll={checkAll} />
                        <CourseManagerCard checkAll={checkAll} />
                        <CourseManagerCard checkAll={checkAll} />
                        <CourseManagerCard checkAll={checkAll} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManager;
