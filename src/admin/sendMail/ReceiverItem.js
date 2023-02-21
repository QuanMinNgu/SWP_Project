import React from "react";

const ReceiverItem = ({ setReceive, item, setReceivers, receivers }) => {
	const handleRemoveUserFromList = () => {
		const arr = receivers.filter(
			(infor) => infor?.accountID?.toString() !== item?.accountID?.toString()
		);
		setReceivers([...arr]);
	};
	return (
		<div className="receiverItems">
			<div
				onClick={() => {
					setReceive(true);
				}}
				className="receiverItems_Name"
			>
				{item?.name}
			</div>
			<div onClick={handleRemoveUserFromList} className="receiverItem_delete">
				&times;
			</div>
		</div>
	);
};

export default ReceiverItem;
