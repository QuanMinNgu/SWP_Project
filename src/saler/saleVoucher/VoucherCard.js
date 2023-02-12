import React from "react";

function VoucherCard() {
  return (
    <tr className="s_trow">
      <th className="v_stt fn">1</th>
      <th className="v_voucher fn">Giảm giá cho thành viên mới</th>
      <th className="v_value fn">100.000đ</th>
      <th className="v_type fn">
        <div>
          <img src="https://i.pinimg.com/564x/d3/b8/e2/d3b8e20c960f4bcf1a68ae6f55a12497.jpg" />
        </div>
      </th>
      <th className="v_time fn">12/2/2023</th>
      <th className="v_time fn">12/2/2023</th>
    </tr>
  );
}

export default VoucherCard;
