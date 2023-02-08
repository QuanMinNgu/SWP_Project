import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.scss";
const CourseManagerCard = ({ checkAll, setExpert }) => {
    const cardRef = useRef(null);

    const [bars, setBars] = useState(false);

    const nagivate = useNavigate();

    useEffect(() => {
        if (cardRef.current) {
            if (checkAll) {
                cardRef.current.checked = true;
            } else {
                cardRef.current.checked = false;
            }
        }
    }, [checkAll]);
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
            <th style={{ fontWeight: "700" }} className="thead_checkbox">
                <input ref={cardRef} id="checkall" type="checkbox" />
            </th>
            <th className="thead_bars">
                <div
                    onClick={() => {
                        setBars(!bars);
                    }}
                    className="thead_bars_icons"
                >
                    <i className="fa-solid fa-ellipsis"></i>
                    {bars && (
                        <div className="bars_detail">
                            <div className="bars_detail_items">
                                <i>Cg Status</i>
                            </div>
                            <div
                                onClick={() => {
                                    setExpert(true);
                                }}
                                className="bars_detail_items"
                            >
                                <i>Cg CExpert</i>
                            </div>
                            <div
                                onClick={() => {
                                    nagivate("/admin/update_course?id=asd");
                                }}
                                className="bars_detail_items"
                            >
                                <i>Update</i>
                            </div>
                            <div className="bars_detail_items">
                                <i>Delete</i>
                            </div>
                        </div>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default CourseManagerCard;
