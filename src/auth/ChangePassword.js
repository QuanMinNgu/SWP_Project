import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeIcons from "../components/another/HomeIcons";
import "./style.scss";
const ChangePassword = () => {
	const passwordRef = useRef();
	const rePasswordRef = useRef();

	const navigate = useNavigate();

	const auth = useSelector((state) => state.auth);

	const handleChangePassword = async () => {
		const user = {
			password: passwordRef.current.value,
			rePassword: rePasswordRef.current.value,
		};
		if (!user.password || !user.rePassword) {
			return toast.error("Please enter all input.");
		}

		if (user.password !== user.rePassword) {
			return toast.error("Passwords are not the same");
		}
		try {
			const data = await axios.post(
				"/api/auth/change_password",
				{
					password: user.password,
					username: auth.user?.name,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg);
			navigate("/");
		} catch (err) {
			return toast.error(err?.response?.data?.msg);
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
					<h2>Change Password</h2>
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
					<div class="inputBox">
						<input
							onClick={handleChangePassword}
							type="submit"
							value="Change Password"
							id="btn"
						/>
					</div>
				</div>
			</section>
			<HomeIcons />
		</div>
	);
};

export default ChangePassword;
