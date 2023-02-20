import React, { useState } from "react";
import "../style.scss";
import AlreadyForm from "./AlreadyForm";
const SendMail = () => {
	const [type, setType] = useState("individual");
	return (
		<div className="managerCourse">
			<div className="sendMail_title">
				<div className="sendMail_title_items">
					<input
						onChange={(e) => {
							if (e.target.checked) {
								setType("individual");
							}
						}}
						id="individual"
						defaultChecked
						type="radio"
						value="individual"
						name="sendmail"
					/>
					<label htmlFor="individual">
						<i>Individual</i>
					</label>
				</div>
				<div className="sendMail_title_items">
					<input
						onChange={(e) => {
							if (e.target.checked) {
								setType("alreadyform");
							}
						}}
						id="alreadyform"
						type="radio"
						value="alreadyform"
						name="sendmail"
					/>
					<label htmlFor="alreadyform">
						<i>Already form</i>
					</label>
				</div>
			</div>
			<div className="sendMail_user_form">
				<div className="sendMail_user_alreadyForm">
					<AlreadyForm />
				</div>
			</div>
		</div>
	);
};

export default SendMail;
