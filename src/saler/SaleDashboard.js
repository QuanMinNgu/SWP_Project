import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Marketing from "./marketing/Marketing";
import CreateVoucher from "./saleVoucher/CreateVoucher";
import SaleVoucher from "./saleVoucher/SaleVoucher";
import UpdateVoucher from "./saleVoucher/UpdateVoucher";
import { UserContext } from "../App";

import "./style.scss";
import CreateMarketing from "./marketing/CreateMarketing";
import { isLogOut } from "../redux/slice/auth";
import { toast } from "react-toastify";
const SaleDashboard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolldown, setScrolldown] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const { store } = useContext(UserContext);
  const handleLogOut = () => {
    dispatch(isLogOut());
    toast.success("Đăng xuất thành công");
    navigate("/login" );
  };
  return (
    <div className="dashboard">
      <div className="dashboard_navbar">
        <div className="dashboard_title"># DASHMIN</div>
        <div className="dashboard_account">
          <div className="dashboard_account_img">
            <img
              src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg"
              alt="Ảnh"
            />
          </div>
          <div className="dashboard_account_infor">
            <h6>{user?.name}</h6>
            <span>{store?.rule}</span>
          </div>
        </div>
        <div
          onClick={() => {
            navigate(`/sale/vocher_manager`);
          }}
          className={`dashboard_navbar_items ${
            slug === "vocher_manager" ? "active" : ""
          }`}
        >
          <div
            className={`dashboard_icons_container ${
              slug === "vocher_manager" ? "active" : ""
            }`}
          >
            <i className="fa-brands fa-adversal"></i>
          </div>{" "}
          Vocher Manager
        </div>
        <div
          onClick={() => {
            navigate(`/sale/marketing`);
          }}
          className={`dashboard_navbar_items ${
            slug === "marketing" ? "active" : ""
          }`}
        >
          <div
            className={`dashboard_icons_container ${
              slug === "marketing" ? "active" : ""
            }`}
          >
            <i className="fa-brands fa-adversal"></i>
          </div>{" "}
          Marketing
        </div>
      </div>
      <div className="dashboard_head">
        <div className="dashboard_input">
          <input type="text" placeholder="Searching" />
        </div>
        <div className="dashboard_head_account">
          <div className="dashboard_head_img">
            <img
              src="https://phunugioi.com/wp-content/uploads/2020/02/mau-background-dep.jpg"
              alt="Ảnh"
            />
          </div>
          <div
            onClick={() => {
              setScrolldown(!scrolldown);
            }}
            className="dashboard_head_name"
          >
            <span>{user?.name}</span>
            {!scrolldown ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
            {scrolldown && (
              <div className="dashboard_head_scrolldown">
                <Link className="dashboard_scrolldown_items" to="/">
                  <div className="dashboard_scrolldown_items_detail">
                    HomePage
                  </div>
                </Link>
                <Link className="dashboard_scrolldown_items" to="/me/profile">
                  <div className="dashboard_scrolldown_items_detail">
                    My Profile
                  </div>
                </Link>
                <Link
                  className="dashboard_scrolldown_items"
                  to="/settings/personal"
                >
                  <div className="dashboard_scrolldown_items_detail">
                    Setting
                  </div>
                </Link>
                <div
                  className="dashboard_scrolldown_items_detail"
                  onClick={handleLogOut}
                >
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dashboard_detail">
        {slug === "vocher_manager" && <SaleVoucher />}
        {slug === "create_voucher" && <CreateVoucher />}
        {slug === "edit_voucher" && <UpdateVoucher />}
        {slug === "marketing" && <Marketing />}
        {slug === "create_market" && <CreateMarketing />}
      </div>
    </div>
  );
};

export default SaleDashboard;
