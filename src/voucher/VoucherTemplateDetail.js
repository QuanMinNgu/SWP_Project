import React from "react";
import "./style.scss";
function VoucherTemplateDetail({ currentVoucher }) {
  return (
    <div className="voucher_template">
      <div className="voucher_template_top">
        <h2>Gift Voucher</h2>
      </div>
      <div className="voucher_template_body">
        <h2 className="v_name">Name : {currentVoucher?.name}</h2>
        <h2 className="v_name v_description">
          Description : {currentVoucher?.description}
        </h2>
        <h2 className="v_name">Amount : ${currentVoucher?.amount}</h2>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <h2 className="t_time">Valid To : {currentVoucher?.validUntil}</h2>
        </div>
      </div>
    </div>
  );
}

export default VoucherTemplateDetail;
