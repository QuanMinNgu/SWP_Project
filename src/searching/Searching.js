import React, { useState } from "react";
import "./style.scss";
import Card from "../card/Card";
import Pagination from "../paginating/Pagination";
import Select from "react-select";
const Searching = () => {
    const options = [
        { value: "ha-noi", label: "Hà Nội" },
        { value: "strawberry", label: "TP Hồ Chí Minh" },
        { value: "vanilla", label: "Vũng Tàu" },
        { value: "vanilla", label: "Huế" },
        { value: "vanilla", label: "Cần Thơ" },
        { value: "vanilla", label: "Tân Xã" },
    ];

    const optionsKind = [
        { value: "ha-noi", label: "Nước Uống" },
        { value: "strawberry", label: "Đồ Ăn Nhanh" },
        { value: "vanilla", label: "Đồ Ăn Chậm" },
    ];

    const optionsSort = [
        { value: "ha-noi", label: "Yêu Thích Tăng" },
        { value: "strawberry", label: "Yêu Thích Giảm" },
        { value: "vanilla", label: "Số Sao Tăng" },
        { value: "vanilla", label: "Số Sao Giảm" },
        { value: "vanilla", label: "Số Người Đánh Giá Tăng" },
        { value: "vanilla", label: "Số Người Đánh Giá Giảm" },
        { value: "vanilla", label: "Mới Nhất" },
        { value: "vanilla", label: "Cũ Nhất" },
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="searching">
            <div className="searching_title">
                <h1>Tìm kiếm khóa học</h1>
            </div>
            <div className="searching_head">
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Chọn vị trí"
                />
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={optionsKind}
                    placeholder="Chọn loại"
                />
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={optionsSort}
                    placeholder="Sắp xếp"
                />
                <button>Tìm Kiếm</button>
            </div>
            <div className="searching_card">
                <div className="row">
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                    <div className="col c-12 m-4 l-3">
                        <Card />
                    </div>
                </div>
            </div>
            <div className="searching_paginating">
                <Pagination />
            </div>
        </div>
    );
};

export default Searching;
