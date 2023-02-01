import React from "react";
import "./style.scss";
import Card from "../card/Card";
import Pagination from "../paginating/Pagination";
const Searching = () => {
    return (
        <div className="searching">
            <div className="searching_title">
                <h1>Tìm kiếm khóa học</h1>
            </div>
            <div className="searching_head"></div>
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
