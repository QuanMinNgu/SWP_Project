import React from "react";
import "./style.scss";
function VoucherTemplateDetail() {
  return (
    <div className="voucher_template">
      <div className="voucher_template_top">
        <h2>Gift Voucher</h2>
      </div>
      <div className="voucher_template_body">
        <h2 className="v_name">Name :</h2>
        <h2 className="v_name">Description :</h2>
        <h2 className="v_name">Amount :</h2>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <h2 className="t_time">From : </h2>
          <h2 className="t_time">To : </h2>
        </div>
      </div>
    </div>
  );
}

export default VoucherTemplateDetail;
