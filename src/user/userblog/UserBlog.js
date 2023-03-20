import UserBlogCard from "./UserBlogCard";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
const UserBlog = () => {
  const [listBlog, setListBlog] = useState([]);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    let here = true;
    const url = `/api/blog/my_blog`;
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
        setListBlog(res?.data?.blogs);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [update]);
  return (
    <div className="user_blog">
      <div className="user_blog_header">
        <h1>My Blog</h1>
        <p>Nơi lưu trữ blog của bạn</p>
      </div>
      <div className="user_blog_body">
        {listBlog?.map((item, index) => {
          return (
            <UserBlogCard
              item={item}
              index={index}
              setListBlog={setListBlog}
              listBlog={listBlog}
              update={update}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
    </div>
  );
};
export default UserBlog;
