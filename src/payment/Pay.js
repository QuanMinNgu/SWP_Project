import React from "react";
import "./style.scss";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Pay = ({ setPayment, setCanLearn, price }) => {
	const initialOptions = {
		"client-id":
			"AQVdNJ2adELwM1B1LTHKG8rcc-MKrGUU9g4SLcy3SYuAyYukSyCU7BFEZz7ix0nIaFksX0AeZrWkR8-h",
		currency: "USD",
		intent: "capture",
	};

	const handleApprove = () => {
		setCanLearn(true);
		setPayment(false);
		toast.success("Thank you for enrolled this course.");
	};
	return (
		<div className="payment">
			<div className="payment_container">
				<div title="Đóng cổng thanh toán" className="payment_close">
					<i
						onClick={() => {
							setPayment(false);
						}}
						className="fa-regular fa-circle-xmark"
					></i>
				</div>
				<PayPalScriptProvider options={initialOptions}>
					<PayPalButtons
						createOrder={(data, actions) => {
							return actions.order.create({
								purchase_units: [
									{
										description: `You are enrolling this course`,
										amount: {
											value: price,
										},
									},
								],
							});
						}}
						onApprove={async (data, actions) => {
							const order = await actions.order.capture();
							handleApprove();
						}}
						onCancel={() => {
							toast.error("You canceled enrolling to this course.");
						}}
						onError={() => {
							toast.error("Having some trouble please try again.");
						}}
					/>
				</PayPalScriptProvider>
			</div>
		</div>
	);
};

export default Pay;
