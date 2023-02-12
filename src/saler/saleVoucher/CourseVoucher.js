import React, { useState } from "react";
import CourseVoucherCard from "./CourseVoucherCard";

function CourseVoucher({ chooseCourse, setChooseCourse }) {
  const [choose, setChoose] = useState(false);
  return (
    <div className="course_voucher">
      <label>Course:</label>
      <div className="course_voucher_img">
        <img src="https://i.pinimg.com/564x/2f/43/f0/2f43f073029d048aabf31c314ddb3037.jpg" />
      </div>
      <div className="course_voucher_choose">
        <button className="button" onClick={() => setChoose(true)}>
          Choose
        </button>
      </div>
      {choose && (
        <div className="course_modal">
          <div className="course_modal_warper">
            <div className="modal_header">
              <h3>Course</h3>
              <i class="fa-solid fa-xmark" onClick={() => setChoose(false)}></i>
            </div>
            <div className="modal_body">
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
              <CourseVoucherCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseVoucher;
