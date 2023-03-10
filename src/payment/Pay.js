import React from "react";
import "./style.scss";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, isSuccess, isFailing } from "../redux/slice/auth";
import axios from "axios";
const Pay = ({ setPayment, setCanLearn, price, vocher }) => {
	const initialOptions = {
		"client-id":
			"AQVdNJ2adELwM1B1LTHKG8rcc-MKrGUU9g4SLcy3SYuAyYukSyCU7BFEZz7ix0nIaFksX0AeZrWkR8-h",
		currency: "USD",
		intent: "capture",
	};

	const handleApprove = () => {
		setCanLearn(true);
		setPayment(false);
		enrollCourseSuccess();
	};

	const { slug } = useParams();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const enrollCourseSuccess = async () => {
		dispatch(isLoading());
		try {
			const data = await axios.post(
				"/api/course/enroll",
				{
					courseID: slug,
					price: vocher?.amount ? price - vocher?.amount * 1 : price,
					createdDate: new Date(),
					voucherID: vocher?.voucherID ? vocher?.voucherID : null,
				},
				{
					headers: {
						token: auth.user?.token,
					},
				}
			);
			dispatch(isSuccess());
			toast.success(data?.data?.msg);
			setCanLearn(true);
		} catch (err) {
			dispatch(isFailing());
			toast.error(err?.response?.data?.msg);
		}
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
											value: vocher?.amount
												? price - vocher?.amount * 1
												: price,
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
