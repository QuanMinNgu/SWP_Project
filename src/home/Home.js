import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import SwiperJs from "../swiper/SwiperJs";
import "./style.scss";
const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="home_sp">
            <div className="home_sp_slide">
                <SwiperJs />
            </div>
            <div className="home_sp_wrap">
                <div className="home_sp_list">
                    <div className="home_sp_list_title">
                        <h1>New courses</h1>
                    </div>
                    <div className="home_sp_list_card">
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
                        </div>
                    </div>
                    <div className="home_sp_watch">
                        <Link
                            className="home_sp_watch_link"
                            style={{ textDecoration: "none" }}
                            to="/courses/tim-kiem"
                        >
                            See all <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </div>
                </div>
                <div className="home_sp_list">
                    <div className="home_sp_list_title">
                        <h1>Featured courses</h1>
                    </div>
                    <div className="home_sp_list_card">
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
                        </div>
                    </div>
                    <div className="home_sp_watch">
                        <Link
                            className="home_sp_watch_link"
                            style={{ textDecoration: "none" }}
                            to="/courses/tim-kiem"
                        >
                            See all <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </div>
                </div>
                <div className="home_sp_list">
                    <div className="home_sp_list_title">
                        <h1>Free courses</h1>
                    </div>
                    <div className="home_sp_list_card">
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
                        </div>
                    </div>
                    <div className="home_sp_watch">
                        <Link
                            className="home_sp_watch_link"
                            style={{ textDecoration: "none" }}
                            to="/courses/tim-kiem"
                        >
                            See all <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
