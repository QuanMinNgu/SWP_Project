import React, { useState } from "react";
import "./style.scss";
function VoucherTemplate({ onClick }) {
  return (
    <div className="voucher_new">
      <div className="voucher_new_left" onClick={onClick}>
        <div className="voucher_new_left_header">
          <h3>Voucher</h3>
        </div>
        <div className="voucher_new_left_body">
          <div className="voucher_new_left_body_time">
            <p>Valid Until</p>
            <span>23 June 2023</span>
          </div>
          <div className="voucher_new_left_body_des">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              vulputate tellus ut magna vehicula lobortis.
            </p>
          </div>
        </div>
      </div>
      <div className="voucher_new_left_right">
        <div className="voucher_new_left_right_header">
          <p>Value</p>
          <h3>25$</h3>
          <button className="button" style={{ height: "30px" }}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoucherTemplate;
