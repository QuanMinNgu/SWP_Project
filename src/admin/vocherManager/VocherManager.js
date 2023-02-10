import React, { useState } from "react";
import "../style.scss";
import Select from "react-select";
import Pagination from "../../paginating/Pagination";
import VocherCard from "./VocherCard";
import { Link } from "react-router-dom";
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
                            <th className="s_tcourse">Saler</th>
                            <th className="s_tsale">Sale</th>
                            <th className="s_tto">To</th>
                            <th className="s_tfromdate">fromDate</th>
                            <th className="s_ttodate">toDate</th>
                            <th className="s_tbars"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                        <VocherCard setVocher={setVocher} />
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination />
            </div>
            {vocher && (
                <div
                    onClick={() => {
                        setVocher("");
                    }}
                    className="user_manager_information"
                ></div>
            )}
            {vocher && (
                <div className="vocher_to">
                    <div className="expertCourse_close">
                        <div
                            onClick={() => {
                                setVocher("");
                            }}
                            className="expertCourse_close_icons"
                        >
                            &times;
                        </div>
                    </div>
                    <div className="vocher_to_for">
                        <div className="vocher_to_user">
                            <div className="vocher_to_for_title">For User</div>
                            <div className="vocher_to_form">
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                                <div className="vocher_to_user_card">
                                    <div className="vocher_to_user_img">
                                        <img
                                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className="vocher_to_user_infor">
                                        <div className="vocher_to_user_infor_name">
                                            Minh Quang
                                        </div>
                                        <i className="vocher_to_user_infor_email">
                                            quangminhnguyen265@gmail.com
                                        </i>
                                        <i className="vocher_to_user_infor_id">
                                            ID:1231232
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vocher_to_course">
                            <div className="vocher_to_for_title">
                                For Courses
                            </div>
                            <div className="vocher_to_form">
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                                <div className="vocher_to_card">
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
                                                Khóa học html,css for begginer
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VocherManager;
