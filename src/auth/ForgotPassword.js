import React from "react";
import { Link } from "react-router-dom";
import HomeIcons from "../components/another/HomeIcons";
import "./style.scss";
const ForgotPassword = () => {
    return (
        <div className="auth">
            <div className="grid wide">
                <div className="auth_container">
                    <div className="auth_wrap">
                        <div className="auth_wrap_title">
                            <h2>Quên Mật Khẩu</h2>
                        </div>
                        <div className="auth_wrap_input">
                            <label>Email:</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Nhập Email lấy lại mật khẩu"
                            />
                        </div>
                        <div className="auth_wrap_forgot">
                            <Link className="auth_wrap_forgot_link" to="/login">
                                Đăng Nhập ?
                            </Link>
                        </div>
                        <div className="auth_wrap_button">
                            <button>Quên Mật Khẩu</button>
                        </div>
                    </div>
                </div>
            </div>
            <HomeIcons />
        </div>
    );
};

export default ForgotPassword;
