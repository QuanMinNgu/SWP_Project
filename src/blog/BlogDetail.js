import { useContext, useEffect, useRef, useState } from "react";
import Comment from "../comment/Comment";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const BlogDetail = () => {
	const [react, setReact] = useState(false);
	const [blog, setBlog] = useState();
	const { cache } = useContext(UserContext);
	const { slug } = useParams();
	const dispatch = useDispatch();
	const handleNavComment = () => {
		document.getElementById("commentContainer").scrollIntoView();
	};
	const handleReact = () => {
		setReact(!react);
	};
	useEffect(() => {
		let here = true;
		const url = `/api/common/blog/blog_details?id=${slug}`;
		if (cache.current[url]) {
			return setBlog(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url)
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setBlog(res?.data?.blogDetail);
				cache.current[url] = res?.data?.blogDetail;
				console.log(res?.data);
				dispatch(isSuccess());
			})
			.catch((err) => {
				if (!here) {
					return dispatch(isFailing());
				}
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, []);
	return (
		<div className="blog_detail">
			<div className="blog_detail_user">
				<div className="blog_detail_user_info">
					<h2>{blog?.name}</h2>
					<div className="blog_detail_user_react">
						<div className="blog_detail_user_react_love" onClick={handleReact}>
							{react ? (
								<i className="fa-solid fa-heart"></i>
							) : (
								<i className="fa-regular fa-heart"></i>
							)}
							<span></span>
						</div>
						<i
							onClick={handleNavComment}
							style={{
								marginLeft: "40px",
							}}
							className="fa-regular fa-comment"
						></i>
					</div>
				</div>
			</div>
			<div className="blog_detail_center">
				<div className="blog_detail_center_header">
					<h2>{blog?.blogName}</h2>
				</div>
				<div className="blog_detail_center_info">
					<img src={blog?.image} />
					<div className="blog_detail_center_info_user">
						<h2>{blog?.name}</h2>
					</div>
				</div>
				<div className="blog_detail_center_content">
					<p> {blog?.content}</p>
				</div>
			</div>
			<div id="commentContainer" className="comment_Container">
				<Comment />
			</div>
		</div>
	);
};
export default BlogDetail;
