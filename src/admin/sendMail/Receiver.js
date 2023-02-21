import React, { useState } from "react";
import ReceiverCard from "./ReceiverCard";

const Receiver = ({ setReceive, receivers, setReceivers }) => {
	const [checkall, setCheckAll] = useState(false);
	return (
		<div className="receiver">
			<div className="receiver_close_icons">
				<div
					onClick={() => {
						setReceive(false);
					}}
					className="receiver_close_icons_wrap"
				>
					&times;
				</div>
			</div>
			<div className="receiver_searching">
				<input type="text" placeholder="Enter id, email or name..." />
				<button className="button">Search</button>
			</div>
			<div className="receiver_searching_items">
				<table className="r_table">
					<thead>
						<tr className="r_row">
							<th className="r_h">Users</th>
							<th className="r_h">
								<input
									onChange={(e) => {
										if (e.target.checked) {
											setCheckAll(true);
										} else {
											setCheckAll(false);
										}
									}}
									id="checkall_receiver"
									type="checkbox"
									name="receiver"
								/>
								<label htmlFor="checkall_receiver">All</label>
							</th>
						</tr>
					</thead>
					<tbody>
						<ReceiverCard checkall={checkall} />
						<ReceiverCard checkall={checkall} />
						<ReceiverCard checkall={checkall} />
						<ReceiverCard checkall={checkall} />
						<ReceiverCard checkall={checkall} />
						<ReceiverCard checkall={checkall} />
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Receiver;
