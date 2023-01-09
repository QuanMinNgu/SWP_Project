import React from "react";
import "./style.scss";
const PanelCard = () => {
    return (
        <div className="panelCard_container">
            <div>
                {" "}
                <i
                    style={{
                        color: "#F05123",
                        marginRight: "0.5rem",
                    }}
                    className="fa-solid fa-circle-play"
                ></i>
                1. Mô hình Client - Server là gì?
            </div>
            <div>11:35</div>
        </div>
    );
};

export default PanelCard;
