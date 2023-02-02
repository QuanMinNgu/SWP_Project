import React from "react";
import "./style.scss";
const DashboardDetail = () => {
    return (
        <div className="dashboard_main">
            <div className="dashboard_statistic">
                <div className="row">
                    <div className="col c-6 m-4 l-3">
                        <div className="dashboard_statistic_items">
                            <div className="dashboard_statistic_items_img">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="dashboard_statistic_items_infor">
                                <p>Total Account</p>
                                <h6>1200</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <div className="dashboard_statistic_items">
                            <div className="dashboard_statistic_items_img">
                                <i className="fa-solid fa-money-bill"></i>
                            </div>
                            <div className="dashboard_statistic_items_infor">
                                <p>Total Income</p>
                                <h6>$ 120.000</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <div className="dashboard_statistic_items">
                            <div className="dashboard_statistic_items_img">
                                <i className="fa-solid fa-pager"></i>
                            </div>
                            <div className="dashboard_statistic_items_infor">
                                <p>Total Courses</p>
                                <h6>120</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col c-6 m-4 l-3">
                        <div className="dashboard_statistic_items">
                            <div className="dashboard_statistic_items_img">
                                <i className="fa-solid fa-blog"></i>
                            </div>
                            <div className="dashboard_statistic_items_infor">
                                <p>Total Blog</p>
                                <h6>120</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDetail;
