import React from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import SwiperJs from "../swiper/SwiperJs";
import "./style.scss";
const Home = () => {
    return (
        <div className="home">
            <div className="home_navbar">
                <div className="home_navbar_plus">
                    <i className="fa-solid fa-plus"></i>
                </div>
                <Link className="home_navbar_items" to="/">
                    <div className="active">
                        <i className="fa-solid fa-house"></i>
                        <span>Home</span>
                    </div>
                </Link>
                <Link className="home_navbar_items" to="/">
                    <div>
                        <i className="fa-solid fa-road"></i>
                        <span>Lộ trình</span>
                    </div>
                </Link>
                <Link className="home_navbar_items" to="/">
                    <div>
                        <i className="fa-solid fa-lightbulb"></i>
                        <span>Học</span>
                    </div>
                </Link>
                <Link className="home_navbar_items" to="/blog">
                    <div>
                        <i className="fa-solid fa-calculator"></i>
                        <span>Blog</span>
                    </div>
                </Link>
            </div>
            <div className="home_sp">
                <div className="home_sp_slide">
                    <SwiperJs />
                </div>
                <div className="home_sp_wrap">
                    <div className="home_sp_list">
                        <div className="home_sp_list_title">
                            <h1>Khóa học mới</h1>
                        </div>
                        <div className="home_sp_list_card">
                            <div className="row">
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                            </div>
                        </div>
                        <div className="home_sp_watch">
                            <Link
                                className="home_sp_watch_link"
                                style={{ textDecoration: "none" }}
                                to="/"
                            >
                                Xem tất cả{" "}
                                <i className="fa-solid fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="home_sp_list">
                        <div className="home_sp_list_title">
                            <h1>Khóa học nổi bật</h1>
                        </div>
                        <div className="home_sp_list_card">
                            <div className="row">
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                            </div>
                        </div>
                        <div className="home_sp_watch">
                            <Link
                                className="home_sp_watch_link"
                                style={{ textDecoration: "none" }}
                                to="/"
                            >
                                Xem tất cả{" "}
                                <i className="fa-solid fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="home_sp_list">
                        <div className="home_sp_list_title">
                            <h1>Khóa học miễn phí</h1>
                        </div>
                        <div className="home_sp_list_card">
                            <div className="row">
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                                <div className="col c-6 m-4 l-3">
                                    <Card />
                                </div>
                            </div>
                        </div>
                        <div className="home_sp_watch">
                            <Link
                                className="home_sp_watch_link"
                                style={{ textDecoration: "none" }}
                                to="/"
                            >
                                Xem tất cả{" "}
                                <i className="fa-solid fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
