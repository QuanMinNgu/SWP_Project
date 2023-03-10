import React from "react";

function CourseVoucherCard({
  item,
  index,
  setChoose,
  setChooseCourse,
  chooseCourse,
}) {
  const handleChoose = () => {
    setChoose(false);
    setChooseCourse([
      {
        courseName: item?.courseName,
        courseID: item?.courseID,
        image: item?.image,
        price: item?.price,
      },
    ]);
  };
  return (
    <div className="voucher_card" key={index} onClick={handleChoose}>
      <div className="voucher_card_img">
        <img src={item?.image} />
      </div>
      <div className="voucher_card_body">
        <div className="voucher_card_body_top">
          <h3>{item?.courseName}</h3>
        </div>
        <div className="voucher_card_body_bottom">
          <p>Value : ${item?.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseVoucherCard;
