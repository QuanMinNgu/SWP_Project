import React, { useState } from "react";
import ReplyCard from "./ReplyCard";
import ReplyInput from "./ReplyInput";
import "./style.scss";
const CommentCard = ({ item }) => {
	const [reply, setReply] = useState(false);

	return (
		<div className="commentCard">
			<div className="commentCard_img">
				<img src={item?.image} alt="Ảnh" />
			</div>
			<div className="commentCard_body">
				<div className="commentCard_infor">
					<div className="commentCard_infor_title">{item?.userName}</div>
					<div className="commentCard_infor_content">{item?.comment}</div>
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
		</div>
	);
};

export default CommentCard;
