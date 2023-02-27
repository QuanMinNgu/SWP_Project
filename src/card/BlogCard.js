import React, { useEffect, useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link, useNavigate } from "react-router-dom";
const BlogCard = ({ item, key }) => {
  const [love, setLove] = useState(false);
  const navigate = useNavigate();
  const handleLove = () => {
    setLove(!love);
  };
  const handleBlogDetail = () => {
    navigate(`/blog/${item?.blogID}`);
  };
  return (
    <div className="blog_card" key={key}>
      <div className="blog_card_body">
        <div className="blog_card_body_top">
          <div>
            <img src={item?.image} />
            <h2>{item?.name}</h2>
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
          <div
            className="blog_card_body_content_header"
            onClick={handleBlogDetail}
          >
            <h3>{item?.blogName}</h3>
          </div>
          <div className="blog_card_body_content_mid">
            <p>{item?.blogMeta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
