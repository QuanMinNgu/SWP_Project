import React, { useEffect } from "react";
import BlogCard from "../card/BlogCard";
import "./style.scss";
const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blog;
