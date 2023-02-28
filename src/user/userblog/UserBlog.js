import UserBlogCard from "./UserBlogCard";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { UserContext } from "../../App";
import Pagination from "../../paginating/Pagination";
import { useLocation } from "react-router-dom";
const UserBlog = () => {
  const { search } = useLocation();
  const [listBlog, setListBlog] = useState([]);
  const dispatch = useDispatch();
  const { cache } = useContext(UserContext);
  const auth = useSelector((state) => state?.auth);
  const page = new URLSearchParams(search).get("page") || 1;

  useEffect(() => {
    let here = true;
    const url = `/api/blog/my_blog?limit=20&page=${page}`;
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
        setListBlog(res?.data);
        cache.current[url] = res?.data;
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
        <h1>My Blog</h1>
        <p>Nơi lưu trữ blog của bạn</p>
      </div>
      <div className="user_blog_body">
        {listBlog?.blogs?.map((item, index) => {
          return <UserBlogCard item={item} index={index} />;
        })}
      </div>
      <div className="user_blog_footer">
        <Pagination count={listBlog?.numPage} />
      </div>
    </div>
  );
};
export default UserBlog;
