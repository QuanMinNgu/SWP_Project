import React, { useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link } from "react-router-dom";
const BlogCard = () => {
  const [love, setLove] = useState(false);
  const handleLove = () => {
    setLove(!love);
  };
  return (
    <div className="blog_card">
      <Link to="/blog/abc">
        <div className="blog_card_header">
          <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
        </div>
      </Link>
      <div className="blog_card_body">
        <div className="blog_card_body_top">
          <div>
            <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
            <h2>Nguyen Dinh Hoan</h2>
          </div>
          <div>
            <span>Lập trình</span>
            <div onClick={handleLove}>
              {love ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </div>
          </div>
        </div>
        <div className="blog_card_body_content">
          <Link
            to="/blog/abc"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div className="blog_card_body_content_header">
              <h3>Thực hành Flexbox</h3>
            </div>
          </Link>
          <div className="blog_card_body_content_mid">
            <p>
              Hi there, in this article I will guide you guys on how to use
              CKEditor v5 in React project you can also use this in the...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
