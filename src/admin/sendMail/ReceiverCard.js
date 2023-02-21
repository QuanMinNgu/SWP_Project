import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const ReceiverCard = ({ checkall, item, setReceivers, receivers }) => {
	const checkRef = useRef();
	useEffect(() => {
		if (checkall) {
			checkRef.current.checked = true;
		} else {
			checkRef.current.checked = false;
		}
	}, [checkall]);

	useEffect(() => {
		const some = receivers?.some(
			(infor) => infor?.accountID?.toString() === item?.accountID?.toString()
		);
		if (some) {
			checkRef.current.checked = true;
		} else {
			checkRef.current.checked = false;
		}
	}, [receivers]);

	const handleChangeCheckAll = (e) => {
		console.log(e.target.checked);
		if (e.target.checked) {
			const arr = receivers;
			arr.push(item);
			setReceivers([...arr]);
		} else {
			const arr = receivers.filter(
				(infor) => infor?.accountID?.toString() !== item?.accountID?.toString()
			);
			setReceivers([...arr]);
		}
	};
	return (
		<tr className="r_row">
			<th className="r_h_users">
				<div className="ex_thead_user">
					<div className="ex_thead_user_img">
						<img src={item?.image} alt="Ảnh" />
					</div>
					<div className="ex_thead_user_infor">
						<div className="ex_thead_user_infor_name">{item?.name}</div>
						<i className="ex_thead_user_infor_email">{item?.gmail}</i>
						<i className="ex_thead_user_infor_id">ID:{item?.accountID}</i>
					</div>
				</div>
			</th>
			<th className="r_h_checkbox">
				<input
					onChange={(e) => handleChangeCheckAll(e)}
					ref={checkRef}
					type="checkbox"
				/>
			</th>
		</tr>
	);
};

export default ReceiverCard;
