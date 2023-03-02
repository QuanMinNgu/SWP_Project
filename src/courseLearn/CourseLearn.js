import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CourseLearnCard from "./CourseLearnCard";
import Comment from "../comment/Comment";
import Quizzlet from "../quizz/Quizzlet";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const CourseLearn = () => {
	const [course, setCourse] = useState({});

	const [less, setLess] = useState(0);

	const [cur, setCur] = useState(0);

	const innerContentRef = useRef();

	const dispatch = useDispatch();

	const { courseid, lessonid } = useParams();
	const navigate = useNavigate();
	const [bars, setbars] = useState(false);
	const { search } = useLocation();

	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		let here = true;
		if (!auth.user?.token) {
			toast.error("Please login first.");
			return navigate("/login");
		}
		const url = `/api/course/lesson?courseid=${courseid}&lessonid=${lessonid}`;
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				dispatch(isSuccess());
				let less = 0;
				let curLes = 0;
				res?.data?.lessonPakages?.forEach((item, index) => {
					less += item?.numLesson?.length;
					if (index < res?.data?.currentLearningPackage - 1) {
						item?.numLesson?.forEach((item) => {
							if (item?.type === "quiz") {
								if (item?.quizResultDTO) {
									curLes += 1;
								}
							} else {
								curLes += 1;
							}
						});
					} else if (index === res?.data?.currentLearningPackage - 1) {
						item?.numLesson?.forEach((item, i) => {
							if (i + 1 <= res?.data?.currentLearningLesson) {
								if (item?.type === "quiz") {
									if (item?.quizResultDTO) {
										curLes += 1;
									}
								} else {
									curLes += 1;
								}
							}
						});
					}
				});
				setCourse(res?.data);
				setCur(curLes);
				setLess(less);

				console.log(res?.data);

				innerContentRef.current.innerHTML = res?.data?.lesson?.description;
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, [lessonid, courseid]);

	const style = {
		background: `conic-gradient(#F05123 ${
			Math.round((cur / less) * 100) * 3.6
		}deg,transparent 0deg)`,
	};

	return (
		<div className="CourseLearn">
			<div className="CourseLearn_Head">
				<div className="CourseLearn_Head_Navbar">
					<Link style={{ textDecoration: "none" }} to={`/course/${courseid}`}>
						<div className="CourseLearn_Head_Navbar_icons">
							<i className="fa-solid fa-angle-left"></i>
						</div>
					</Link>
					<div className="CourseLearn_Head_Navbar_image_container">
						<Link to="/">
							<img
								className="CourseLearn_Head_Navbar_image"
								src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png"
								alt="Ảnh"
							/>
						</Link>
					</div>
					<div className="CourseLearn_Head_Navbar_title">
						<span>{course?.lesson?.title}</span>
					</div>
				</div>
				<div className="CourseLearn_Head_circle">
					<div style={style} className="circle">
						<div className="number">{Math.round((cur / less) * 100)}%</div>
					</div>
					<span>
						{cur} / {less} lessons
					</span>
				</div>
			</div>
			<div className="CourseLearn_body">
				<div className="CourseLearn_body_detail_container">
					<div className="CourseLearn_body_detail">
						<div>
							{course?.lesson?.type === "quiz" && (
								<Quizzlet item={course?.lesson} />
							)}
							{course?.lesson?.type === "listening" && (
								<div className="CourseLearn_body_detail_video">
									<ReactPlayer
										width="100%"
										height="100%"
										url={course?.lesson?.link}
										controls
									/>
								</div>
							)}
							{course?.lesson?.type !== "quiz" && (
								<div className="CourseLearn_body_detail_content">
									<div className="CourseLearn_body_detail_content_title">
										<span>Content of lesson</span>
									</div>
									<div
										ref={innerContentRef}
										className="CourseLearn_body_detail_content_clearly"
									></div>
								</div>
							)}
							{course?.lesson?.type !== "quiz" && (
								<div className="comment_container">
									<Comment />
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="CourseLearn_body_content_wrap">
					<div className="CourseLearn_body_content">
						<div>
							<div className="CourseLearn_body_title">
								<span>Content of this course</span>
							</div>
							<div>
								{course?.lessonPakages?.map((item, index) => (
									<CourseLearnCard
										key={index + "lesson"}
										index={index}
										item={item}
										course={course}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{bars && (
				<div
					onClick={() => {
						setbars(false);
					}}
					className="courseLearn_mobile_abs"
				></div>
			)}
			<div
				className={`courseLearn_mobile ${
					bars ? "courseLearn_mobile_a" : "courseLearn_mobile_d"
				}`}
			>
				<div className="courseLearn_close">
					<div
						onClick={() => {
							setbars(false);
						}}
						className="courseLearn_close_icons"
					>
						{" "}
						&times;
					</div>
				</div>
				<div className="courseLearn_mobile_card">
					{course?.lessonPakages?.map((item, index) => (
						<CourseLearnCard
							key={index + "lessonMobile"}
							index={index}
							item={item}
							course={course}
						/>
					))}
				</div>
			</div>
			{!bars && (
				<div
					onClick={() => {
						setbars(true);
					}}
					className="coursLearn_mobile_bars"
				>
					+
				</div>
			)}
		</div>
	);
};

export default CourseLearn;
