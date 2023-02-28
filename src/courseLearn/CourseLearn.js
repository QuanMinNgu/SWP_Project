import React, { useEffect, useState } from "react";
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
	const [percent, setPercent] = useState(86 * 3.6);

	const dispatch = useDispatch();

	const { slug } = useParams();
	const navigate = useNavigate();

	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		let here = true;
		if (!auth.user?.token) {
			toast.error("Please login first.");
			return navigate("/login");
		}
		const url = `/api/course/lesson?id=${slug}`;
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				dispatch(isSuccess());
				console.log(res?.data);
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, [slug]);

	const [quizz, setQuizz] = useState(true);
	const [youtube, setYoutube] = useState(false);

	const [bars, setbars] = useState(false);

	const { search } = useLocation();

	useEffect(() => {
		const lesson = new URLSearchParams(search).get("lesson") || 0;
		if (lesson * 1 === 2) {
			setQuizz(false);
			setYoutube(true);
		} else {
			setQuizz(true);
			setYoutube(false);
		}
	}, [search]);

	const style = {
		background: `conic-gradient(#F05123 ${percent}deg,transparent 0deg)`,
	};

	return (
		<div className="CourseLearn">
			<div className="CourseLearn_Head">
				<div className="CourseLearn_Head_Navbar">
					<Link style={{ textDecoration: "none" }} to="/">
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
						<span>HTML CSS từ Zero đến Hero</span>
					</div>
				</div>
				<div className="CourseLearn_Head_circle">
					<div style={style} className="circle">
						<div className="number">86%</div>
					</div>
					<span>1/166 bài học</span>
				</div>
			</div>
			<div className="CourseLearn_body">
				<div className="CourseLearn_body_detail_container">
					<div className="CourseLearn_body_detail">
						<div>
							{quizz && <Quizzlet />}
							{youtube && (
								<div className="CourseLearn_body_detail_video">
									<ReactPlayer
										width="100%"
										height="100%"
										url="https://www.youtube.com/watch?v=uqccg55tgHc"
									/>
								</div>
							)}
							{!quizz && (
								<div className="CourseLearn_body_detail_content">
									<div className="CourseLearn_body_detail_content_title">
										<span>Nội dung</span>
									</div>
									<div className="CourseLearn_body_detail_content_teacher">
										<span>
											<i>
												Giáo viên giảng dạy:
												<Link
													style={{
														marginLeft: "0.5rem",
													}}
													to="/"
												>
													Minh Quang
												</Link>
											</i>
										</span>
									</div>
									<div className="CourseLearn_body_detail_content_clearly">
										Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám
										thính" xem F8 sắp có gì mới nhé! Fanpage:
										https://www.facebook.com/f8vnofficial Group:
										https://www.facebook.com/groups/649972919142215 Youtube:
										https://www.youtube.com/F8VNOfficial Sơn Đặng:
										https://www.facebook.com/sondnf8
									</div>
								</div>
							)}
							{!quizz && (
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
								<span>Nội dung bài học</span>
							</div>
							<div>
								<CourseLearnCard />
								<CourseLearnCard />
								<CourseLearnCard />
								<CourseLearnCard />
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
					<CourseLearnCard />
					<CourseLearnCard />
					<CourseLearnCard />
					<CourseLearnCard />
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
