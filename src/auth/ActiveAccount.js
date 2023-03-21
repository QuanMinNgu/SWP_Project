import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import "./style.scss";
const ActiveAccount = () => {
	const { slug } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let here = true;
		dispatch(isLoading());
		axios
			.post(
				"/api/auth/active",
				{
					token: slug,
				},
				{
					headers: {
						token: slug,
					},
				}
			)
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				toast.success(res?.data?.msg);
				dispatch(isSuccess());
				navigate("/login");
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});

		return () => {
			here = false;
		};
	}, [slug]);

	return <div></div>;
};

export default ActiveAccount;
