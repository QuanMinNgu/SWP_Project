import React, { useEffect, useState } from "react";
import "./style.scss";
import CoursePanel from "./CoursePanel";
import { Link, useNavigate } from "react-router-dom";
import Pay from "../payment/Pay";
import Rating from "../rating/Rating";
import VocherTemplate from "../voucher/VoucherTemplate";
import VoucherTemplateDetail from "../voucher/VoucherTemplateDetail";
const CourseDetail = () => {
	const [payment, setPayment] = useState(false);

	const [canLearn, setCanLearn] = useState(false);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="course_detail">
			<div className="row">
				<div className="col c-12 m-8 l-8">
					<div className="course_detail_name">
						<h3>Responsive Với Grid System</h3>
					</div>
					<div className="course_detail_content">
						<span>
							Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web
							responsive với Grid System, tương tự Bootstrap 4.
						</span>
					</div>
					<div className="course_detail_learn">
						<h3>Bạn sẽ nhận được gì từ khóa học?</h3>
					</div>
					<ul className="course_detail_learn_items">
						<li>Biết cách xây dựng website Responsive</li>
						<li>Hiểu được tư tưởng thiết kế với Grid system</li>
						<li>Tự tay xây dựng được thư viện CSS Grid</li>
						<li>Tự hiểu được Grid layout trong bootstrap</li>
					</ul>
					<div className="course_detail_learn">
						<h3>Nội dung của khóa học</h3>
					</div>
					<div className="course_detail_timeLine">
						<ul>
							<li>
								<b>7</b> Topics
							</li>
							<li>.</li>
							<li>
								<b>37</b> Lessons
							</li>
							<li>.</li>
							<li>
								Times <b>06h : 45m : 00s</b>
							</li>
						</ul>
					</div>
					<div className="CoursePanel">
						<CoursePanel />
						<CoursePanel />
						<CoursePanel />
					</div>
				</div>
				<div className="col c-12 m-4 l-4">
					<div className="course_detail_img">
						<img
							src="https://res.cloudinary.com/sttruyen/image/upload/v1673056232/another/nchc17ic3dqqlknupeqx.png"
							alt="Ảnh"
						/>
					</div>
					<div className="course_detail_price">Miễn phí</div>
					<div className="course_detail_button">
						{canLearn ? (
							<button
								onClick={() => {
									navigate("/learning/asđa");
								}}
							>
								Bắt đầu học
							</button>
						) : (
							<button
								onClick={() => {
									setPayment(true);
								}}
							>
								Đăng ký khóa học
							</button>
						)}
					</div>
					<ul className="course_detail_list">
						<li>
							<i>
								Giáo viên:
								<Link style={{ marginLeft: "0.5rem" }} to="/">
									Nguyễn Minh Quang
								</Link>
							</i>
						</li>
						<li>
							<i>Tự tin khi học tập</i>
						</li>
					</ul>
					<div className="course_vocher" onClick={() => setOpen(true)}>
						<VocherTemplate />
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
				<Rating />
			</div>
			{payment && (
				<div
					onClick={() => {
						setPayment(false);
					}}
					className="coursePaymentAbs"
				></div>
			)}
			{payment && <Pay setPayment={setPayment} setCanLearn={setCanLearn} />}
		</div>
	);
};

export default CourseDetail;
