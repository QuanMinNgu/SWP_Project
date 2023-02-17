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
							<h2>Forgot Password</h2>
						</div>
						<div className="auth_wrap_input">
							<label>Email:</label>
							<input name="email" type="text" placeholder="Enter Email" />
						</div>
						<div className="auth_wrap_forgot">
							<Link className="auth_wrap_forgot_link" to="/login">
								Login ?
							</Link>
						</div>
						<div className="auth_wrap_button">
							<button>Forgot Password</button>
						</div>
					</div>
				</div>
			</div>
			<HomeIcons />
		</div>
	);
};

export default ForgotPassword;
