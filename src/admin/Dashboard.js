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
                    Blog Manager
                </div>
            </div>
            <div className="dashboard_detail"></div>
        </div>
    );
};

export default Dashboard;
