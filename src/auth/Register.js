import React, { useEffect, useRef } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isLogin, isSuccess } from "../redux/slice/auth";
import HomeIcons from "../components/another/HomeIcons";
import { toast } from "react-toastify";
const Register = () => {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const nameRef = useRef();
    const navigate = useNavigate();

    const handleRegister = async () => {
        const user = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            name: nameRef.current?.value,
            rePassword: rePasswordRef.current?.value,
        };
        if (!user.email || !user.password || !user.name || !user.rePassword) {
            return toast.error("Vui lòng điề hết thông tin.");
        }
        if (user.password.length < 8) {
            return toast.error("Mật khẩu cần lớn hơn 8 ký tự.");
        }
        if (user.password !== user.rePassword) {
            return toast.error("Mật khẩu không khớp.");
        }
        dispatch(isLoading());
        try {
            const data = await axios.post("/api/auth/register", {
                ...user,
                type: "normal",
            });
            toast.success(data?.data?.msg);
            dispatch(isSuccess());
            navigate("/login");
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };

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
        window.FB.login(function (response) {
            const url = `https://graph.facebook.com/${response.authResponse.userID}?fields=id,name,email,picture&access_token=${response.authResponse.accessToken}`;
            const data = axios
                .get(url)
                .then((res) => {
                    handleRegisterByFacebook(res?.data);
                })
                .catch((err) => {
                    dispatch(isFailing());
                    toast.error(err?.response?.data?.msg);
                });
        });
    };

    function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }
    const handleRegisterByFacebook = async (e) => {
        dispatch(isLoading());
        try {
            const data = await axios.post("/api/auth/register", {
                email: e.email,
                name: e.name,
                type: "facebook",
                image: e.picture.data.url,
                id: e.id,
            });
            toast.success(data?.data?.msg);
            dispatch(isSuccess());
            navigate("/login");
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };

    const handleCallbackGoogle = async (response) => {
        const user = parseJwt(response.credential);
        dispatch(isLoading());
        try {
            const data = await axios.post("/api/auth/register", {
                email: user.email,
                name: user.name,
                type: "google",
                image: user.picture,
                id: user.sub,
            });
            toast.success(data?.data?.msg);
            dispatch(isSuccess());
            navigate("/login");
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };
    return (
        <div className="auth">
            <div className="grid wide">
                <div className="auth_container">
                    <div className="auth_wrap">
                        <div className="auth_wrap_title">
                            <h2>Đăng Ký</h2>
                        </div>
                        <div className="auth_wrap_input">
                            <label>Tên Hiển Thị:</label>
                            <input
                                ref={nameRef}
                                name="name"
                                type="text"
                                placeholder="Nhập tên hiển thị"
                            />
                        </div>
                        <div className="auth_wrap_input">
                            <label>Email:</label>
                            <input
                                ref={emailRef}
                                name="email"
                                type="text"
                                placeholder="Nhập Email"
                            />
                        </div>
                        <div className="auth_wrap_input">
                            <label>Mật Khẩu:</label>
                            <input
                                ref={passwordRef}
                                id="passwordRef"
                                name="password"
                                type="password"
                                placeholder="Nhập Mật Khẩu"
                            />
                        </div>
                        <div className="auth_wrap_input">
                            <label>Nhập Lại Mật Khẩu:</label>
                            <input
                                ref={rePasswordRef}
                                id="repasswordRef"
                                name="repassword"
                                type="password"
                                placeholder="Nhập Mật Khẩu"
                            />
                        </div>
                        <div className="auth_wrap_forgot">
                            <Link
                                className="auth_wrap_forgot_link"
                                to="/forgot_password"
                            >
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
                                        document.getElementById(
                                            "repasswordRef"
                                        ).type = "password";
                                    } else {
                                        document.getElementById(
                                            "passwordRef"
                                        ).type = "text";
                                        document.getElementById(
                                            "repasswordRef"
                                        ).type = "text";
                                    }
                                }}
                                id="password"
                                type="checkbox"
                            />
                        </div>
                        <div className="auth_wrap_button">
                            <button onClick={handleRegister}>Đăng Ký</button>
                        </div>
                        <div className="auth_wrap_register">
                            <span>
                                Bạn đã có tài khoản{" "}
                                <Link
                                    className="auth_wrap_register_link"
                                    to="/login"
                                >
                                    Đăng nhập ?
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
            <HomeIcons />
        </div>
    );
};

export default Register;
