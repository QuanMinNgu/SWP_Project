import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BlogCard from "../card/BlogCard";
import Pagination from "../paginating/Pagination";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import "./style.scss";
const Blog = () => {
	const dispatch = useDispatch();
	const [listBLog, setListBlog] = useState([]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		const axiosGetAllBlog = async () => {
			dispatch(isLoading());
			try {
				const res = await axios.get("/api/blog?page=1&limit=20");
				setListBlog(res?.data);
				console.log(res?.data);
				dispatch(isSuccess());
			} catch (err) {
				dispatch(isFailing());
				return toast.error(err?.response?.date?.msg);
			}
		};
		axiosGetAllBlog();
	}, []);
	return (
		<div className="blog_container">
			<div className="blog_container_header">
				<div className="blog_container_header_left">
					<h2 style={{ fontSize: "4rem" }}>Blog</h2>
					<p>Share good blog here</p>
				</div>
				<div className="blog_container_header_right">
					<div className="blog_container_header_right_input">
						<input type="text" placeholder="Tìm kiếm blog" />
						<button>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</div>
				</div>
			</div>
			<div className="blog_container_body">
				<div className="blog_container_body_cards">
					{listBLog?.blogs?.map((item, index) => {
						return <BlogCard item={item} key={index} />;
					})}
				</div>
			</div>
			<div className="pagination blog_page">
				<Pagination count={listBLog?.numPage} />
			</div>
		</div>
	);
};

export default Blog;
