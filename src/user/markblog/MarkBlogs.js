import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import "../userblog/style.scss";
import MarkBlogCard from "./MarkBlogCard";
const MarkBlog = () => {
  const [listBlog, setListBlog] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    let here = true;
    const url = `/api/blog/get_favorite`;

    dispatch(isLoading());
    axios
      .get(url, {
        headers: {
          token: auth.user?.token,
        },
      })
      .then((res) => {
        if (!here) {
          return;
        }
        console.log(res?.data);
        if (res?.data?.blogs) {
          setListBlog(res?.data?.blogs);
        } else {
          setListBlog([]);
        }
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  return (
    <div className="user_blog">
      <div className="user_blog_header">
        <h1>Favorite Posts</h1>
      </div>
      <div className="user_blog_body">
        {listBlog?.map((item, index) => {
          return (
            <MarkBlogCard
              item={item}
              index={index}
              setListBlog={setListBlog}
              listBlog={listBlog}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MarkBlog;
