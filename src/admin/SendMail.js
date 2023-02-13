import React from "react";
import "./style.scss";
const SendMail = () => {
    return (
        <div className="managerCourse">
            <div className="sendMail_title">
                <div className="sendMail_title_items">
                    <input
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
            <div className="sendMail_user_form"></div>
        </div>
    );
};

export default SendMail;
