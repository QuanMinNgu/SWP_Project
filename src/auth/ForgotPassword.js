import React, { useRef } from "react";
import { Link } from "react-router-dom";
import HomeIcons from "../components/another/HomeIcons";
import "./style.scss";
const ForgotPassword = () => {
	const emailRef = useRef();
	const handleForgotPassword = () => {};
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
					<h2>Forgot Password</h2>
					<div class="inputBox">
						<input type="text" ref={emailRef} placeholder="email" name="" />
					</div>

					<div class="inputBox">
						<input
							onClick={handleForgotPassword}
							type="submit"
							value="Forgot Password"
							id="btn"
						/>
					</div>
					<div class="group">
						<Link to="/login">Register</Link>
						<Link style={{ textDecoration: "none" }} to="/register">
							Login
						</Link>
					</div>
				</div>
			</section>
			<HomeIcons />
		</div>
	);
};

export default ForgotPassword;
