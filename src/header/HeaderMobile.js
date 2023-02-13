import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const HeaderMobile = () => {
    const [bars, setBars] = useState(false);
    return (
        <div className="header_mobile">
            <div
                onClick={() => {
                    setBars(true);
                }}
                className="header_mobile_icons"
            >
                <i className="fa-solid fa-bars"></i>
            </div>
            {bars && (
                <div
                    onClick={() => {
                        setBars(false);
                    }}
                    className="header_mobile_abs_p"
                ></div>
            )}
            <div
                className={`header_mobile_abs ${
                    bars ? "header_mobile_abs_a" : "header_mobile_abs_d"
                }`}
            >
                <div className="header_mobile_close_icons">
                    <div
                        onClick={() => {
                            setBars(false);
                        }}
                        className="header_mobile_close_icons_wrap"
                    >
                        &times;
                    </div>
                </div>
                <Link className="header_mobile_link" to="/">
                    <div
                        onClick={() => {
                            setBars(false);
                        }}
                        className="header_mobile_items items_head"
                    >
                        <i>Trang Chủ</i>
                    </div>
                </Link>
                <Link className="header_mobile_link" to="/courses/tim-kiem">
                    <div
                        onClick={() => {
                            setBars(false);
                        }}
                        className="header_mobile_items"
                    >
                        <i>Khóa học</i>
                    </div>
                </Link>
                <Link className="header_mobile_link" to="/blog">
                    <div
                        onClick={() => {
                            setBars(false);
                        }}
                        className="header_mobile_items"
                    >
                        <i>Blog</i>
                    </div>
                </Link>
                <Link className="header_mobile_link" to="/me/new-post">
                    <div
                        onClick={() => {
                            setBars(false);
                        }}
                        className="header_mobile_items"
                    >
                        <i>Viết Blog</i>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HeaderMobile;
