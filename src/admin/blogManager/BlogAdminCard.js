import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import "./main.scss";

const BLogAdminCard = ({ item, index, setUpdate, update }) => {
  const [option, setOption] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const handleClick = () => {
    setOption(!option);
  };
  const handleDelete = async () => {
    try {
      dispatch(isLoading());
      const res = await axios.post(`/api/blog/delete?id=${item?.blogID}`, {
        token: auth?.user?.token,
      });
      dispatch(isSuccess());
      setUpdate(!update);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <tr className="b_row">
      <td className="b_stt">
        <h2>{index + 1}</h2>
      </td>
      <td className="b_user">
        <div className="b_user_wrap">
          <div className="b_user_wrap_img">
            <img src={item?.image} />
          </div>
          <div className="b_user_wrap_info">
            <h3>{item?.name}</h3>
          </div>
        </div>
      </td>
      <td className="b_content">
        <div>
          <div className="b_content_top">
            <h3>{item?.blogName}</h3>
          </div>
          <div className="b_content_bottom">
            <p>{item?.blogMeta}</p>
          </div>
        </div>
      </td>
      <td className="b_option">
        <button
          className="button"
          style={{
            height: "30px",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BLogAdminCard;
