import React from "react";
import "./style.scss";
const RatingCard = () => {
	const clipPath = {
		clipPath: "inset(0% 20% 0% 0%)",
	};
	return (
		<div className="ratingCard">
			<div className="ratingCard_img">
				<img
					src="https://res.cloudinary.com/sttruyen/image/upload/v1670845412/Sttruyenxyz/tsmietvqzskvkakoe4fk.jpg"
					alt="Ảnh"
				/>
			</div>
			<div className="ratingCard_infor">
				<div className="ratingCard_infor_name">
					MinhQuang
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
				<div className="ratingCard_infor_content">
					Món này đúng thật rất ngon nhưng chỉ tội hơi thiếu muối Món này đúng
					thật rất ngon nhưng chỉ tội hơi thiếu muối Món này đúng thật rất ngon
					nhưng chỉ tội hơi thiếu muối Món này đúng thật rất ngon nhưng chỉ tội
					hơi thiếu muối
				</div>
			</div>
		</div>
	);
};

export default RatingCard;
