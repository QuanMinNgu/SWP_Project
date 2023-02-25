import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import BlogCard from "../card/BlogCard";
import Pagination from "../paginating/Pagination";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import "./style.scss";
const Blog = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [listBLog, setListBlog] = useState([]);
  const { cache } = useContext(UserContext);
  const page = new URLSearchParams(search).get("page") || 1;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let here = true;
    const url = `/api/blog?page=${page}&limit=20`;
    if (cache.current[url]) {
      return setListBlog(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setListBlog(res?.data);
        cache.current[url] = res?.data;
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
