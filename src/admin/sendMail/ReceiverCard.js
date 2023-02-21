import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const ReceiverCard = ({ checkall }) => {
	const checkRef = useRef();
	useEffect(() => {
		if (checkall) {
			checkRef.current.checked = true;
		} else {
			checkRef.current.checked = false;
		}
	}, [checkall]);
	return (
		<tr className="r_row">
			<th className="r_h_users">
				<div className="ex_thead_user">
					<div className="ex_thead_user_img">
						<img
							src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
							alt="Ảnh"
						/>
					</div>
					<div className="ex_thead_user_infor">
						<div className="ex_thead_user_infor_name">Minh Quang</div>
						<i className="ex_thead_user_infor_email">
							quangminhnguyen@gmail.com
						</i>
						<i className="ex_thead_user_infor_id">ID:123123</i>
					</div>
				</div>
			</th>
			<th className="r_h_checkbox">
				<input ref={checkRef} type="checkbox" />
			</th>
		</tr>
	);
};

export default ReceiverCard;
