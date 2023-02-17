import React from "react";
import "./style.scss";
import usePaginating from "./usePaginating";
const Pagination = ({ limit, count }) => {
	const { page, numPage, firstArr, lastArr, activePage, jump, nex, prev } =
		usePaginating({ limit: limit, count: count });

	return (
		<div className="pagination">
			<div
				onClick={() => {
					prev();
				}}
				className="pagination_items icons"
			>
				<i className="fa-solid fa-chevron-left"></i>
			</div>
			{firstArr?.map((item) => (
				<div
					onClick={() => {
						jump(item);
					}}
					key={item + "pagination"}
					className={`pagination_items ${activePage(item)}`}
				>
					{item}
				</div>
			))}
			{lastArr.length > 0 && <div className="pagination_items">...</div>}
			{lastArr?.map((item) => (
				<div key={item + "lastArray"} className="pagination_items">
					{item}
				</div>
			))}
			<div
				onClick={() => {
					nex();
				}}
				className="pagination_items icons"
			>
				<i className="fa-solid fa-chevron-right"></i>
			</div>
		</div>
	);
};

export default Pagination;
