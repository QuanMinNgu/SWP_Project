import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { UserContext } from "../App";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import ProfileCard from "./ProfileCard";
import "./style.scss";
const Profile = () => {
  const [backGround, setBackground] = useState(
    "https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
  );
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const { cache } = useContext(UserContext);
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [account, setAccount] = useState({});
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!auth?.user?.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let here = true;
    const url = `/api/account/user_course?id=${slug}`;
    if (cache.current[url]) {
      return setList(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setList(res?.data);
        cache.current[url] = res?.data;
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  useEffect(() => {
    let here = true;
    const url = `/api/account/profile?id=${slug}`;
    if (cache.current[url]) {
      return setAccount(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setAccount(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
        console.log(res?.data);
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
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
          <img src={account?.image} />
          <div>
            <h2>{account?.accountName}</h2>
          </div>
        </div>
      </div>
      <div className="profile_container">
        <div className="profile_container_courses_done">
          <div className="profile_container_courses_title">
            <h3>Các khóa học đã hoàn thành</h3>
          </div>
          <div className="profile_container_courses_card">
            {list?.completed?.map((item, index) => {
              return (
                <ProfileCard
                  item={item}
                  index={index}
                  key={index + "profile"}
                />
              );
            })}
          </div>
        </div>
        <div className="profile_container_courses_done">
          <div className="profile_container_courses_title">
            <h3>Các khóa học đang học</h3>
          </div>
          <div className="profile_container_courses_card">
            {list?.onProcess?.map((item, index) => {
              return (
                <ProfileCard
                  item={item}
                  index={index}
                  key={index + "profile"}
                />
              );
            })}
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
