import React, { useEffect, useState } from "react";
import CourseLearnCardD from "./CourseLearnCardD";
import "./style.scss";
const CourseLearnCard = ({ item, index, course }) => {
	const [courseCard, setCourseCard] = useState(false);

	const [time, setTime] = useState(0);

	useEffect(() => {
		if (item) {
			let tim = 0;
			item?.numLesson?.forEach((infor) => {
				tim += infor?.time;
			});
			setTime(tim);
		}
	}, [item]);

	return (
		<div>
			<div
				onClick={() => {
					setCourseCard(!courseCard);
				}}
				className="CourseLearnCard"
			>
				<div className="CourseLearnCard_head_item">
					<h3>
						{index + 1}.{item?.packageTitle}
					</h3>
					<span>
						{index + 1 < course?.currentLearningPackage
							? item?.numLesson?.length
							: 1}
						/{item?.numLesson?.length} |{" "}
						{`${Math.floor(time / 3600) < 10 ? "0" : ""}${Math.floor(
							time / 3600
						)}h :
                                
                                ${
																	Math.floor(time / 3600) > 0
																		? `${
																				Math.floor(time / 60) -
																					Math.floor(time / 3600) * 60 <
																				10
																					? "0"
																					: ""
																		  }${
																				Math.floor(time / 60) -
																				Math.floor(time / 3600) * 60
																		  }`
																		: `${
																				Math.floor(time / 60) < 10 ? "0" : ""
																		  }${Math.floor(time / 60)}`
																}m : ${
							Math.floor(time) - Math.floor(time / 60) * 60 < 10 ? "0" : ""
						}${Math.floor(time) - Math.floor(time / 60) * 60}s`}
					</span>
				</div>
				<div className="CourseLearnCard_body">
					<i
						className={
							!courseCard ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"
						}
					></i>
				</div>
			</div>
			{courseCard && (
				<div>
					{item?.numLesson?.map((infor, inde) => (
						<CourseLearnCardD
							key={inde + "numLesson"}
							item={infor}
							index={inde}
							course={course}
							parentID={index}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CourseLearnCard;
