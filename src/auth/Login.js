import React, { useEffect, useRef } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isLogin, isSuccess } from "../redux/slice/auth";
import HomeIcons from "../components/another/HomeIcons";
import { toast } from "react-toastify";
const Login = () => {
	const dispatch = useDispatch();
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const handleLogin = async () => {
		const user = {
			gmail: emailRef.current?.value,
			password: passwordRef.current?.value,
		};
		if (!user.gmail || !user.password) {
			return toast.error("Please enter all value.");
		}
		if (user.password.length < 8) {
			return toast.error("Password or email are not correct.");
		}
		dispatch(isLoading());
		try {
			const data = await axios.post("/api/auth/login", {
				...user,
			});
			toast.success(data?.data?.msg);
			dispatch(isLogin(data?.data));
			navigate("/");
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
		window.FB.login(
			function (response) {
				const url = `https://graph.facebook.com/${response.authResponse.userID}?fields=id,name,email,picture&access_token=${response.authResponse.accessToken}`;
				const data = axios
					.get(url)
					.then((res) => {
						handleLoginByFacebook(res?.data);
					})
					.catch((err) => {
						dispatch(isFailing());
						toast.error(err?.response?.data?.msg);
					});
			},
			{ scope: "email" }
		);
	};

	function parseJwt(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}
	const handleLoginByFacebook = async (e) => {
		dispatch(isLoading());
		try {
			const data = await axios.post("/api/auth/login", {
				gmail: e.email,
				id: e.id,
				type: "facebook",
			});
			toast.success(data?.data?.msg);
			dispatch(isLogin(data?.data));
			navigate("/");
		} catch (err) {
			dispatch(isFailing());
			toast.error(err?.response?.data?.msg);
		}
	};

	const handleCallbackGoogle = async (response) => {
		const user = parseJwt(response.credential);
		dispatch(isLoading());
		try {
			const data = await axios.post("/api/auth/login", {
				gmail: user.email,
				id: user.sub,
				type: "google",
			});
			toast.success(data?.data?.msg);
			dispatch(isLogin(data?.data));
			navigate("/");
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
							<h2>Login</h2>
						</div>
						<div className="auth_wrap_input">
							<label>Email:</label>
							<input
								ref={emailRef}
								name="email"
								type="text"
								placeholder="Enter Email"
							/>
						</div>
						<div className="auth_wrap_input">
							<label>Password:</label>
							<input
								ref={passwordRef}
								id="passwordRef"
								name="password"
								type="password"
								placeholder="Enter Password"
							/>
						</div>
						<div className="auth_wrap_forgot">
							<Link className="auth_wrap_forgot_link" to="/forgot_password">
								Forgot password ?
							</Link>
						</div>
						<div className="auth_wrap_appear">
							<label htmlFor="password">Show password ?</label>
							<input
								onClick={() => {
									if (document.getElementById("passwordRef").type === "text") {
										document.getElementById("passwordRef").type = "password";
									} else {
										document.getElementById("passwordRef").type = "text";
									}
								}}
								id="password"
								type="checkbox"
							/>
						</div>
						<div className="auth_wrap_button">
							<button onClick={handleLogin}>Login</button>
						</div>
						<div className="auth_wrap_register">
							<span>
								Do you already have an account{" "}
								<Link className="auth_wrap_register_link" to="/register">
									Register ?
								</Link>
							</span>
						</div>
						<div className="auth_wrap_other">
							<div id="loginGoogle"></div>
							<div onClick={handleLoginFacebook} className="auth_wrap_other_fb">
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

export default Login;
