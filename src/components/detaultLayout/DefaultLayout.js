import React from "react";
import "./style.scss";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
const DefaultLayout = ({ children, type }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="header_wrap">
                <Header />
            </div>
            <div className="home">
                <div className="home_navbar">
                    <div
                        onClick={() => {
                            navigate("/me/new-post");
                        }}
                        className="home_navbar_plus"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <Link className="home_navbar_items" to="/">
                        <div className={type === "Home" ? "active" : ""}>
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link className="home_navbar_items" to="/">
                        <div className={type === "Learning" ? "active" : ""}>
                            <i className="fa-solid fa-lightbulb"></i>
                            <span>Học</span>
                        </div>
                    </Link>
                    <Link className="home_navbar_items" to="/blog">
                        <div className={type === "Blog" ? "active" : ""}>
                            <i className="fa-solid fa-calculator"></i>
                            <span>Blog</span>
                        </div>
                    </Link>
                </div>
                {children}
            </div>
            <div className="footer_wrap">
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
