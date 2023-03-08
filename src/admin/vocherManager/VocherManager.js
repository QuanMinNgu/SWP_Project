import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import Pagination from "../../paginating/Pagination";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import VoucherCard from "./VoucherCard";
function VocherManager() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fillters, setFillters] = useState({});
  const page = new URLSearchParams(search).get("page") || 1;
  const [vouchers, setVouchers] = useState([]);
  const auth = useSelector((state) => state?.auth);
  const [update, setUpdate] = useState(false);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  useEffect(() => {
    console.log(fillters);
  }, [fillters]);
  useEffect(() => {
    let here = true;
    const url = `/api/voucher/sale_manager?page=${page}&limit=20`;
    dispatch(isLoading());
    axios
      .get(url, {
        headers: { token: auth?.user?.token },
      })
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setVouchers(res?.data);
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
  }, [page, update]);
  return (
    <div className="sale_voucher">
      <div className="sale_voucher_head">
        <div className="sale_voucher_head_fillters">
          <Select
            className="option_select_sale"
            options={options}
            onChange={(choice) =>
              setFillters({ ...fillters, ontions: choice.value })
            }
          />
          <Select
            className="option_select_sale"
            options={options}
            onChange={(choice) =>
              setFillters({ ...fillters, option2: choice.value })
            }
          />
          <button
            className="button"
            style={{
              marginLeft: "2rem",
              padding: "1rem 2rem",
            }}
          >
            Search
          </button>
        </div>
        <div className="sale_voucher_head_create">
          <button
            className="button"
            onClick={() => navigate("/admin/create_voucher")}
          >
            Create New Voucher
          </button>
        </div>
      </div>
      <div className="manage_voucher">
        <table className="s_table">
          <thead className="s_thead">
            <tr className="s_trow">
              <th className="v_stt">STT</th>
              <th className="v_voucher">Voucher</th>
              <th className="v_value">Value</th>
              <th className="v_time">Duration</th>
              <th className="v_time">Apply</th>
              <th className="v_time">Status</th>
              <th className="v_time"></th>
            </tr>
          </thead>
          <tbody>
            {vouchers?.vouchers?.map((item, index) => {
              return (
                <VoucherCard
                  item={item}
                  index={index}
                  update={update}
                  setUpdate={setUpdate}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination ">
        <Pagination count={vouchers?.numPage} />
      </div>
    </div>
  );
}

export default VocherManager;
