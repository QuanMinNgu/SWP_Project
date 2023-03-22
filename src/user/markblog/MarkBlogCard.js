import React, { useContext, useEffect, useState } from "react";
import "../userblog/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.scss";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";

function MarkBlogCard({ item, index, update, setUpdate }) {
  const [love, setLove] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const auth = useSelector((state) => state?.auth);
  const { store } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleWatchProfile = () => {
    navigate(`/profile/${item?.accountID}`);
  };
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
      setUpdate(!update);
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
  useEffect(() => {
    if (item?.blogReactID) {
      setCurrentID(item?.blogReactID);
      setLove(true);
    }
  }, [item]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
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
