import React from "react";

const AlreadyForm = () => {
	return (
		<div className="already_form">
			<table className="already_form_table">
				<thead>
					<tr>
						<th className="already_form_id">ID</th>
						<th className="already_form_name">Name</th>
						<th className="already_form_send"></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th className="already_form_id_items">1</th>
						<th className="already_form_name_items">
							Send mail for temporary showdown server
						</th>
						<th className="already_form_send_items">
							<button className="button">Send</button>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default AlreadyForm;
