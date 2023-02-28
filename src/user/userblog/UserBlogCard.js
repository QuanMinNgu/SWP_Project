import "./style.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { toast } from "react-toastify";
const UserBlogCard = ({ item, index, cache, setListBlog, listBlog }) => {
  const [option, setOption] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      dispatch(isLoading());
      const res = await axios.post(`/api/blog/delete?id=${item?.blogID}`, {
        token: auth?.user?.token,
      });
      dispatch(isSuccess());
      const newArr = listBlog?.filter((ite) => ite?.blogID !== item?.blogID);
      cache.current["/api/blog/my_blog"] = [...newArr];
      setListBlog([...newArr]);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="user_card" key={index}>
      <div className="user_card_body">
        <div className="user_card_body_top">
          <h3>{item?.blogName}</h3>
          <div className="user_card_body_top_option">
            <span>{item?.courseType}</span>
            <i
              class="fa-solid fa-ellipsis"
              onClick={() => setOption(!option)}
            ></i>
          </div>
          {option && (
            <div className="option_card_blog">
              <h3>Edit</h3>
              <h3 onClick={handleDelete}>Delete</h3>
            </div>
          )}
        </div>
        <div className="user_card_body_content">
          <p>{item?.meta || item?.content}</p>
        </div>
      </div>
    </div>
  );
};
export default UserBlogCard;
