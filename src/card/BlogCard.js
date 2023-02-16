import React, { useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link } from "react-router-dom";
const BlogCard = ({ item, key }) => {
  const [love, setLove] = useState(false);
  const handleLove = () => {
    setLove(!love);
  };
  return (
    <div className="blog_card" key={key}>
      <Link to="/blog/abc">
        <div className="blog_card_header">
          <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
        </div>
      </Link>
      <div className="blog_card_body">
        <div className="blog_card_body_top">
          <div>
            <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
            <h2>{item?.account?.accountName}</h2>
          </div>
          <div>
            <span>{item?.courseType?.courseTypeName}</span>
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
              <h3>{item?.blogName}</h3>
            </div>
          </Link>
          <div className="blog_card_body_content_mid">
            <p>{item?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
