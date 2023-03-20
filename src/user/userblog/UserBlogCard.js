import "./style.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UserBlogCard = ({ item, index, setUpdate, update }) => {
  const [option, setOption] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const contentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="user_card" key={index}>
      <div className="user_card_body">
        <div className="user_card_body_top">
          <div
            className="user_card_body_top_left"
            style={{
              display: "flex",
            }}
          >
            <img
              src={item?.image}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "700",
                fontSize: "1.6rem",
                color: "#292929",
                marginLeft: "10px",
              }}
            >
              {item?.name}
            </h3>
          </div>
          <div className="user_card_body_top_option">
            <span>{item?.courseTypeName}</span>
            <i
              class="fa-solid fa-ellipsis"
              onClick={() => setOption(!option)}
            ></i>
          </div>
          {option && (
            <div className="option_card_blog">
              <h3 onClick={() => navigate(`/me/blog/${item?.blogID}`)}>Edit</h3>
              <h3 onClick={handleDelete}>Delete</h3>
            </div>
          )}
        </div>
        <div className="user_card_body_content">
          <h3
            style={{
              fontSize: "1.6rem",
            }}
            className="header_blog"
          >
            {item?.blogName}
          </h3>
          <p ref={contentRef}>{item?.blogMeta}</p>
        </div>
      </div>
    </div>
  );
};
export default UserBlogCard;
