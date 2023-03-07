import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";

function VoucherCard({ item, index, setUpdate, update }) {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const handleEditVoucher = async () => {
    try {
      dispatch(isLoading());
      const res = axios.post(
        `/api/voucher/change_status`,
        {
          status: !item?.status,
          voucherID: item?.voucherID,
        },
        {
          headers: { token: auth?.user?.token },
        }
      );
      dispatch(isSuccess());
      setUpdate(!update);
      setOption(false);
      return toast.success(res.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <tr className="s_trow" key={index}>
      <th className="v_stt fn">{index + 1}</th>
      <th className="v_voucher fn">{item?.name}</th>
      <th className="v_value fn">{item?.amount}</th>
      <th className="v_type fn">
        <div>{item?.courseTypeName || item?.courseName}</div>
      </th>
      <th className="v_time fn">{item?.duration}</th>
      <th className="v_time fn">{item?.StartApply}</th>
      <th className="v_time fn">{item?.status ? "Active" : "Inactive"}</th>

      <th className="v_option">
        <i class="fa-solid fa-ellipsis" onClick={() => setOption(!option)}></i>
        {option && (
          <div className="v_option_select">
            <div onClick={handleEditVoucher}>Change Status</div>
          </div>
        )}
      </th>
    </tr>
  );
}

export default VoucherCard;
