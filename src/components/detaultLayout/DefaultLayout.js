import React, { useContext } from "react";
import "./style.scss";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const DefaultLayout = ({ children, type }) => {
  const navigate = useNavigate();
  const { store } = useContext(UserContext);
  return (
    <div>
      <div className="header_wrap">
        <Header />
      </div>
      <div className="home">
        <div className="home_navbar">
          {(store?.rule === "ROLE_COURSE_EXPERT" ||
            store?.rule === "ROLE_USER") && (
            <div
              onClick={() => {
                navigate("/me/new-post");
              }}
              style={{ backgroundColor: "#9AD0F5" }}
              className="home_navbar_plus"
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          )}
          <Link className="home_navbar_items" to="/">
            <div className={type === "Home" ? "active" : ""}>
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </div>
          </Link>
          <Link className="home_navbar_items" to="/courses/tim-kiem">
            <div className={type === "Learning" ? "active" : ""}>
              <i className="fa-solid fa-lightbulb"></i>
              <span>Search</span>
            </div>
          </Link>
          <Link className="home_navbar_items" to="/blog">
            <div className={type === "Blog" ? "active" : ""}>
              <i className="fa-solid fa-calculator"></i>
              <span>Blog</span>
            </div>
          </Link>
        </div>
        {children}
      </div>
      <div className="footer_wrap">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
