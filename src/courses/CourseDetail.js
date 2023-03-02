import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import CoursePanel from "./CoursePanel";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pay from "../payment/Pay";
import Rating from "../rating/Rating";
import VocherTemplate from "../voucher/VoucherTemplate";
import VoucherTemplateDetail from "../voucher/VoucherTemplateDetail";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../App";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const CourseDetail = () => {
	const [payment, setPayment] = useState(false);
	const { slug } = useParams();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { cache, store } = useContext(UserContext);
	const [canLearn, setCanLearn] = useState(false);
	const [course, setCourse] = useState({});
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const [topics, setTopics] = useState({});

	const [benefit, setBenefit] = useState([]);

	const enrollCourseSuccess = async () => {
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/course/enroll",
				{
					courseID: course?.course?.courseID,
					price: course?.course?.price,
					createdDate: new Date(),
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			toast.success(data?.data?.msg);
			setCanLearn(true);
		} catch (err) {
			dispatch(isFailing());
			toast.error(err?.response?.data?.msg);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		let here = true;
		const url = `/api/common/course?id=${slug}`;
		if (cache.current[url]) {
			return setCourse(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token || null,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				dispatch(isSuccess());
				setCourse(res?.data);
				if (res?.data?.enrolled) {
					setCanLearn(true);
				}
				const topi = res?.data?.lessonPackages?.length;
				let less = 0;
				let tim = 0;
				res?.data?.lessonPackages?.forEach((item) => {
					less += item?.numLesson?.length;
					item?.numLesson?.forEach((infor) => {
						tim += infor?.time;
					});
				});
				setTopics({
					topi: topi,
					less: less,
					tim: tim,
				});
				const arr = res?.data?.course?.description?.split("--?--");
				arr.shift();
				setBenefit([...arr]);
			})
			.catch((err) => {
				if (!here) {
					return dispatch(isFailing());
				}
				dispatch(isFailing());
				navigate("/");
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, [slug]);

	return (
		<div className="course_detail">
			<div className="row">
				<div className="col c-12 m-8 l-8">
					<div className="course_detail_name">
						<h3>{course?.course?.courseName}</h3>
					</div>
					<div className="course_detail_content">
						<span>{course?.course?.description?.split("--?--")[0]}</span>
					</div>
					<div className="course_detail_learn">
						<h3>Benefits of this course:</h3>
					</div>
					<ul className="course_detail_learn_items">
						{benefit?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<div className="course_detail_learn">
						<h3>Content of this course:</h3>
					</div>
					<div className="course_detail_timeLine">
						<ul>
							<li>
								<b>{topics?.topi || 0}</b> Topics
							</li>
							<li>.</li>
							<li>
								<b>{topics?.less || 0}</b> Lessons
							</li>
							<li>.</li>
							<li>
								Times{" "}
								<b>{`${
									Math.floor(topics?.tim / 3600) < 10 ? "0" : ""
								}${Math.floor(topics?.tim / 3600)}h :
                                
                                ${
																	Math.floor(topics?.tim / 3600) > 0
																		? `${
																				Math.floor(topics?.tim / 60) -
																					Math.floor(topics?.tim / 3600) * 60 <
																				10
																					? "0"
																					: ""
																		  }${
																				Math.floor(topics?.tim / 60) -
																				Math.floor(topics?.tim / 3600) * 60
																		  }`
																		: `${
																				Math.floor(topics?.tim / 60) < 10
																					? "0"
																					: ""
																		  }${Math.floor(topics?.tim / 60)}`
																}m : ${
									Math.floor(topics?.tim) - Math.floor(topics?.tim / 60) * 60 <
									10
										? "0"
										: ""
								}${
									Math.floor(topics?.tim) - Math.floor(topics?.tim / 60) * 60
								}s`}</b>
							</li>
						</ul>
					</div>
					<div className="CoursePanel">
						{course?.lessonPackages?.map((item, index) => (
							<CoursePanel item={item} index={index} key={item?.packageID} />
						))}
					</div>
				</div>
				<div className="col c-12 m-4 l-4">
					<div className="course_detail_img">
						<img src={course?.course?.image} alt="Ảnh" />
					</div>
					<div className="course_detail_price">
						{course?.course?.price === 0 ? "Free" : "$" + course?.course?.price}
					</div>
					<div className="course_detail_button">
						{store?.rule === "[ROLE_ADMIN]" ? (
							<button
								onClick={() => {
									navigate("/admin/dashboard");
								}}
							>
								Dashboard
							</button>
						) : store?.rule === "[ROLE_COURSE_EXPERT]" ? (
							<button
								onClick={() => {
									navigate("/course_expert/dashboard");
								}}
							>
								Dashboard
							</button>
						) : store?.rule === "[ROLE_SALE]" ? (
							<button
								onClick={() => {
									navigate("/course_expert/dashboard");
								}}
							>
								Dashboard
							</button>
						) : canLearn ? (
							<button
								onClick={() => {
									if (auth.user?.token) {
										navigate(
											`/learning/${course?.course?.courseID}/${course?.lessonPackages[0]?.numLesson[0]?.lessonID}`
										);
									} else {
										navigate("/login");
										toast.error("Please login first.");
									}
								}}
							>
								Start learning
							</button>
						) : (
							<button
								onClick={() => {
									if (auth.user?.token) {
										if (course?.course?.price === 0) {
											enrollCourseSuccess();
										} else {
											setPayment(true);
										}
									} else {
										navigate("/login");
										toast.error("Please login first.");
									}
								}}
							>
								Enroll to this course
							</button>
						)}
					</div>
					<ul className="course_detail_list">
						<li>
							<i>
								Teacher:
								<Link style={{ marginLeft: "0.5rem" }} to="?">
									{course?.course?.courseExpertName}
								</Link>
							</i>
						</li>
						<li>
							<i>Confidence when learning</i>
						</li>
					</ul>
					<div className="course_vocher">
						<div className="course_vocher_list">
							<VocherTemplate onClick={() => setOpen(true)} />
						</div>
					</div>
					{open && (
						<div className="voucher_details" onClick={() => setOpen(false)}>
							<div className="vocher_icons">
								<div className="vocher_icons_wrap">&times;</div>
							</div>
						</div>
					)}
					{open && (
						<div className="voucher_details_container">
							<VoucherTemplateDetail />
						</div>
					)}
				</div>
			</div>
			<div className="rating_container">
				<Rating course={course} />
			</div>
			{payment && (
				<div
					onClick={() => {
						setPayment(false);
					}}
					className="coursePaymentAbs"
				></div>
			)}
			{payment && (
				<Pay
					price={course?.course?.price || 0.1}
					setPayment={setPayment}
					setCanLearn={setCanLearn}
				/>
			)}
		</div>
	);
};

export default CourseDetail;
