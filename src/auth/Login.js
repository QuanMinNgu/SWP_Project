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
				type: "icon",
				theme: "outline",
				size: "large",
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
			<section>
				<div class="leaves">
					<div class="set">
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Oc3aYTb.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/sjEjxPI.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/Z0YR03s.png" />
						</div>
						<div>
							<img src="https://i.imgur.com/fVYvICL.png" />
						</div>
					</div>
				</div>
				<img src="https://i.imgur.com/MosCSIH.png" class="bg" />
				<img src="https://i.imgur.com/Q50tX3l.png" class="girl" />
				<img src="https://i.imgur.com/J3FAXDV.png" class="girl1" />
				<img src="https://i.imgur.com/DjVcJFA.png" class="bikerboy" />
				<img src="https://i.imgur.com/tLXIflv.png" class="trees" />
				<div class="login">
					<h2>Login</h2>
					<div class="inputBox">
						<input type="text" ref={emailRef} placeholder="username" name="" />
					</div>
					<div class="inputBox">
						<input
							type="password"
							ref={passwordRef}
							placeholder="password"
							name=""
						/>
						<div
							onClick={() => {
								if (passwordRef.current) {
									if (passwordRef.current.type === "text") {
										passwordRef.current.type = "password";
									} else {
										passwordRef.current.type = "text";
									}
								}
							}}
							className="eyes_items"
						>
							<i className="fa-solid fa-eye"></i>
						</div>
					</div>
					<div class="inputBox">
						<input onClick={handleLogin} type="submit" value="Login" id="btn" />
					</div>
					<div class="group">
						<Link to="/forgot_password">Forgot password</Link>
						<Link style={{ textDecoration: "none" }} to="/register">
							Register
						</Link>
					</div>
					<div className="auth_wrap_other">
						<div id="loginGoogle"></div>
						<div onClick={handleLoginFacebook} className="auth_wrap_other_fb">
							<i className="fa-brands fa-facebook-f"></i>
						</div>
					</div>
				</div>
			</section>
			<HomeIcons />
		</div>
	);
};

export default Login;
