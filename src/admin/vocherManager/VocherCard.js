import React, { useState } from "react";
import "../style.scss";
import { Link } from "react-router-dom";
const VocherCard = ({ setVocher }) => {
    const [bars, setBars] = useState(false);

    const handleDeleteVocher = () => {
        const check = window.confirm("Do you wanna delete this vocher?");
    };
    return (
        <tr className="s_drow">
            <th className="s_dcourse">
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
            <th className="s_dsale">$120</th>
            <th className="s_dto">
                <div
                    onClick={() => {
                        setVocher({});
                    }}
                    className="s_dto_div"
                >
                    Xem tất cả
                </div>
            </th>
            <th className="s_dfromdate">12/12/2002</th>
            <th className="s_dtodate">10/20/2002</th>
            <th className="s_dbars">
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
                                onClick={handleDeleteVocher}
                                className="vc_bars_detail_items"
                            >
                                <i>Delete</i>
                            </div>
                        </div>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default VocherCard;
