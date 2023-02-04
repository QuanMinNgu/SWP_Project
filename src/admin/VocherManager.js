import React, { useRef, useState } from "react";
import "./style.scss";
import Select from "react-select";
import CourseManagerCard from "./CourseManagerCard";
import Pagination from "../paginating/Pagination";
import VocherCard from "./VocherCard";
const VocherManager = () => {
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
            <div className="manageCourse_table">
                <table className="s_table">
                    <thead className="s_thead">
                        <tr className="s_trow">
                            <th className="s_tcourse">Course</th>
                            <th className="s_tsale">Sale</th>
                            <th className="s_tto">To</th>
                            <th className="s_tfromdate">fromDate</th>
                            <th className="s_ttodate">toDate</th>
                            <th className="s_tbars"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                        <VocherCard />
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
};

export default VocherManager;
