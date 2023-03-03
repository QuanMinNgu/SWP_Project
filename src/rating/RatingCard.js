import React, { useEffect, useState } from "react";
import "./style.scss";
const RatingCard = ({ item }) => {
	const [percent, setPercent] = useState(0);

	useEffect(() => {
		if (item) {
			setPercent(100 - ((item?.stars * 1) / 5) * 100);
		}
	}, [item]);
	const clipPath = {
		clipPath: `inset(0% ${percent}% 0% 0%)`,
	};
	return (
		<div className="ratingCard">
			<div className="ratingCard_img">
				<img src={item?.userImage} alt="Ảnh" />
			</div>
			<div className="ratingCard_infor">
				<div className="ratingCard_infor_name">
					{item?.userName}
					<div className="ratingCard_infor_rate">
						<div className="ratingCard_infor_rate_star">
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<i className="fa-regular fa-star"></i>
							<div
								style={clipPath}
								className="ratingCard_infor_rate_star-color"
							>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
								<i className="fa-solid fa-star"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="ratingCard_infor_content">{item?.content}</div>
			</div>
		</div>
	);
};

export default RatingCard;
