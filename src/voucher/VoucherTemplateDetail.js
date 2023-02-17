import React from "react";
import "./style.scss";
function VoucherTemplateDetail() {
	return (
		<div className="voucher_template">
			<div className="voucher_template_top">
				<h2>Gift Voucher</h2>
			</div>
			<div className="voucher_template_body">
				<h2 className="v_name">Name : This is for newbier</h2>
				<h2 className="v_name v_description">
					Description : This is for newbier This is for newbier This is for
					newbier
				</h2>
				<h2 className="v_name">Amount : $120</h2>

				<div
					style={{
						display: "flex",
						width: "100%",
						flexWrap: "wrap",
					}}
				>
					<h2 className="t_time">From : 11/11/2022</h2>
					<h2 className="t_time">To : 11/11/2023</h2>
				</div>
			</div>
		</div>
	);
}

export default VoucherTemplateDetail;
