import axios from "axios";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import "./style.scss";
const MarketingCard = ({ item, index, update, setUpdate }) => {
  const dispatch = useDispatch();
  const handleDeleteMarket = async () => {
    try {
      dispatch(isLoading());
      const res = await axios.post(`/api/marketing/delete/${item?.id}`);
      setUpdate(!update);
      dispatch(isSuccess());
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="marketing_card_items" key={index}>
      <img src={item?.link} alt="anh" />
      <div className="marketing_card_abs">
        <div>
          <button
            style={{ height: "4rem" }}
            className="button button_delete"
            onClick={handleDeleteMarket}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingCard;
