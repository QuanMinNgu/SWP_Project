import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../card/BlogCard";
import "./style.scss";
const Blog = () => {
  return (
    <div className="blog">
      <div className="home_navbar">
        <div className="home_navbar_plus">
          <i className="fa-solid fa-plus"></i>
        </div>
        <Link className="home_navbar_items" to="/">
          <div>
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </div>
        </Link>
        <Link className="home_navbar_items" to="/">
          <div>
            <i className="fa-solid fa-road"></i>
            <span>Lộ trình</span>
          </div>
        </Link>
        <Link className="home_navbar_items" to="/">
          <div>
            <i className="fa-solid fa-lightbulb"></i>
            <span>Học</span>
          </div>
        </Link>
        <Link className="home_navbar_items" to="/">
          <div className="active">
            <i className="fa-solid fa-calculator"></i>
            <span>Blog</span>
          </div>
        </Link>
      </div>
      <div className="blog_left">
        <div className="blog_header">
          <h1 className="blog_header_title">Bài viết nổi bật</h1>
          <p className="blog_header_para">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
            và các kỹ thuật lập trình web.
          </p>
        </div>
        <div className="blog_body">
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
          <div className="card_wraper">
            <BlogCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
