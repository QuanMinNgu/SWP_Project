import React, { useState } from "react";
import "../style.scss";
import Select from "react-select";
import { Link } from "react-router-dom";
import Pagination from "../../paginating/Pagination";
import UserManagerCard from "./UserManagerCard";
const UserManager = () => {
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

    const [vocher, setVocher] = useState("");

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
                            <th className="u_tstt">STT</th>
                            <th className="u_tuser">User</th>
                            <th className="u_trule">Rule</th>
                            <th className="u_tbars"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserManagerCard />
                        <UserManagerCard />
                        <UserManagerCard />
                        <UserManagerCard />
                        <UserManagerCard />
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
};

export default UserManager;
