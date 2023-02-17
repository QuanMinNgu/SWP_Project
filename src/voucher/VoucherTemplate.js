import React, { useState } from "react";
import "./style.scss";
function VoucherTemplate() {
	return (
		<div className="voucher_template vocher_template_detail">
			<div className="voucher_template_top">
				<h2>Gift Voucher</h2>
			</div>
			<div className="voucher_template_body">
				<h2 className="v_name">Amount : $120</h2>
				<div
					style={{
						display: "flex",
						width: "100%",
						flexWrap: "wrap",
					}}
				>
					<h2 className="t_time">From : 12/12/2022</h2>
					<h2 className="t_time">To : 01/03/2023</h2>
				</div>
			</div>
		</div>
	);
}

export default VoucherTemplate;
