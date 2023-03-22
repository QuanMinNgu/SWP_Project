import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { UserContext } from "../App";
const BlogCard = ({ item, index, update, setUpdate, loveBlog }) => {
  const [love, setLove] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [bars, setBars] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const [time, setTime] = useState(0);
  const contentRef = useRef("");
  const { store } = useContext(UserContext);
  const handleLove = async () => {
    try {
      dispatch(isLoading());
      console.log({
        blogID: item?.blogID,
        blogReactID: currentID,
      });
      const res = await axios.post(
        `/api/blog/mark_blog`,
        {
          blogID: item?.blogID,
          blogReactID: currentID,
        },
        {
          headers: { token: auth?.user?.token },
        }
      );
      dispatch(isSuccess());
      console.log(res?.data);
      setLove(!love);
      if (currentID) {
        setCurrentID(null);
      } else {
        setCurrentID(res?.data?.blogReactID);
      }
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  const handleBlogDetail = () => {
    navigate(`/blog/${item?.blogID}`);
  };
  useEffect(() => {
    if (item?.blogReactID) {
      setCurrentID(item?.blogReactID);
      setLove(true);
    }
  }, [item]);
  const handleWatchProfile = () => {
    navigate(`/profile/${item?.accountID}`);
  };
  const handleOption = () => {
    setBars(!bars);
  };
  const handleReport = async () => {
    if (time > 0) {
      return toast.error(`Please wating ${time} second to repord again.`, {
        autoClose: 2000,
      });
    }
    try {
      dispatch(isLoading());
      const res = await axios.post(
        `/api/comment/report?id=${item?.blogID}&type=blog`,
        {
          type: "blog",
        },
        {
          headers: {
            token: auth.user?.token,
          },
        }
      );
      dispatch(isSuccess());
      setTime(300);
      return toast.success(res?.data?.msg, {
        autoClose: 3000,
      });
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg, {
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    const timeInter = setInterval(() => {
      setTime((pre) => {
        if (pre < 1) {
          return pre;
        }
        return pre - 1;
      });
    }, [1000]);
    return () => {
      clearInterval(timeInter);
    };
  }, [time]);
  const handleUpdating = () => {
    navigate(`/me/blog/${item?.blogID}`);
  };
  const handleDelete = async () => {
    let check = window.confirm("Do you want to delete ?");
    if (check) {
      try {
        dispatch(isLoading());
        const res = await axios.post(
          `/api/blog/delete?id=${item?.blogID}`,
          {},
          {
            headers: { token: auth?.user?.token },
          }
        );
        dispatch(isSuccess());
        setUpdate(!update);
        setBars(false);
        return toast.success(res?.data?.msg);
      } catch (error) {
        dispatch(isFailing());
        return toast.error(error?.response?.data?.msg);
      }
    }
  };
  useEffect(() => {
    if (!item?.blogMeta) {
      contentRef.current.innerHTML = item?.content;
    }
  }, [item]);
  return (
    <div className="blog_card" key={index}>
      <div className="blog_card_body">
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
              {item?.courseType}
            </div>
            {auth?.user?.id !== item?.accountID &&
              (store?.rule === "ROLE_USER" ||
                store?.rule === "ROLE_COURSE_EXPERT") && (
                <div onClick={handleLove}>
                  {love ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </div>
              )}
            {auth?.user && (
              <div>
                {auth?.user?.id === item?.accountID ? (
                  <i
                    className="fa-solid fa-ellipsis"
                    onClick={handleOption}
                  ></i>
                ) : (
                  <i className="fa-regular fa-flag" onClick={handleReport}></i>
                )}
              </div>
            )}
          </div>
          {bars && (
            <div className="option_blog">
              <span onClick={handleUpdating}>Update</span>
              <span onClick={handleDelete}>Delete</span>
            </div>
          )}
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
            <p className="blog_meta_card_contanert" ref={contentRef}>
              {item?.blogMeta}
            </p>
          </div>
          <div
            className="date"
            style={{
              marginTop: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "800",
              }}
            >
              Create At : {format(new Date(item?.createDate), "dd-MM-yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
