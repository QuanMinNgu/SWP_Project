import React from "react";
import "./style.scss";
function VoucherTemplate({ onClick, item, index, setApply, apply }) {
	return (
		<div className="voucher_new" key={index}>
			<div className="voucher_new_left" onClick={onClick}>
				<div className="voucher_new_left_header">
					<h3>Voucher</h3>
				</div>
				<div className="voucher_new_left_body">
					<div className="voucher_new_left_body_time">
						<p>Valid Until</p>
						<span>{item?.validUntil}</span>
					</div>
					<div className="voucher_new_left_body_des">
						<p>{item?.description}</p>
					</div>
				</div>
			</div>
			<div className="voucher_new_left_right">
				<div className="voucher_new_left_right_header">
					<p>Value</p>
					<h3>{item?.amount}$</h3>
					<button
						onClick={() => {
							if (
								apply?.voucherID?.toString() !== item?.voucherID?.toString()
							) {
								setApply(item);
							} else {
								setApply({});
							}
						}}
						className="button"
						style={{ height: "30px" }}
					>
						{apply?.voucherID?.toString() === item?.voucherID?.toString()
							? "UnApply"
							: "Apply"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default VoucherTemplate;
