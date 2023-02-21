import React, { useState } from "react";

function MarketingCart() {
  const [option, setOption] = useState(false);
  return (
    <tr className="s_trow">
      <th className="v_stt fn">1</th>
      <th className="v_voucher fn">Giảm giá cho thành viên mới</th>
      <th className="v_type fn">
        <div>
          <img src="https://i.pinimg.com/564x/d3/b8/e2/d3b8e20c960f4bcf1a68ae6f55a12497.jpg" />
        </div>
      </th>
      <th className="v_option">
        <i class="fa-solid fa-ellipsis" onClick={() => setOption(!option)}></i>
        {option && (
          <div className="v_option_select">
            <div>Edit</div>
            <div>Delete</div>
          </div>
        )}
      </th>
    </tr>
  );
}

export default MarketingCart;
