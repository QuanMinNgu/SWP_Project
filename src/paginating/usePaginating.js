import React, { useEffect, useState } from "react";

const usePaginating = ({ limit, count }) => {
	const [page, setPage] = useState(1);
	const li = limit || 1;
	const cou = count || 1;
	const numPage = Math.ceil(cou / li);
	const [firstArr, setFirstArr] = useState([]);
	const [lastArr, setLastArr] = useState([]);

	useEffect(() => {
		const newArr = [...Array(numPage)].map((item, index) => index + 1);
		if (numPage >= 4) {
			if (page + 2 <= numPage - 1) {
				const arr = newArr.slice(page - 1, page + 2);
				setFirstArr(arr);
				const las = newArr.slice(numPage - 1);
				setLastArr(las);
			} else {
				const arr = newArr.slice(numPage - 4);
				setFirstArr(arr);
				setLastArr([]);
			}
		} else {
			setFirstArr(newArr);
			setLastArr([]);
		}
	}, [page, count, limit]);
	const prev = () => {
		setPage(Math.max(page - 1, 1));
	};

	const nex = () => {
		setPage(Math.min(page + 1, numPage));
	};

	const jump = (e) => {
		setPage(e);
	};
	const activePage = (e) => {
		return e === page ? "active" : "";
	};
	return {
		page,
		setPage,
		numPage,
		firstArr,
		lastArr,
		activePage,
		jump,
		nex,
		prev,
	};
};

export default usePaginating;
