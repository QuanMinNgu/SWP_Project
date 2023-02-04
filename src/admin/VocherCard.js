import React from "react";

const VocherCard = () => {
    return (
        <tr className="s_drow">
            <th className="s_dcourse">Course detail</th>
            <th className="s_dsale">$120</th>
            <th className="s_dto">
                <div className="s_dto_div">Xem tất cả</div>
            </th>
            <th className="s_dfromdate">12/12/2002</th>
            <th className="s_dtodate">10/20/2002</th>
            <th className="s_dbars">
                <div className="thead_bars_icons">
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </th>
        </tr>
    );
};

export default VocherCard;
