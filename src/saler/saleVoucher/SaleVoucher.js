import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./style.scss";
import VoucherCard from "./VoucherCard";
function SaleVoucher() {
  const navigate = useNavigate();
  const [fillters, setFillters] = useState({});
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  useEffect(() => {
    console.log(fillters);
  }, [fillters]);
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
            onClick={() => navigate("/sale/create_voucher")}
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
              <th className="v_type">Type</th>
              <th className="v_time">From</th>
              <th className="v_time">To</th>
            </tr>
          </thead>
          <tbody>
            <VoucherCard />
            <VoucherCard />
            <VoucherCard />
            <VoucherCard />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SaleVoucher;
