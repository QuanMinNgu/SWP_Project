import React from "react";
import { useNavigate } from "react-router-dom";
import VoucherCard from "../saleVoucher/VoucherCard";
import MarketingCart from "./MarketingCart";
import "./style.scss";
const Marketing = () => {
  const navigate = useNavigate();
  const handleCreateNewMarket = () => {
    navigate("/sale/create_market");
  };
  return (
    <div className="marketing">
      <div className="marketing_create">
        <button
          className="button"
          style={{
            height: "40px",
          }}
          onClick={handleCreateNewMarket}
        >
          Create new Market
        </button>
      </div>
      <div className="manage_voucher">
        <table className="s_table">
          <thead className="s_thead">
            <tr className="s_trow">
              <th className="v_stt">STT</th>
              <th className="v_voucher">Name</th>
              <th className="v_time">Market Image</th>
            </tr>
          </thead>
          <tbody>
            <MarketingCart />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marketing;
