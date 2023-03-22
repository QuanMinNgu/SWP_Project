import React, { useEffect, useState } from "react";
import "../userblog/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.scss";
import { useNavigate } from "react-router";

function MarkBlogCard({ item, index, listBlog }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(item);
  }, [listBlog]);
  const handleWatchProfile = () => {
    navigate(`/profile/${item?.accountID}`);
  };
  return (
    <div className="user_card" key={index}>
      <div className="user_card_body">
        <div className="blog_card_body_top">
          <div>
            <img src={item?.image} />
            <h2 onClick={handleWatchProfile} style={{ cursor: "pointer" }}>
              {item?.name}
            </h2>
          </div>
          <div>
            <div
              style={{
                fontSize: "1rem",
                padding: "6px",
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              {item?.courseTypeName}
            </div>
            <div>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
        <div
          style={{ padding: "10px 6px", cursor: "pointer" }}
          onClick={() => navigate(`/blog/${item?.blogID}`)}
        >
          <div>
            <h3 className="title_blog">{item?.blogName} </h3>
          </div>
          <div className="user_card_body_content">
            <p className="text_blog">{item.blogMeta} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkBlogCard;
