import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePaginating = ({ count }) => {
	const [page, setPage] = useState(1);
	const numPage = count;
	const [firstArr, setFirstArr] = useState([]);
	const [lastArr, setLastArr] = useState([]);

	const [updatePage, setUpdatePage] = useState(false);

	useEffect(() => {
		setPage(1);
	}, [updatePage]);

	const navigate = useNavigate();

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
	}, [page, count]);

	const { search } = useLocation();

	useEffect(() => {
		const sort = new URLSearchParams(search).get("sort") || "";
		const type = new URLSearchParams(search).get("type") || "";
		const kind = new URLSearchParams(search).get("kind") || "";
		const role = new URLSearchParams(search).get("role") || "";
		const searchingU = new URLSearchParams(search).get("search") || "";

		const sortSearch = {
			sort: sort,
			type: type,
			kind: kind,
			page: page,
			role,
			search: searchingU,
		};
		const excludedFields = ["kind", "type", "sort", "role", "search"];
		excludedFields.forEach((item) => {
			if (!sortSearch[item]) {
				delete sortSearch[item];
			}
		});
		const sortSearching = new URLSearchParams(sortSearch).toString();
		navigate("?" + sortSearching);
		window.scrollTo(0, 0);
	}, [page]);
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
		updatePage,
		setUpdatePage,
	};
};

export default usePaginating;
