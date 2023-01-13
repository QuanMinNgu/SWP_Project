import React from "react";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_warper">
        <div className="footer_info">
          <div className="footer_info_header">
            <img
              className="footer_info_header_img"
              src="https://res.cloudinary.com/sttruyen/image/upload/v1673249807/another/b6sudrpaizo80snhsq9m.png"
            />
            <h2>Learn Online</h2>
          </div>
          <div className="footer_info_body">
            <p>Phone number: 0357753844</p>
            <p>Email: dinhhoan0511@gmail.com</p>
            <p>Address: DH FPT</p>
          </div>
        </div>
        <div className="footer_company">
          <div className="footer_company_header">
            <h2>Helps</h2>
          </div>
          <div className="footer_company_body">
            <p>Contact</p>
            <p>Security</p>
          </div>
        </div>
        <div className="footer_company">
          <div className="footer_company_header">
            <h2>The Company Of F11</h2>
          </div>
          <div className="footer_company_body">
            <p>Day Established: 1-01-2023</p>
            <p>Major: Everything</p>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="footer_bottom_left">
            © 2018 - 2023 F11. The King Of Web Learning
          </div>
          <div className="footer_bottom_right">
            <a href="https://www.facebook.com/profile.php?id=100015481175598">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/" className="youtube">
              <i class="fa-brands fa-youtube "></i>
            </a>
            <a>
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
