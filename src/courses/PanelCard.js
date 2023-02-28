import React, { useEffect } from "react";
import "./style.scss";
const PanelCard = ({ item, index }) => {
	return (
		<div className="panelCard_container">
			<div>
				{" "}
				<i
					style={{
						color: "#F05123",
						marginRight: "0.5rem",
					}}
					className={`fa-solid ${
						item?.type === "listening"
							? "fa-circle-play"
							: item?.type === "reading"
							? "fa-book"
							: "fa-circle-question"
					}`}
				></i>
				{index + 1}. {item?.title}
			</div>
			<div>{`${Math.floor(item?.time / 3600) < 10 ? "0" : ""}${Math.floor(
				item?.time / 3600
			)}h :
                                
                                ${
																	Math.floor(item?.time / 3600) > 0
																		? `${
																				Math.floor(item?.time / 60) -
																					Math.floor(item?.time / 3600) * 60 <
																				10
																					? "0"
																					: ""
																		  }${
																				Math.floor(item?.time / 60) -
																				Math.floor(item?.time / 3600) * 60
																		  }`
																		: `${
																				Math.floor(item?.time / 60) < 10
																					? "0"
																					: ""
																		  }${Math.floor(item?.time / 60)}`
																}m : ${
				Math.floor(item?.time) - Math.floor(item?.time / 60) * 60 < 10
					? "0"
					: ""
			}${Math.floor(item?.time) - Math.floor(item?.time / 60) * 60}s`}</div>
		</div>
	);
};

export default PanelCard;
