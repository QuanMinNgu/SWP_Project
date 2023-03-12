import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProfileCard from "../user/ProfileCard";
import "./style.scss";
const UserProfile = () => {
  const [backGround, setBackground] = useState(
    "https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
  );
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const auth = useSelector((state) => state?.auth);

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
          <img src={auth?.user?.image} />
          <div>
            <h2>{auth?.user?.name}</h2>
          </div>
        </div>
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
export default UserProfile;
