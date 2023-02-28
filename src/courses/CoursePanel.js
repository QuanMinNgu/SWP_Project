import React, { useState } from "react";
import PanelCard from "./PanelCard";
import "./style.scss";
const CoursePanel = ({ item, index }) => {
	const [panel, setPanel] = useState(false);
	return (
		<div className="CoursePanel_wrap">
			<div
				onClick={() => {
					setPanel(!panel);
				}}
				className="CoursePanel_container"
			>
				<div className="CoursePanel_head">
					<i
						style={{
							marginRight: "1rem",
							fontSize: "1.5rem",
							color: "#F3744F",
						}}
						className={!panel ? "fa-solid fa-plus" : "fa-solid fa-minus"}
					></i>
					{index + 1}.{item?.packageTitle}
				</div>
				<div className="CoursePanel_body">
					{item?.numLesson?.length} Lessons
				</div>
			</div>
			{panel && (
				<div>
					{item?.numLesson?.map((item, inde) => (
						<PanelCard index={inde} key={item?.lessonID} item={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default CoursePanel;
