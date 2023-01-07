import React, { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isLogin } from "../redux/slice/auth";
const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.google?.accounts?.id?.initialize({
            client_id:
                "348299817023-08tbro4o6guo2csu2lv16mai16m4a8ce.apps.googleusercontent.com",
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

    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "630395928843735",
                cookie: true,
                xfbml: true,
                version: "v14.0",
            });

            window.FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    const handleLoginFacebook = () => {
        window.FB.login(
            function (response) {
                console.log(response);
                // dispatch(isLoading());
                // const data = axios
                //     .post("/api/auth/facebook/login", {
                //         userId: response?.authResponse?.userID,
                //         token: response?.authResponse?.accessToken,
                //     })
                //     .then((res) => {
                //         toast.success(res?.data?.msg);
                //         dispatch(isLogin(res?.data));
                //         navigate("/");
                //     })
                //     .catch((err) => {
                //         toast.error(err?.response?.data?.msg);
                //         dispatch(isFailing());
                //     });
            },
            { scope: "email" }
        );
    };

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
                            <div
                                onClick={handleLoginFacebook}
                                className="auth_wrap_other_fb"
                            >
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
