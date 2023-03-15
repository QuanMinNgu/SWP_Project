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
  const { cache } = useContext(UserContext);
  useEffect(() => {
    let here = true;
    const url = `/api/blog/mark_blog`;
    if (cache.current[url]) {
      return setListBlog(cache.current[url]);
    }
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
        setListBlog(res?.data?.blogs);
        console.log(res?.data?.blogs);
        cache.current[url] = res?.data?.blogs;
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
        <p>Nơi lưu trữ blog của bạn</p>
      </div>
      <div className="user_blog_body">
        {listBlog?.map((item, index) => {
          return (
            <MarkBlogCard
              item={item?.blog}
              index={index}
              cache={cache}
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
