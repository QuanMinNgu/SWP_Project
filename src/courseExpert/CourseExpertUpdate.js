import React, {
	useRef,
	useState,
	useCallback,
	useEffect,
	useContext,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "./style.scss";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import CoursePanelEdit from "../coursePanel/CoursePanelEdit";
import Listening from "../admin/courseManager/type/Listening";
import Reading from "../admin/courseManager/type/Reading";
import Quiz from "../admin/courseManager/type/Quiz";
const CreateCourse = () => {
	const benefitRef = useRef();
	const [benefit, setBenefit] = useState([]);
	const [courseExpert, setCourseExpert] = useState("");
	const [expert, setExpert] = useState(false);
	const [image, setImage] = useState("");
	const [inputForm, setInputForm] = useState(false);
	const [previousLink, setPreviousLink] = useState(false);
	const [lesson, setLesson] = useState([]);
	const imageRef = useRef();
	const lessonRef = useRef();
	const [addLesson, setAddLesson] = useState(false);

	const { cache } = useContext(UserContext);

	const { slug } = useParams();

	const [selectedOption, setSelectedOption] = useState(null);

	const [course, setCourse] = useState({});

	const titleRef = useRef();

	const contentRef = useRef();
	const [newPrice, setNewPrice] = useState("");

	const dispatch = useDispatch();

	const [types, setTypes] = useState([]);

	const [optionsKind, setOptionKind] = useState({});

	useEffect(() => {
		if (types) {
			const arr = types?.map((item) => {
				return {
					value: item?.courseTypeID,
					label: item?.courseTypeName,
				};
			});
			setOptionKind([...arr]);
		}
	}, [types]);

	const { search } = useLocation();
	const idCourse = new URLSearchParams(search).get("id");

	const navigate = useNavigate();

	useEffect(() => {
		let here = true;
		const url = `/api/course/admin_get?id=${idCourse}`;
		if (cache.current[url]) {
			return;
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				if (!here) {
					return;
				}
				dispatch(isSuccess());
				setCourse(res?.data);
				if (res?.data?.course?.status) {
					toast.error(
						"Please change status to inactive before updating this course."
					);
					return navigate("/admin/course_manager");
				}
				setNewPrice(res?.data?.course?.price || "0");
				const arr = res?.data?.course?.description?.split("--?--");
				arr.shift();
				setBenefit([...arr]);
				setCourseExpert({
					...res?.data?.courseExpert,
				});
				setSelectedOption({
					value: res?.data?.courseType?.courseTypeID,
					label: res?.data?.courseType?.courseTypeName,
				});
				setLesson([...res?.data?.lessonPackages]);
				document.querySelector("#priceOfCourse").innerHTML =
					res?.data?.course?.price + "$";
			})
			.catch((err) => {
				if (!here) {
					return;
				}
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, [idCourse]);

	useEffect(() => {
		let here = true;
		if (slug.includes("update_course")) {
			const url = "/api/account/course_expert";
			dispatch(isLoading());
			axios
				.get(url)
				.then((res) => {
					if (!here) {
						return dispatch(isSuccess());
					}
					cache.current[url] = res?.data?.users;
					dispatch(isSuccess());
				})
				.catch((err) => {
					dispatch(isFailing());
				});
		}
		return () => {
			here = false;
		};
	}, [slug]);

	const [urlArray, setUrlArray] = useState([]);

	const [numberOfLesson, setNumberOfLesson] = useState({
		num: 0,
		time: 0,
	});
	const urlArrayRef = useRef([]);

	const [type, setType] = useState("listening");

	const handleCreateBenefit = () => {
		if (!benefitRef.current.value) {
			return toast.error("Please, enter information.");
		}
		setBenefit([...benefit, benefitRef.current?.value]);
		benefitRef.current.value = "";
	};

	const handleCreateLesson = () => {
		setLesson([
			...lesson,
			{
				packageTitle: lessonRef.current.value,
				packageID: null,
				numLesson: [],
			},
		]);
		lessonRef.current.value = "";
	};

	const handleDeleteList = (e) => {
		benefit.splice(e, 1);
		setBenefit([...benefit]);
	};

	const onDrop = useCallback((acceptedFiles) => {
		const url = URL.createObjectURL(acceptedFiles[0]);
		if (image) {
			URL.revokeObjectURL(image);
		}
		imageRef.current = acceptedFiles[0];
		setImage(url);
	}, []);

	useEffect(() => {
		let coun = 0;
		let tim = 0;
		lesson?.forEach((item) => {
			coun += item?.numLesson?.length;
			item?.numLesson?.forEach((item) => {
				tim += item?.time * 1;
			});
		});
		setNumberOfLesson({
			num: coun,
			time: tim,
		});
	}, [lesson]);

	const auth = useSelector((state) => state.auth);

	const lessonLengthRef = useRef();
	const numOfLessonRef = useRef();
	const timeOfLessonRef = useRef();

	const idRef = useRef(null);

	const handleCreateNewCourse = async () => {
		const title = titleRef.current.value;
		if (
			!title ||
			!contentRef.current.value ||
			!newPrice ||
			!selectedOption?.value ||
			isNaN(newPrice)
		) {
			return toast.error("Please enter all value.");
		}
		let contentArr = contentRef.current.value + "--?--";
		benefit.forEach((item, index) => {
			if (index !== benefit.length - 1) {
				contentArr += item + "--?--";
			} else {
				contentArr += item;
			}
		});

		let urlImage = "";
		if (imageRef.current) {
			const formData = new FormData();
			formData.append("file", imageRef.current);
			formData.append("upload_preset", "sttruyenxyz");
			try {
				const res = await axios.post(
					"https://api.cloudinary.com/v1_1/sttruyen/image/upload",
					formData
				);
				urlImage = "https:" + res.data.url.split(":")[1];
			} catch (err) {
				return;
			}
		} else {
			urlImage = course?.course?.image;
		}

		console.log({
			courseName: title,
			description: contentArr,
			accountID: courseExpert?.accountID,
			courseTypeID: selectedOption?.value,
			price: newPrice * 1,
			token: auth.user?.token,
			courseID: course?.course?.courseID,
			image: urlImage,
		});
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/course/create",
				{
					courseID: course?.course?.courseID,
					courseName: title,
					description: contentArr,
					accountID: courseExpert?.accountID,
					courseTypeID: selectedOption?.value,
					price: newPrice * 1,
					image: urlImage,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			toast.success(data?.data?.msg);
			idRef.current = data?.data?.courseID;
			imageRef.current = "";
		} catch (err) {
			toast.error(err?.response?.data?.msg);
			dispatch(isFailing());
		}
	};

	const [deletePackage, setDeletePackage] = useState([]);
	const [deleteLesson, setDeleteLesson] = useState([]);
	const [deleteQuestion, setDeleteQuestion] = useState([]);

	const handleCreatePakageForACourse = async () => {
		console.log({
			lessonPakages: lesson,
		});
		try {
			const data = await axios.post(
				`/api/course/update_pakage/id=${course?.course?.courseID}`,
				{
					lessonPakages: lesson,
					deletePackage: deletePackage.length > 0 ? deletePackage : null,
					deleteLesson: deleteLesson.length > 0 ? deleteLesson : null,
					deleteQuestion: deleteQuestion.length > 0 ? deleteQuestion : null,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			toast.success(data?.data?.msg);
		} catch (err) {
			toast.error(err?.response?.data?.msg);
			dispatch(isFailing());
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	return (
		<div className="managerCourse">
			<div className="row">
				<div className="col c-12 m-8 l-8">
					<div className="newPost_title">
						<textarea
							ref={titleRef}
							className="create_input_title"
							type="text"
							placeholder="Title"
							defaultValue={course?.course?.courseName}
						/>
					</div>
					<div className="newPost_title">
						<textarea
							ref={contentRef}
							className="create_input_Content"
							type="text"
							placeholder="Content"
							defaultValue={course?.course?.description?.split("--?--")[0]}
						/>
					</div>
					<div className="course_detail_learn">
						<h3>The benefits of this course:</h3>
						<div className="create_course_input">
							<input ref={benefitRef} type="text" placeholder="Enter benefit" />
							<button onClick={handleCreateBenefit}>Send</button>
						</div>
					</div>
					<ul id="benefit" className="course_detail_learn_items">
						{benefit?.length === 0 ? (
							<li className="benefitList">Example of benefit of this course</li>
						) : (
							benefit?.map((item, index) => (
								<li className="benefitList" key={item + "benefit" + index}>
									{item}
									<div className="benefit_button">
										<button
											onClick={() => handleDeleteList(index)}
											className="delete_button"
										>
											Delete
										</button>
									</div>
								</li>
							))
						)}
					</ul>
					<div className="course_detail_learn">
						<h3>Content of this course</h3>
					</div>
					<div className="course_detail_timeLine">
						<ul>
							<li>
								<b ref={lessonLengthRef}>{lesson?.length}</b> Topics
							</li>
							<li>.</li>
							<li>
								<b ref={numOfLessonRef}>{numberOfLesson?.num}</b> Lessons
							</li>
							<li>.</li>
							<li>
								Times{" "}
								<b ref={timeOfLessonRef}>{`${
									Math.floor(numberOfLesson?.time / 3600) < 10 ? "0" : ""
								}${Math.floor(numberOfLesson?.time / 3600)} :
                                
                                ${
																	Math.floor(numberOfLesson?.time / 3600) > 0
																		? `${
																				Math.floor(numberOfLesson?.time / 60) -
																					Math.floor(
																						numberOfLesson?.time / 3600
																					) *
																						60 <
																				10
																					? "0"
																					: ""
																		  }${
																				Math.floor(numberOfLesson?.time / 60) -
																				Math.floor(
																					numberOfLesson?.time / 3600
																				) *
																					60
																		  }`
																		: `${
																				Math.floor(numberOfLesson?.time / 60) <
																				10
																					? "0"
																					: ""
																		  }${Math.floor(numberOfLesson?.time / 60)}`
																} : ${
									Math.floor(numberOfLesson?.time) -
										Math.floor(numberOfLesson?.time / 60) * 60 <
									10
										? "0"
										: ""
								}${
									Math.floor(numberOfLesson?.time) -
									Math.floor(numberOfLesson?.time / 60) * 60
								}`}</b>
							</li>
						</ul>
						<button
							style={{ height: "4rem" }}
							className="button button_update"
							onClick={handleCreatePakageForACourse}
						>
							Save Topics
						</button>
					</div>
					<div className="CoursePanel">
						{lesson?.map((item, index) => (
							<CoursePanelEdit
								setUrlArray={setUrlArray}
								urlArray={urlArray}
								urlArrayRef={urlArrayRef.current}
								setLesson={setLesson}
								setAddLesson={setAddLesson}
								lesson={lesson}
								key={index + "coursePanel"}
								item={item}
								index={index}
								setDeleteLesson={setDeleteLesson}
								setDeletePackage={setDeletePackage}
								setDeleteQuestion={setDeleteQuestion}
								deleteLesson={deleteLesson}
								deletePackage={deletePackage}
								deleteQuestion={deleteQuestion}
							/>
						))}
						{inputForm && (
							<div className="CoursePanel_wrap">
								<div className="CoursePanel_create_input">
									<input
										ref={lessonRef}
										type="text"
										placeholder="Enter title"
									/>
									<button onClick={handleCreateLesson}>Save</button>
								</div>
							</div>
						)}
						<div className="CoursePanel_wrap">
							<div className="CoursePanel_create_container">
								<div
									onClick={() => {
										setInputForm(!inputForm);
									}}
									title="Add more"
									className="plus"
								>
									+
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col c-12 m-4 l-4">
					<div className="course_create_detail_img">
						<div className="movie_drop_zone">
							<div className="movie_drop_zone_wrap" {...getRootProps()}>
								<input {...getInputProps()} />
								<i className="fa-regular fa-image"></i>
								<div className="image_create_container">
									<img src={image || course?.course?.image} />
								</div>
							</div>
						</div>
					</div>
					<div className="newPost_title">
						<div
							style={{
								color: "#F05123",
								textAlign: "center",
							}}
							className="newPost_title_edit"
							id="priceOfCourse"
						></div>
					</div>
					<div className="course_detail_button">
						<button
							onClick={handleCreateNewCourse}
							title="Save this course"
							className="save_button"
						>
							Save
						</button>
					</div>
					<div className="type_select">
						<Select
							className="search_wrap_select"
							value={selectedOption}
							onChange={setSelectedOption}
							options={optionsKind}
							placeholder="Kind"
						/>
					</div>
					<ul className="course_detail_list">
						<li>
							<i>
								Course Expert:
								{courseExpert ? (
									<span
										onClick={() => {
											setExpert(true);
										}}
										className="choose_expert"
									>
										{courseExpert?.name}
									</span>
								) : (
									<span
										onClick={() => {
											setExpert(true);
										}}
										className="choose_expert"
									>
										Choose
									</span>
								)}
							</i>
						</li>
						<li>
							<i>Confident when studying</i>
						</li>
					</ul>
				</div>
			</div>
			{addLesson && (
				<div className="lessonCreate">
					<div className="lessonCreate_wrap">
						<div className="expertCourse_close">
							<div
								onClick={() => {
									setAddLesson("");
									setType("listening");
								}}
								className="expertCourse_close_icons"
							>
								&times;
							</div>
						</div>
						<div className="lessonCreate_title">Create Lesson</div>
						<div className="lessonCreate_type">
							<div className="lessonCreate_type_form">
								{type === "listening" ? (
									<input
										onChange={(e) => {
											if (e.target.checked) {
												setType("listening");
											}
										}}
										id="listening"
										type="radio"
										name="lesson"
										defaultChecked
									/>
								) : (
									<input
										onChange={(e) => {
											if (e.target.checked) {
												setType("listening");
											}
										}}
										id="listening"
										type="radio"
										name="lesson"
									/>
								)}
								<label htmlFor="listening">Listening</label>
							</div>
							<div className="lessonCreate_type_form">
								{type === "reading" ? (
									<input
										id="reading"
										type="radio"
										name="lesson"
										onChange={(e) => {
											if (e.target.checked) {
												setType("reading");
											}
										}}
										defaultChecked
									/>
								) : (
									<input
										id="reading"
										type="radio"
										name="lesson"
										onChange={(e) => {
											if (e.target.checked) {
												setType("reading");
											}
										}}
									/>
								)}
								<label htmlFor="reading">Reading</label>
							</div>
							<div className="lessonCreate_type_form">
								{type === "quiz" ? (
									<input
										onChange={(e) => {
											if (e.target.checked) {
												setType("quiz");
											}
										}}
										id="quiz"
										type="radio"
										name="lesson"
										defaultChecked
									/>
								) : (
									<input
										onChange={(e) => {
											if (e.target.checked) {
												setType("quiz");
											}
										}}
										id="quiz"
										type="radio"
										name="lesson"
									/>
								)}
								<label htmlFor="quiz">Quiz</label>
							</div>
						</div>
						<div className="lessonCreate_form">
							{type === "listening" && (
								<Listening
									setLesson={setLesson}
									lesson={lesson}
									addLesson={addLesson}
									setAddLesson={setAddLesson}
									setType={setType}
								/>
							)}
							{type === "reading" && (
								<Reading
									setLesson={setLesson}
									lesson={lesson}
									addLesson={addLesson}
									setAddLesson={setAddLesson}
									setType={setType}
									urlArray={urlArray}
									setUrlArray={setUrlArray}
									urlArrayRef={urlArrayRef.current}
								/>
							)}
							{type === "quiz" && (
								<Quiz
									setLesson={setLesson}
									lesson={lesson}
									addLesson={addLesson}
									setAddLesson={setAddLesson}
									setType={setType}
								/>
							)}
						</div>
					</div>
					{type === "reading" && (
						<div
							onClick={() => {
								setPreviousLink(true);
							}}
							className="previousLink"
						>
							Previous Upload File Link
						</div>
					)}
					{type === "reading" && previousLink && (
						<div className="lessonCreate previousLink_form">
							<div className="previousLink_wrap">
								<div className="expertCourse_close">
									<div
										onClick={() => {
											setPreviousLink(false);
										}}
										className="expertCourse_close_icons"
									>
										&times;
									</div>
								</div>
								<div className="previousLink_list">
									<ul>
										{urlArrayRef.current?.map((item, index) => (
											<li key={index + "listArray"}>
												<a href="#">{item}</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CreateCourse;
