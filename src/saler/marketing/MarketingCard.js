import React from "react";
import "./style.scss";
const MarketingCard = () => {
	return (
		<div className="marketing_card_items">
			<img
				src="https://i.pinimg.com/originals/2f/60/6a/2f606ad14bf9171e5f41b42a01b4441f.jpg"
				alt="anh"
			/>
			<div className="marketing_card_abs">
				<div>
					<button style={{ height: "4rem" }} className="button button_delete">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default MarketingCard;
