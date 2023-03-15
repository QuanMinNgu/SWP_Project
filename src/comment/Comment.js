import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";
const Comment = ({ type, id }) => {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const { socket } = useContext(UserContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    if (id) {
      let here = true;
      const url = `/api/comment/get?id=${id}&type=${type}`;
      dispatch(isLoading());
      axios
        .get(url)
        .then((res) => {
          if (!here) {
            return dispatch(isSuccess());
          }
          dispatch(isSuccess());
          setCommentArray(res?.data?.comments);
        })
        .catch((err) => {
          if (!here) {
            return dispatch(isFailing());
          }
          toast.error(err?.response?.data?.msg);
          dispatch(isFailing());
        });
      return () => {
        here = false;
      };
    }
  }, [id]);
  const handleComment = async () => {
    if (!comment) {
      return toast.error("Please enter content in comment");
    }
    try {
      dispatch(isLoading());
      const data =
        type === "blog"
          ? {
              comment,
              accountID: auth?.user?.id,
              blogID: id,
              type,
            }
          : {
              comment,
              accountID: auth?.user?.id,
              lessonID: id,
              type,
            };
      console.log(data);
      const res = await axios.post("/api/comment/create", data, {
        headers: { token: auth?.user?.token },
      });
      console.log(res?.data);
      dispatch(isSuccess());
      await socket.emit("send_mess", {
        commentID: res?.data?.commentID,
        comment,
        id,
        accountID: auth?.user?.id,
        image: auth?.user?.image,
        userName: auth?.user?.name,
      });
      commentArray.push({
        commentID: res?.data?.commentID,
        comment,
        id,
        accountID: auth?.user?.id,
        image: auth?.user?.image,
        userName: auth?.user?.name,
      });
      setCommentArray([...commentArray]);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    socket.on("recieve", (data) => {
      setCommentArray((pre) => [data, ...pre]);
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="comment">
      <div className="comment_navbar">
        <div className="comment_navbar_title">
          <i
            style={{
              marginRight: "0.5rem",
              marginTop: "0.5rem",
            }}
            className="fa-solid fa-comment"
          ></i>
          <h2>Comment</h2>
        </div>
        <div className="comment_navbar_button">
          <button onClick={handleComment}>Send</button>
        </div>
      </div>
      <div className="comment_input">
        <div
          onInput={(e) => {
            setComment(e.target.innerHTML);
          }}
          contentEditable="true"
          className="comment_input_detail"
        ></div>
        <div
          style={!comment ? { display: "flex" } : { display: "none" }}
          className="comment_input_detail_abs"
        >
          Comment in here
        </div>
      </div>
      <div className="comment_cards">
        {commentArray?.map((item, index) => (
          <CommentCard key={index + id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
