import { useContext, useEffect, useRef, useState } from "react";
import Comment from "../comment/Comment";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const BlogDetail = () => {
  const auth = useSelector((state) => state?.auth);
  const [love, setLove] = useState(false);
  const [blog, setBlog] = useState();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [currentID, setCurrentID] = useState(null);

  const handleNavComment = () => {
    document.getElementById("commentContainer").scrollIntoView();
  };
  const [time, setTime] = useState(0);
  const handleLove = async () => {
    try {
      dispatch(isLoading());
      console.log({
        blogID: slug.toString(),
        blogReactID: currentID,
      });
      const res = await axios.post(
        `/api/blog/mark_blog`,
        {
          blogID: slug,
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
  useEffect(() => {
    let here = true;
    const url = `/api/common/blog/blog_details?id=${slug}`;

    dispatch(isLoading());
    axios
      .get(url, { headers: { token: auth?.user ? auth?.user?.token : null } })
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setBlog(res?.data?.blogDetail);
        setContent(res?.data?.blogDetail?.content);
        if (res?.data.blogDetail?.blogReactID) {
          setCurrentID(res?.data?.blogDetail?.blogReactID);
          setLove(true);
        }
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        if (!here) {
          return dispatch(isFailing());
        }
        dispatch(isFailing());
        toast.error(err?.response?.data?.msg);
      });
    return () => {
      here = false;
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      return;
    }
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
  const handleReport = async () => {
    if (time) {
      return toast.error(`Please wating ${time} second to repord again.`);
    }
    try {
      dispatch(isLoading());
      const res = await axios.post(
        `/api/comment/report?id=${slug}&type=blog`,
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
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="blog_detail" style={{ width: "100%" }}>
      <div className="blog_detail_user">
        <div className="blog_detail_user_info">
          <h2>{blog?.name}</h2>
          <div className="blog_detail_user_react">
            <div className="blog_detail_user_react_love" onClick={handleLove}>
              {love ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </div>
            <i
              onClick={handleNavComment}
              style={{
                marginLeft: "40px",
              }}
              className="fa-regular fa-comment"
            ></i>
            {auth?.user?.id === blog?.accountID ? (
              ""
            ) : (
              <i
                class="fa-regular fa-flag"
                onClick={handleReport}
                style={{
                  marginLeft: "40px",
                }}
              ></i>
            )}
          </div>
        </div>
      </div>
      <div className="blog_detail_center">
        <div className="blog_detail_center_header">
          <h2>{blog?.blogName}</h2>
        </div>
        <div className="blog_detail_center_info">
          <img src={blog?.image} />
          <div className="blog_detail_center_info_user">
            <h2>{blog?.name}</h2>
          </div>
        </div>
        <div className="blog_detail_center_content">
          <div>{content ? parse(content) : ""}</div>
        </div>
      </div>
      <div
        style={{ width: "100%" }}
        id="commentContainer"
        className="comment_Container"
      >
        <Comment type="blog" id={slug} />
      </div>
    </div>
  );
};
export default BlogDetail;
