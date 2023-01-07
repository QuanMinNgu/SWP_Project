import React, { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const Login = () => {
    useEffect(() => {
        window.google?.accounts?.id?.initialize({
            client_id:
                "253505384285-41s57dcujofqbpfnp2jdo2e7nt63f8f8.apps.googleusercontent.com",
            callback: handleCallbackGoogle,
        });
        window.google?.accounts?.id?.renderButton(
            document.getElementById("loginGoogle"),
            {
                theme: "outline",
                size: "medium",
            }
        );
        window.google?.accounts?.id?.prompt();
    }, [window.google?.accounts]);

    const handleCallbackGoogle = async (response) => {
        console.log(response);
    };
    return (
        <div className="auth">
            <div className="grid wide">
                <div className="auth_container">
                    <div className="auth_wrap">
                        <div className="auth_wrap_title">
                            <h2>Đăng Nhập</h2>
                        </div>
                        <div className="auth_wrap_input">
                            <label>Email:</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="Nhập Email"
                            />
                        </div>
                        <div className="auth_wrap_input">
                            <label>Mật Khẩu:</label>
                            <input
                                id="passwordRef"
                                name="password"
                                type="password"
                                placeholder="Nhập Mật Khẩu"
                            />
                        </div>
                        <div className="auth_wrap_forgot">
                            <Link className="auth_wrap_forgot_link" to="/">
                                Quên Mật Khẩu ?
                            </Link>
                        </div>
                        <div className="auth_wrap_appear">
                            <label htmlFor="password">
                                Hiển thị mật khẩu ?
                            </label>
                            <input
                                onClick={() => {
                                    if (
                                        document.getElementById("passwordRef")
                                            .type === "text"
                                    ) {
                                        document.getElementById(
                                            "passwordRef"
                                        ).type = "password";
                                    } else {
                                        document.getElementById(
                                            "passwordRef"
                                        ).type = "text";
                                    }
                                }}
                                id="password"
                                type="checkbox"
                            />
                        </div>
                        <div className="auth_wrap_button">
                            <button>Đăng Nhập</button>
                        </div>
                        <div className="auth_wrap_register">
                            <span>
                                Bạn đã có tài khoản{" "}
                                <Link
                                    className="auth_wrap_register_link"
                                    to="/register"
                                >
                                    Đăng Ký ?
                                </Link>
                            </span>
                        </div>
                        <div className="auth_wrap_other">
                            <div id="loginGoogle"></div>
                            <div className="auth_wrap_other_fb">
                                Đăng nhập bằng Facebook
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
