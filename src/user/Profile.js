import { useEffect, useRef } from "react";
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import "./style.scss";
const Profile = () => {
  const [backGround, setBackground] = useState(
    "https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
  );
  const inputRef = useRef();
  const [openNav, setOpenNav] = useState(false);
  const handleOpen = () => {
    setOpenNav(!openNav);
  };
  const handleClickOpen = () => {
    inputRef.current.click();
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    setBackground(URL.createObjectURL(file));
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(backGround);
    };
  }, [backGround]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="profile">
      <div
        className="profile_header"
        style={{
          backgroundImage: `url(${backGround})`,
        }}
      >
        <div className="profile_header_user">
          <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
          <div>
            <h2>Dinh Hoan</h2>
          </div>
        </div>
        <div className="profile_header_fix" onClick={handleOpen}>
          <div className="profile_header_fix_icon">
            <i className="fa-solid fa-camera"></i>
          </div>
          <div className="profile_header_fix_text">
            <h3>Chỉnh sửa ảnh bìa</h3>
          </div>
        </div>
        {openNav && (
          <div className="profile_header_change" onClick={handleClickOpen}>
            <i className="fa-solid fa-upload"></i>
            <h3>Tải ảnh lên</h3>
            <input
              ref={inputRef}
              type="file"
              style={{
                display: "none",
              }}
              onChange={handleImg}
            />
          </div>
        )}
      </div>
      <div className="profile_container">
        <div className="profile_container_courses_done">
          <div className="profile_container_courses_title">
            <h3>Các khóa học đã hoàn thành</h3>
          </div>
          <div className="profile_container_courses_card">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
        <div className="profile_container_courses_done">
          <div className="profile_container_courses_title">
            <h3>Các khóa học đang học</h3>
          </div>
          <div className="profile_container_courses_card">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
