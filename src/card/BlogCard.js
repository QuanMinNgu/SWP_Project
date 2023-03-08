import React, { useEffect, useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
const BlogCard = ({ item, key, update, setUpdate, loveBlog }) => {
  const [love, setLove] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const handleLove = async () => {
    if (!love) {
      try {
        dispatch(isLoading());
        const res = await axios.post(`/api/blog/save?id=${item?.blogID}`, {
          token: auth?.user?.token,
        });
        dispatch(isSuccess());
        setLove(!love);
        setUpdate(!update);
        return toast.success(res?.data?.msg);
      } catch (error) {
        dispatch(isFailing());
        return toast.error(error?.response?.data?.msg);
      }
    } else {
      try {
        dispatch(isLoading());
        const res = await axios.post(`/api/blog/not_mark?id=${item?.blogID}`, {
          token: auth?.user?.token,
        });
        dispatch(isSuccess());
        setLove(!love);
        setUpdate(!update);
        return toast.success(res?.data?.msg);
      } catch (error) {
        dispatch(isFailing());
        return toast.error(error?.response?.data?.msg);
      }
    }
  };
  const handleBlogDetail = () => {
    navigate(`/blog/${item?.blogID}`);
  };
  useEffect(() => {
    const check = loveBlog?.find((ite) => ite?.blogID === item?.blogID);
    if (check) {
      setLove(true);
    } else {
      setLove(false);
    }
  }, [loveBlog]);
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
            style={{ cursor: "pointer" }}
          >
            <h3 className="blog_card_name_content_name">{item?.blogName}</h3>
          </div>
          <div className="blog_card_body_content_mid">
            <p className="blog_meta_card_contanert">{item?.blogMeta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
