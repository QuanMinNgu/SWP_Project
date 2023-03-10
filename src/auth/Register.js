import React, { useContext, useEffect, useRef } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isLogin, isSuccess } from "../redux/slice/auth";
import HomeIcons from "../components/another/HomeIcons";
import { toast } from "react-toastify";
import { UserContext } from "../App";
const Register = () => {
	const dispatch = useDispatch();
	const emailRef = useRef();
	const passwordRef = useRef();
	const rePasswordRef = useRef();
	const nameRef = useRef();
	const navigate = useNavigate();

	const { setReType } = useContext(UserContext);

	useEffect(() => {
		setReType("register");
	}, []);

	const handleRegister = async () => {
		const user = {
			gmail: emailRef.current?.value,
			password: passwordRef.current?.value,
			name: nameRef.current?.value,
			rePassword: rePasswordRef.current?.value,
		};
		if (!user.gmail || !user.password || !user.name || !user.rePassword) {
			return toast.error("Please enter all value.");
		}
		if (user.name.length > 100) {
			return toast.error("Length of name can not over 100 characters.");
		}
		if (user.password.length < 8) {
			return toast.error("Password need more than 8 characters.");
		}
		if (user.password !== user.rePassword) {
			return toast.error("Password and Re-Password are not the same.");
		}
		dispatch(isLoading());
		console.log({
			...user,
			type: "normal",
			image:
				"https://res.cloudinary.com/sttruyen/image/upload/v1675845680/stphim/wmo0be0li80asrfw4uhw.jpg",
		});
		try {
			const data = await axios.post("/api/auth/register", {
				...user,
				type: "normal",
				image:
					"https://res.cloudinary.com/sttruyen/image/upload/v1675845680/stphim/wmo0be0li80asrfw4uhw.jpg",
			});
			toast.success(data?.data?.msg);
			dispatch(isSuccess());
			navigate("/login");
		} catch (err) {
			dispatch(isFailing());
			toast.error(err?.response?.data?.msg);
			if (err?.response?.data?.msgProgress) {
				err?.response?.data?.msgProgress?.forEach((item) => {
					toast.error(item);
				});
			}
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
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}
	const handleRegisterByFacebook = async (e) => {
		dispatch(isLoading());
		console.log({
			gmail: e.email,
			name: e.name,
			type: "facebook",
			image: e.picture.data.url,
			id: e.id,
		});
		try {
			const data = await axios.post("/api/auth/register", {
				gmail: e.email,
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
		console.log({
			gmail: user.email,
			name: user.name,
			type: "google",
			image: user.picture,
			id: user.sub,
		});
		try {
			const data = await axios.post("/api/auth/register", {
				gmail: user.email,
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
			<section>
				<div className="leaves">
					<div className="set">
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
				<img src="https://i.imgur.com/MosCSIH.png" className="bg" />
				<img src="https://i.imgur.com/Q50tX3l.png" className="girl" />
				<img src="https://i.imgur.com/J3FAXDV.png" className="girl1" />
				<img src="https://i.imgur.com/DjVcJFA.png" className="bikerboy" />
				<img src="https://i.imgur.com/tLXIflv.png" className="trees" />
				<div className="login">
					<h2>Register</h2>
					<div className="inputBox">
						<input type="text" ref={nameRef} placeholder="username" name="" />
					</div>
					<div className="inputBox">
						<input type="text" ref={emailRef} placeholder="email" name="" />
					</div>
					<div className="inputBox">
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
					<div className="inputBox">
						<input
							type="password"
							ref={rePasswordRef}
							placeholder="re-password"
							name=""
						/>
						<div
							onClick={() => {
								if (rePasswordRef.current) {
									if (rePasswordRef.current.type === "text") {
										rePasswordRef.current.type = "password";
									} else {
										rePasswordRef.current.type = "text";
									}
								}
							}}
							className="eyes_items"
						>
							<i className="fa-solid fa-eye"></i>
						</div>
					</div>
					<div className="inputBox">
						<input
							onClick={handleRegister}
							type="submit"
							value="Register"
							id="btn"
						/>
					</div>
					<div className="group">
						<Link to="/forgot_password">Forgot password</Link>
						<Link style={{ textDecoration: "none" }} to="/login">
							Login
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

export default Register;
