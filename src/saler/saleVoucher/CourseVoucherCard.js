import React from "react";

function CourseVoucherCard() {
  return (
    <div className="voucher_card">
      <div className="voucher_card_img">
        <img src="https://i.pinimg.com/564x/69/43/3a/69433a2d448baf4e2b4095e5b184e9eb.jpg" />
      </div>
      <div className="voucher_card_body">
        <div className="voucher_card_body_top">
          <h3>Khóa học của Đình Hoàn</h3>
        </div>
        <div className="voucher_card_body_bottom">
          <p>
            Chào mừng đến với khóa học của đình hoàn có rất nhiều bài học phong
            phú
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseVoucherCard;
