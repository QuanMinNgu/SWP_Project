import React, { useEffect } from "react";
import BlogCard from "../card/BlogCard";
import "./style.scss";
const Blog = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="blog_left">
            <div className="blog_header">
                <h1 className="blog_header_title">Bài viết nổi bật</h1>
                <p className="blog_header_para">
                    Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập
                    trình online và các kỹ thuật lập trình web.
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
    );
};

export default Blog;
