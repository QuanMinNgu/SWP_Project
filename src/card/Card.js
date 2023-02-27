import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
	const [reduce, setReduce] = useState(true);
	return (
		<div className="card">
			<div className="card_img">
				<Link to="/">
					<img className="card_img_detail" src={item?.image} alt="Ảnh course" />
				</Link>
				<div className="card_img_abs">
					<Link
						style={{ textDecoration: "none" }}
						to={`/course/${item?.courseID}`}
					>
						<div className="card_img_abs_wrap">
							<button>View the course</button>
						</div>
					</Link>
				</div>
			</div>
			<div className="card_detail">
				<Link
					className="card_detail_title"
					style={{ textDecoration: "none" }}
					to={`/course/${item?.courseID}`}
				>
					<div>{item?.courseName}</div>
				</Link>
				<div className="card_detail_wp">
					{!reduce ? (
						<div className="card_detail_w">
							<span className="card_detail_w_a">1.299.000đ</span>
							<span className="card_detail_w_r">1.299.000đ</span>
						</div>
					) : (
						<div className="card_detail_w">
							<span
								className={`card_detail_price ${
									item?.price === 0 ? "card_detail_w_r" : ""
								}`}
							>
								{item?.price === 0 ? "Free" : "$" + item?.price}
							</span>
						</div>
					)}
					<div className="card_detail_p">
						<i
							style={{ marginRight: "0.5rem" }}
							className="fa-solid fa-users"
						></i>
						<span>{item?.numberOfEnroll}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
