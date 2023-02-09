import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CourseExpertCard = () => {
    const [bars, setBars] = useState(false);
    const navigate = useNavigate();
    return (
        <tr className="thead_wrap_items">
            <th className="thead_title">
                <div className="thead_card_container">
                    <div className="thead_img">
                        <img
                            src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="thead_card_name">
                        <div>
                            <Link className="thead_card_name-link" to="/">
                                Khóa học html,css for begginer
                            </Link>
                        </div>
                        <span className="thead_card_price">
                            <i className="thead_card_oldPrice">$120</i>
                            <i className="thead_card_newPrice">$100</i>
                        </span>
                    </div>
                </div>
            </th>
            <th className="thead_price">SE</th>
            <th className="thead_courseExpert">
                <div className="courseExpert_infor">
                    <div className="courseExpert_infor_img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="courseExpert_infor_name">
                        <h6>
                            <Link className="courseExpert_name" to="/">
                                Quang Minh Nguyen
                            </Link>
                        </h6>
                        <span>ID:12323332</span>
                    </div>
                </div>
            </th>
            <th className="thead_status noactive_status">Inactive</th>
            <th className="thead_bars">
                <div
                    onClick={() => {
                        setBars(!bars);
                    }}
                    className="thead_bars_icons"
                >
                    <i className="fa-solid fa-ellipsis"></i>
                    {bars && (
                        <div className="vc_bars_detail">
                            <div
                                onClick={() => {
                                    navigate("/course_expert/update?id=asd");
                                }}
                                className="vc_bars_detail_items"
                            >
                                <i>Update</i>
                            </div>
                        </div>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default CourseExpertCard;
