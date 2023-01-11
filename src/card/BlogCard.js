import React, { useState } from "react";
import "./style.scss";
import "./main.scss";
import { AiOutlineEllipsis, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { DiAptana } from "react-icons/di";
const BlogCard = () => {
  const [openNav, setOpenNav] = useState(false);
  const [react, setReact] = useState(false);
  const handleClickOpen = () => {
    setOpenNav(!openNav);
  };
  const handleReact = () => {
    setReact(!react);
  };
  return (
    <div className="blogCard">
      <div className="blogCard_header">
        <div className="blogCard_header_left">
          <img
            src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png"
            className="blogCard_header_img"
          />
          <h3 className="blogCard_header_name">Nguyen Dinh Hoan</h3>
        </div>
        <div className="blogCard_header_right">
          <button onClick={handleReact}>
            {react === false ? (
              <i className="fa-regular fa-heart"></i>
            ) : (
              <i className="fa-solid fa-heart"></i>
            )}
          </button>
          <i
            className="fa-solid fa-ellipsis blogCard_header_right_icon"
            onClick={handleClickOpen}
          ></i>
        </div>
        {openNav && (
          <div className="blogCard_header_option">
            <ul className="option_list">
              <li className="option_list_item">
                <DiAptana></DiAptana> <span>Fix them</span>
              </li>
              <li className="option_list_item">
                <DiAptana></DiAptana> <span>Fix them</span>
              </li>
              <li className="option_list_item">
                <DiAptana></DiAptana> <span>Fix them</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="blogCard_body">
        <div className="blogCard_info">
          <div className="blogCard_info_title">
            <h2>
              Bỏ túi 21 lệnh Git cơ bản + Cách nhớ, giúp newDev làm chủ Git quản
              lý tốt mã nguồn!
            </h2>
          </div>
          <div className="blogCard_info_content">
            <p>
              Chắc hẳn nhiều bạn sau khi đã thành công tạo một website từ những
              kiến thức học được từ khóa học lập trình tại F8 và cảm thấy đó...
            </p>
          </div>
          <div className="blogCard_info_footer">
            <span>18 ngày trước</span>
            <span>14 phút trước</span>
          </div>
        </div>
        <div className="blogCard_body_left">
          <img src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
