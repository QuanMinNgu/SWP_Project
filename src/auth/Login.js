import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isLogin, isSuccess } from "../redux/slice/auth";
import HomeIcons from "../components/another/HomeIcons";
import { toast } from "react-toastify";
import { UserContext } from "../App";
const Login = () => {
	const dispatch = useDispatch();
	const emailRef = useRef();
	const passwordRef = useRef();

	const { setReType, retype } = useContext(UserContext);

	const [msg, setMsg] = useState({});

	const navigate = useNavigate();
	const handleLogin = async () => {
		const user = {
			gmail: emailRef.current?.value,
			password: passwordRef.current?.value,
		};
		let msgr = {};
		if (!user?.gmail) {
			msgr["gmail"] = "Gmail cannot be empty!";
		}
		if (!user.password) {
			msgr["password"] = "Password cannot be empty!";
		}

		if (user.password.length < 8 && !msgr["password"]) {
			msgr["password"] = "Password need more than 8 characters!";
		}
		if (msgr["gmail"] || msgr["password"]) {
			setMsg({ ...msgr });
			return;
		}
		dispatch(isLoading());
		try {
			const data = await axios.post("/api/auth/login", {
				...user,
			});
			toast.success(data?.data?.msg);
			dispatch(isLogin(data?.data));
			if (retype != "register") {
				navigate(-1);
				setReType("login");
			} else {
				navigate("/");
				setReType("login");
			}
		} catch (err) {
			dispatch(isFailing());
			let ms = {
				gmail: "Gmail or password are incorrect!",
				password: "Gmail or password are incorrect!",
			};

			setMsg({ ...ms });
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
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939541/another/l3q1ea8alrwhtvweid2p.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/qayvuhuhcafaptrv9qay.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939546/another/iycggpjlelz9qkdgyb7i.png" />
						</div>
						<div>
							<img src="https://res.cloudinary.com/sttruyen/image/upload/v1677939548/another/lqrsgyzillb26nbfw2j9.png" />
						</div>
					</div>
				</div>
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1677939634/another/xvivywsemezjozusubhc.png"
					class="bg"
				/>
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1677939662/another/qxu2ht94ggwigobzjt7b.png"
					class="girl"
				/>
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1677939671/another/h9flx2xhbewwws4mum5i.png"
					class="girl1"
				/>
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1677939696/another/bqvvw6z2tbax5v0s5epd.png"
					class="bikerboy"
				/>
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1677939712/another/uxilcnteauzggtpdrfwd.png"
					class="trees"
				/>
				<div class="login">
					<h2>Login</h2>
					<div class="inputBox">
						{msg["gmail"] && (
							<div
								style={{ color: "red", margin: "0.5rem 0", fontSize: "1.2rem" }}
							>
								* <i>{msg["gmail"]}</i>
							</div>
						)}
						<input type="text" ref={emailRef} placeholder="gmail" name="" />
					</div>
					{msg["password"] && (
						<div
							style={{
								color: "red",
								marginBottom: "-2.5rem",
								fontSize: "1.2rem",
							}}
						>
							* <i>{msg["password"]}</i>
						</div>
					)}
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
