import React, { useState } from "react";
import "../style.scss";
const UserManagerCard = ({ setUserInfor }) => {
    const [bars, setBars] = useState(false);

    const handleBlockUser = () => {};
    return (
        <tr className="u_drow">
            <th className="u_dstt">1</th>
            <th className="u_duser">
                <div className="user_maner_infor">
                    <div className="user_maner_infor_img">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt="Ảnh"
                        />
                    </div>
                    <div className="user_maner_infor_name">
                        <h6>
                            <div className="user_maner_name">
                                Quang Minh Nguyen
                            </div>
                        </h6>
                        <i className="user_email_infor_email">
                            quangminhnguyen265@gmail.com
                        </i>
                        <span>
                            <i>ID:12323332</i>
                        </span>
                    </div>
                </div>
            </th>
            <th className="u_drule">User</th>
            <th className="u_dbars">
                <div
                    onClick={() => {
                        setBars(!bars);
                    }}
                    className="thead_bars_icons"
                >
                    <i className="fa-solid fa-ellipsis"></i>
                    {bars && (
                        <div className="bars_user_detail">
                            <div className="bars_detail_items">
                                <i>Cg Admin</i>
                            </div>
                            <div className="bars_detail_items">
                                <i>Cg Saler</i>
                            </div>
                            <div className="bars_detail_items">
                                <i>Cg CoExpert</i>
                            </div>
                            <div className="bars_detail_items">
                                <i>Cg User</i>
                            </div>
                            <div className="bars_detail_items">
                                <i>Block</i>
                            </div>
                        </div>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default UserManagerCard;
