import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const DashboardDetail = () => {
	const [dashboard, setDashboard] = useState({});

	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const { cache } = useContext(UserContext);

	useEffect(() => {
		let here = true;
		const url = `/api/dashboard`;
		if (cache.current[url]) {
			return setDashboard(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				if (!here) {
					return dispatch(isSuccess());
				}
				setDashboard(res?.data);
				cache.current[url] = res?.data;
				console.log(res?.data);
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
				toast.error(err?.response?.data?.msg);
			});
		return () => {
			here = false;
		};
	}, []);
	const date = 31;
	const labels = Array(date)
		.fill(1)
		.map((_, index) => index + 1);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Incoming of website in month",
			},
		},
	};
	const data = {
		labels,
		datasets: [
			{
				label: "Income $",
				data: dashboard?.incomeInMonth || [
					200, 4000, 300, 400, 2000, 100, 500, 20, 40,
				],
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};
	return (
		<div className="dashboard_main">
			<div className="dashboard_statistic">
				<div className="row">
					<div className="col c-6 m-4 l-3">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-user"></i>
							</div>
							<div className="dashboard_statistic_items_infor">
								<p>Total Account</p>
								<h6>{dashboard?.totalAccount || 0}</h6>
							</div>
						</div>
					</div>
					<div className="col c-6 m-4 l-3">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-money-bill"></i>
							</div>
							<div className="dashboard_statistic_items_infor">
								<p>Total Income</p>
								<h6>$ {dashboard?.totalIncome || 0}</h6>
							</div>
						</div>
					</div>
					<div className="col c-6 m-4 l-3">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-pager"></i>
							</div>
							<div className="dashboard_statistic_items_infor">
								<p>Total Courses</p>
								<h6>{dashboard?.totalCourse || 0}</h6>
							</div>
						</div>
					</div>
					<div className="col c-6 m-4 l-3">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-blog"></i>
							</div>
							<div className="dashboard_statistic_items_infor">
								<p>Total Blog</p>
								<h6>{dashboard?.totalBlog || 0}</h6>
							</div>
						</div>
					</div>
				</div>
				<div style={{ marginTop: "2rem" }} className="row">
					<div className="col c-6 m-4 l-4">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-dollar-sign"></i>
							</div>
							<div
								style={{ marginRight: "2.5rem" }}
								className="dashboard_statistic_items_infor"
							>
								<p>Total Salers / Marketings</p>
								<h6>{dashboard?.totalSaler || 0}</h6>
							</div>
						</div>
					</div>
					<div className="col c-6 m-4 l-4">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-users"></i>
							</div>
							<div className="dashboard_statistic_items_infor">
								<p>New Accounts in Month</p>
								<h6>{dashboard?.totalNewAccountInMonth || 0}</h6>
							</div>
						</div>
					</div>
					<div className="col c-6 m-4 l-4">
						<div className="dashboard_statistic_items">
							<div className="dashboard_statistic_items_img">
								<i className="fa-solid fa-person-chalkboard"></i>
							</div>
							<div
								style={{ marginRight: "2rem" }}
								className="dashboard_statistic_items_infor"
							>
								<p>Total Courses Expert</p>
								<h6>{dashboard?.totalCourseExpert || 0}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="dashboard_chart">
				<Bar options={options} data={data} />
			</div>
		</div>
	);
};

export default DashboardDetail;
