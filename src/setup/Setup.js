import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
const Setup = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { slug } = useParams();
	const navigate = useNavigate();

	const [setup, setSetup] = useState(false);
	const [avatar, setAvatar] = useState(false);

	const [image, setImage] = useState("");
	const imageRef = useRef("");

	const [gmail, setGmail] = useState("");

	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.user) {
			return toast.error("Please login first.");
		}
	}, []);

	const nameRef = useRef(null);

	useEffect(() => {
		if (slug === "personal") {
			if (setup) {
				nameRef.current.disabled = false;
			} else {
				nameRef.current.disabled = true;
			}
		}
	}, [setup, slug]);

	useEffect(() => {
		let here = true;
		const url = "/api/account/get_user";
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setGmail(res?.data?.gmail);
				setImage(auth.user?.image);
				dispatch(isSuccess());
			})
			.catch((err) => {
				if (!here) {
					return dispatch(isFailing());
				}
				toast.error(err?.response?.data?.msg);
				setImage(auth.user?.image);
				dispatch(isFailing());
			});
		return () => {
			here = false;
		};
	}, []);

	const handleSaveInfor = async () => {
		if (!nameRef.current.value) {
			return toast.error("Please enter name.");
		}
		const movie = {
			name: nameRef.current.value,
			image: imageRef.current || image,
		};
		if (imageRef.current) {
			const formData = new FormData();
			formData.append("file", imageRef.current);
			formData.append("upload_preset", "sttruyenxyz");
			dispatch(isLoading());
			try {
				const res = await axios.post(
					"https://api.cloudinary.com/v1_1/sttruyen/image/upload",
					formData
				);
				const newUrl = "https:" + res.data.url.split(":")[1];
				movie.image = newUrl;
				dispatch(isSuccess());
			} catch (err) {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			}
		}
		dispatch(isLoading());
		try {
			const data = await axios.post(
				`/api/account/update`,
				{
					...movie,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			toast.success(data?.data?.msg);
			dispatch(isSuccess());
		} catch (err) {
			dispatch(isFailing());
			toast.error(err?.response?.data?.msg);
		}
	};

	const handleChangeImage = (e) => {
		const url = URL.createObjectURL(e.target.files[0]);
		imageRef.current = e.target.files[0];
		setImage(url);
	};
	return (
		<div className="setUp">
			<div className="setUp_navbar">
				<div
					onClick={() => {
						console.log("Here");
						navigate("/settings/personal");
					}}
					className={`setUp_navbar_items ${
						slug === "personal" ? "active" : ""
					}`}
				>
					<i
						style={{ marginRight: "0.5rem", color: "#FF751F" }}
						className="fa-solid fa-user"
					></i>{" "}
					Cài đặt tài khoản
				</div>
				<div
					onClick={() => {
						navigate("/settings/payment");
					}}
					className={`setUp_navbar_items ${slug === "payment" ? "active" : ""}`}
				>
					<i
						style={{
							marginRight: "0.5rem",
							color: "#FF751F",
							marginTop: "0.2rem",
						}}
						className="fa-solid fa-money-bill"
					></i>
					Thông tin thanh toán
				</div>
			</div>
			{slug === "personal" && (
				<div className="setUp_wrap">
					<div className="setUp_title">
						<h2>Thông tin cá nhân</h2>
					</div>
					<div className="setUp_name">
						<div className="setUp_name_navbar">
							<div className="setUp_name_navbar-title">
								<span>Name</span>
							</div>
							<input
								ref={nameRef}
								className="setUp_name_input"
								type="text"
								defaultValue={`${auth.user?.name}`}
								disabled
							/>
						</div>
						{!setup ? (
							<div className="setUp_button">
								<button
									onClick={() => {
										setSetup(true);
									}}
								>
									Edit
								</button>
							</div>
						) : (
							<div className="setUp_button">
								<button
									onClick={handleSaveInfor}
									style={{
										marginRight: "1rem",
										border: "0.1rem solid #FF751F",
										color: "#FF751F",
									}}
								>
									Save
								</button>
								<button
									onClick={() => {
										setSetup(false);
									}}
								>
									Cancel
								</button>
							</div>
						)}
					</div>
					<div className="setUp_name">
						<div className="setUp_name_navbar">
							<div className="setUp_name_navbar-title">
								<span>Avatar</span>
							</div>
							<div className="setUp_name_recommend">
								Should be a square image, accepting files: JPG, PNG or GIF.
							</div>
						</div>
						<div style={{ cursor: "pointer" }} className="setUp_avatar">
							<img
								onClick={() => {
									setAvatar(true);
								}}
								src={image || auth.user?.image}
								alt="Avatar"
							/>
							{avatar && (
								<div className="setUp_avatar_upload">
									<label htmlFor="avatarImg">
										<i className="fa-solid fa-image"></i>
									</label>
									<input
										onChange={(e) => handleChangeImage(e)}
										id="avatarImg"
										type="file"
										hidden
									/>
								</div>
							)}
						</div>
						{!avatar ? (
							<div className="setUp_button">
								<button
									onClick={() => {
										setAvatar(true);
									}}
								>
									Edit
								</button>
							</div>
						) : (
							<div className="setUp_button">
								<button
									onClick={handleSaveInfor}
									style={{
										marginRight: "1rem",
										border: "0.1rem solid #FF751F",
										color: "#FF751F",
									}}
								>
									Save
								</button>
								<button
									onClick={() => {
										setAvatar(false);
									}}
								>
									Cancel
								</button>
							</div>
						)}
					</div>
					<div className="setUp_name">
						<div className="setUp_name_navbar">
							<div className="setUp_name_navbar-title">
								<span>Email</span>
							</div>
							<input
								className="setUp_name_input"
								type="text"
								defaultValue={"quangminhnguyen265@gmail.com"}
								disabled
							/>
						</div>
					</div>
					<div className="setUp_name">
						<div className="setUp_name_navbar">
							<div className="setUp_name_navbar-title">
								<span>UserID</span>
							</div>
							<input
								className="setUp_name_input"
								type="text"
								defaultValue={`${auth.user?.id}`}
								disabled
							/>
						</div>
					</div>
				</div>
			)}
			{slug === "payment" && (
				<div className="setUp_payment">
					<div className="setUp_title">
						<h2>Hóa đơn</h2>
					</div>
					<div className="setUp_payment_table">
						<div className="setUp_payment_head">
							<div className="setUp_payment_head_1">Hóa đơn</div>
							<div className="setUp_payment_head_2">Ngày tạo</div>
							<div className="setUp_payment_head_3">Số tiền</div>
							<div className="setUp_payment_head_4">Nội dung</div>
						</div>
						<div className="setUp_payment_body">
							<div className="setUp_payment_body_1">
								<Link
									style={{
										textDecoration: "none",
									}}
									to="/"
								>
									1990
								</Link>
							</div>
							<div className="setUp_payment_body_2">12/09/2002</div>
							<div className="setUp_payment_body_3">$120</div>
							<div className="setUp_payment_body_4">
								Trả tiền mua khóa học
								<Link to="/"> Css, Html</Link>
								hoặc các khóa học tượng tự như thế
							</div>
						</div>
						<div className="setUp_payment_body">
							<div className="setUp_payment_body_1">
								<Link
									style={{
										textDecoration: "none",
									}}
									to="/"
								>
									1990
								</Link>
							</div>
							<div className="setUp_payment_body_2">12/09/2002</div>
							<div className="setUp_payment_body_3">$120</div>
							<div className="setUp_payment_body_4">
								Trả tiền mua khóa học
								<Link to="/"> Css, Html</Link>
								hoặc các khóa học tượng tự như thế
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Setup;
