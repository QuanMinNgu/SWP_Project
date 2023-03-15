import React, { useState } from "react";
import ReplyInput from "./ReplyInput";
import "./style.scss";
const CommentCard = ({ item }) => {
	const [reply, setReply] = useState(false);

	const [bars, setBars] = useState(false);

	return (
		<div className="commentCard">
			<div className="commentCard_img">
				<img
					style={{ border: "0.1rem solid rgba(0,0,0,0.1)" }}
					src={item?.image}
					alt="Ảnh"
				/>
			</div>
			<div className="commentCard_body">
				<div className="commentCard_infor">
					<div className="commentCard_infor_title">{item?.userName}</div>
					<div className="commentCard_infor_content">{item?.content}</div>
				</div>
				<div className="commentCard_navbar">
					<div className="commentCard_navbar_items">0 Thích</div>
					<div
						onClick={() => {
							setReply(!reply);
						}}
						className="commentCard_navbar_items"
					>
						Reply
					</div>
					<div className="commentCard_navbar_items">
						<i>{item?.createdDate}</i>
					</div>
				</div>
				{reply && (
					<div className="commentCard_replyInput">
						<ReplyInput name={item?.userName} />
					</div>
				)}
				<div className="commentCard_reply">
					{item?.replies?.map((item, index) => (
						<CommentCard
							key={index + "lesson for more" + item?.commentID}
							item={item}
						/>
					))}
				</div>
			</div>
			<div
				onClick={() => {
					setBars(!bars);
				}}
				className="comment_bars"
			>
				<i className="fa-solid fa-ellipsis"></i>
			</div>
			{bars && (
				<div className="comment_bars_items">
					<div title="Update" className="comment_bars_item">
						Update
					</div>
					<div title="Delete" className="comment_bars_item">
						Delete
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentCard;
