import React, { useEffect, useState } from "react";
import "../userblog/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.scss";
import { useNavigate } from "react-router";

function MarkBlogCard({ item, index, listBlog, setListBlog, cache }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const handleNotMark = async () => {
    try {
      dispatch(isLoading());
      const res = await axios.post(`/api/blog/not_mark?id=${item?.blogID}`, {
        token: auth?.user?.token,
      });
      dispatch(isSuccess());
      const newArr = listBlog?.filter((ite) => ite?.blogID !== item?.blogID);
      cache.current["/api/blog/mark_blog"] = [...newArr];
      setListBlog([...newArr]);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
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
            <span>{item?.courseType?.courseTypeName}</span>
            <div
              style={{
                fontSize: "1rem",
                padding: "6px",
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              {item?.courseType}
            </div>
            <div>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px 6px" }}>
          <div>
            <h3 className="title_blog">{item?.blog?.blogName} </h3>
          </div>
          <div className="user_card_body_content">
            <p className="text_blog">{item?.blog?.blogMeta} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkBlogCard;
