import React, { useEffect, useState } from "react";
import "../userblog/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";

function MarkBlogCard({ item, index, listBlog, setListBlog, cache }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
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
  return (
    <div className="user_card" key={index}>
      <div className="user_card_body">
        <div className="user_card_body_top">
          <h3>{item?.blogName}</h3>
          <div className="user_card_body_top_option">
            <span>{item?.courseType}</span>
            <i class="fa-solid fa-heart" onClick={handleNotMark}></i>
          </div>
        </div>
        <div className="user_card_body_content">
          <p>{item?.blogMeta}</p>
        </div>
      </div>
    </div>
  );
}

export default MarkBlogCard;
