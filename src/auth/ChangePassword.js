import React from "react";
import { Link } from "react-router-dom";
import HomeIcons from "../components/another/HomeIcons";
import "./style.scss";
const ChangePassword = () => {
	return (
		<div className="auth">
			<div className="grid wide">
				<div className="auth_container">
					<div className="auth_wrap">
						<div className="auth_wrap_title">
							<h2>Change Password</h2>
						</div>
						<div className="auth_wrap_input">
							<label>Password:</label>
							<input
								id="passwordRef"
								name="password"
								type="password"
								placeholder="Enter Password"
							/>
						</div>
						<div className="auth_wrap_input">
							<label>Re-Password:</label>
							<input
								id="repasswordRef"
								name="repassword"
								type="password"
								placeholder="Enter Re-Password"
							/>
						</div>
						<div className="auth_wrap_appear">
							<label htmlFor="password">Show Password ?</label>
							<input
								onClick={() => {
									if (document.getElementById("passwordRef").type === "text") {
										document.getElementById("passwordRef").type = "password";
										document.getElementById("repasswordRef").type = "password";
									} else {
										document.getElementById("passwordRef").type = "text";
										document.getElementById("repasswordRef").type = "text";
									}
								}}
								id="password"
								type="checkbox"
							/>
						</div>
						<div className="auth_wrap_forgot">
							<Link className="auth_wrap_forgot_link" to="/login">
								Login ?
							</Link>
						</div>
						<div className="auth_wrap_button">
							<button>Change Password</button>
						</div>
					</div>
				</div>
			</div>
			<HomeIcons />
		</div>
	);
};

export default ChangePassword;
