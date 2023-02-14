import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import "../style.scss";
const UserManagerCard = ({ setUserInfor, item }) => {
    const [bars, setBars] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleChangeRule = async (role) => {
        if (role === item?.role) {
            return;
        }
        dispatch(isLoading());
        console.log({
            token: auth.user?.accessToken,
            role: role,
        });
        try {
            const data = await axios.post(
                `/api/account/change_role/id=${item?.id}`,
                {
                    token: auth.user?.accessToken,
                    role: role,
                }
            );
            toast.success(data?.data?.msg);
            dispatch(isSuccess());
        } catch (err) {
            dispatch(isFailing());
            return toast.error(err?.response?.data?.msg);
        }
    };
    return (
        <tr className="u_drow">
            <th className="u_dstt">1</th>
            <th className="u_duser">
                <div className="user_maner_infor">
                    <div className="user_maner_infor_img">
                        <img src={item?.image} alt="Ảnh" />
                    </div>
                    <div className="user_maner_infor_name">
                        <h6>
                            <div className="user_maner_name">{item?.name}</div>
                        </h6>
                        <i className="user_email_infor_email">{item?.gmail}</i>
                        <span>
                            <i>ID:{item?.id}</i>
                        </span>
                    </div>
                </div>
            </th>
            <th className="u_drule">{item?.role}</th>
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
                            <div
                                onClick={() => handleChangeRule("admin")}
                                className="bars_detail_items"
                            >
                                <i>Cg Admin</i>
                            </div>
                            <div
                                onClick={() => handleChangeRule("sale")}
                                className="bars_detail_items"
                            >
                                <i>Cg Saler</i>
                            </div>
                            <div
                                onClick={() => handleChangeRule("courseExpert")}
                                className="bars_detail_items"
                            >
                                <i>Cg CoExpert</i>
                            </div>
                            <div
                                onClick={() => handleChangeRule("user")}
                                className="bars_detail_items"
                            >
                                <i>Cg User</i>
                            </div>
                        </div>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default UserManagerCard;
