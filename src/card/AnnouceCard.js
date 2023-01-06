import React from "react";
import "./style.scss";
const AnnouceCard = () => {
    return (
        <div className="annouce_card">
            <div className="annouce_card_img">
                <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20211001/pngtree-background-xanh-%C4%91%E1%BA%B9p-image_908804.png"
                    alt="annouce"
                />
            </div>
            <div className="annouce_card_detail">
                <div className="annouce_card_detail_content">
                    Chào mừng bạn đã gia nhập F8. Hãy luôn theo đuổi đam mê,
                    kiên trì và theo đuổi mục tiêu tới cùng bạn nhé
                </div>
                <div className="annouce_card_detail_notification">
                    12 giờ trước
                </div>
            </div>
        </div>
    );
};

export default AnnouceCard;
