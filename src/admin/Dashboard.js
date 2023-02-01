import React from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
const Dashboard = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    return (
        <div className="dashboard">
            <div className="dashboard_navbar">
                <div className="dashboard_title"># DASHMIN</div>
                <div className="dashboard_account">
                    <div className="dashboard_account_img">
                        <img
                            src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="dashboard_account_infor">
                        <h6>Quang Minh</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate(`/admin/dashboard`);
                    }}
                    className={`dashboard_navbar_items ${
                        slug === "dashboard" ? "active" : ""
                    }`}
                >
                    <div
                        className={`dashboard_icons_container ${
                            slug === "dashboard" ? "active" : ""
                        }`}
                    >
                        <i className="fa-solid fa-gauge icons_admin"></i>
                    </div>{" "}
                    Dashboard
                </div>
                <div
                    onClick={() => {
                        navigate(`/admin/user_manager`);
                    }}
                    className={`dashboard_navbar_items ${
                        slug === "user_manager" ? "active" : ""
                    }`}
                >
                    <div
                        className={`dashboard_icons_container ${
                            slug === "user_manager" ? "active" : ""
                        }`}
                    >
                        <i className="fa-solid fa-users"></i>
                    </div>{" "}
                    User Manager
                </div>
                <div
                    onClick={() => {
                        navigate(`/admin/course_manager`);
                    }}
                    className={`dashboard_navbar_items ${
                        slug === "course_manager" ? "active" : ""
                    }`}
                >
                    <div
                        className={`dashboard_icons_container ${
                            slug === "course_manager" ? "active" : ""
                        }`}
                    >
                        <i className="fa-brands fa-discourse"></i>
                    </div>{" "}
                    Courses Manager
                </div>
                <div
                    onClick={() => {
                        navigate(`/admin/blog_manager`);
                    }}
                    className={`dashboard_navbar_items ${
                        slug === "blog_manager" ? "active" : ""
                    }`}
                >
                    <div
                        className={`dashboard_icons_container ${
                            slug === "blog_manager" ? "active" : ""
                        }`}
                    >
                        <i className="fa-solid fa-blog"></i>
                    </div>{" "}
                    Blog Manager
                </div>
            </div>
            <div className="dashboard_head">
                <div className="dashboard_head_account">
                    <div className="dashboard_head_img">
                        <img
                            src="https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="dashboard_head_name">
                        <span>Minh Quang</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div className="dashboard_detail"></div>
        </div>
    );
};

export default Dashboard;
