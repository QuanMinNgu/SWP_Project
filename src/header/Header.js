import React, { useContext, useRef, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CourseHeadCard from "../card/CourseHeadCard";
import AnnouceCard from "../card/AnnouceCard";
import { useDispatch, useSelector } from "react-redux";
import HeaderMobile from "./HeaderMobile";
import { UserContext } from "../App";
import { isLogOut } from "../redux/slice/auth";
import { toast } from "react-toastify";
const Header = () => {
  const [course, setCourse] = useState(false);
  const [annouce, setAnnouce] = useState(false);
  const [account, setAccount] = useState(false);
  const searchRef = useRef();

  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { store } = useContext(UserContext);

  const handleChangeInput = (e) => {
    if (e.key === "Enter") {
      if (searchRef.current.value) {
        navigate(`/courses/tim-kiem?search=${searchRef.current.value}`);
      } else {
        navigate(`/courses/tim-kiem`);
      }
      searchRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: 200,
      }}
      className="header"
    >
      <div className="header_brand">
        <HeaderMobile />
        <Link className="header_brand_link" to="/">
          <img
            src="https://res.cloudinary.com/sttruyen/image/upload/v1678276800/another/wduj3dzkgsg5dmysll7j.jpg"
            alt="brand"
          />
        </Link>
        <span className="header_brand_title">
          <i>Unlock your potential with us</i>
        </span>
      </div>
      <div className="header_search">
        <div className="header_search_container">
          <div
            onClick={() =>
              handleChangeInput({
                key: "Enter",
              })
            }
            className="header_search_icons"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            onKeyDown={(e) => handleChangeInput(e)}
            type="text"
            ref={searchRef}
            placeholder="find courses..."
          />
        </div>
      </div>
      {auth.user?.token ? (
        <div className="header_navbar">
          {/* <div className="header_navbar_items">
						<span className="header_navbar_items_title">
							<button
								onClick={() => {
									setCourse(!course);
									setAnnouce(false);
									setAccount(false);
								}}
							>
								My courses
							</button>
							{course && (
								<div className="header_navbar_items_course">
									<div className="header_navbar_items_course_title">
										<h6>My courses</h6>
									</div>
									<div className="header_navbar_items_course_card">
										<CourseHeadCard />
									</div>
								</div>
							)}
						</span>
					</div> */}
          <div className="header_navbar_items">
            <div
              onClick={() => {
                setAccount(!account);
                setAnnouce(false);
                setCourse(false);
              }}
              className="header_navbar_items_img_wrap"
            >
              <div className="user_infor_head">
                <img
                  className="header_navbar_items_img"
                  src={auth.user?.image}
                  alt="Ảnh"
                />
                <div className="user_infor_head_name">
                  <div className="user_infor_head_name_clearly">
                    {auth.user?.name}
                  </div>
                  <div className="user_infor_head_icons">
                    {!account ? (
                      <i className="fa-solid fa-sort-down"></i>
                    ) : (
                      <i className="fa-solid fa-sort-up icons_change"></i>
                    )}
                  </div>
                </div>
              </div>
              {account && (
                <div className="header_navbar_account">
                  <div className="header_navbar_account_infor">
                    <div className="header_navbar_account_infor_img">
                      <img src={auth.user?.image} alt="Ảnh bìa" />
                    </div>
                    <div className="header_navbar_account_infor_name">
                      <div>{auth.user?.name}</div>
                      <div>
                        <i>ID:{auth.user?.id}</i>
                      </div>
                    </div>
                  </div>
                  {store?.rule === "ROLE_ADMIN" && (
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/admin/dashboard"
                    >
                      <div
                        onClick={() => {
                          setAccount(false);
                        }}
                        className="header_navbar_account_items"
                      >
                        Dashboard
                      </div>
                    </Link>
                  )}
                  {store?.rule === "ROLE_SALE" && (
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/sale/vocher_manager"
                    >
                      <div
                        onClick={() => {
                          setAccount(false);
                        }}
                        className="header_navbar_account_items"
                      >
                        Dashboard
                      </div>
                    </Link>
                  )}
                  {store?.rule === "ROLE_COURSE_EXPERT" && (
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/course_expert/dashboard"
                    >
                      <div
                        onClick={() => {
                          setAccount(false);
                        }}
                        className="header_navbar_account_items"
                      >
                        Dashboard
                      </div>
                    </Link>
                  )}
                  {store?.rule !== "ROLE_ADMIN" &&
                    store?.rule !== "ROLE_COURSE_EXPERT" &&
                    store?.rule !== "ROLE_SALE" && (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/profile/${auth?.user?.id}`}
                      >
                        <div
                          onClick={() => {
                            setAccount(false);
                          }}
                          className="header_navbar_account_items"
                        >
                          Profile
                        </div>
                      </Link>
                    )}
                  {store?.rule !== "ROLE_ADMIN" &&
                    store?.rule !== "ROLE_SALE" && (
                      <div className="header_navbar_account_items">
                        <Link style={{ textDecoration: "none" }} to="/me/blog">
                          <div
                            onClick={() => {
                              setAccount(false);
                            }}
                            className="header_navbar_account_items_link no_bottom"
                          >
                            My Blogs
                          </div>
                        </Link>
                      </div>
                    )}
                  {store?.rule !== "ROLE_ADMIN" &&
                    store?.rule !== "ROLE_SALE" && (
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/me/markblog"
                      >
                        <div
                          onClick={() => {
                            setAccount(false);
                          }}
                          className="header_navbar_account_items"
                        >
                          Favorite Blogs
                        </div>
                      </Link>
                    )}

                  <div className="header_navbar_account_items">
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/settings/personal"
                    >
                      <div
                        onClick={() => {
                          setAccount(false);
                        }}
                        className="header_navbar_account_items_link"
                      >
                        Settings
                      </div>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/">
                      <div
                        onClick={() => {
                          toast.success("Log out successfully.");
                          dispatch(isLogOut());
                        }}
                        className="header_navbar_account_items_link no_bottom"
                      >
                        Log Out
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="header_navbar">
          <Link
            style={{ textDecoration: "none" }}
            to={{ pathname: "/login", state: { prevPath: location.pathname } }}
          >
            <div className="header_navbar_button">Login</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
