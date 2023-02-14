import React from "react";

import "./style.scss";
import VoucherTemplate from "./VoucherTemplate";
import VoucherTemplateDetail from "./VoucherTemplateDetail";
function Voucher() {
  return (
    <div className="voucher_template_warper">
      <VoucherTemplate />
      <VoucherTemplateDetail />
    </div>
  );
}

export default Voucher;
