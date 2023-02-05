import React from "react";
import "../style.scss";
import BLogAdminCard from "./BlogAdminCard";
import "./main.scss";

const BlogManager = () => {
  return (
    <div className="blog_manager">
      <div className="blog_manager_container">
        <div className="admin_blog_right">
          <div className="admin_blog_right_header">
            <div className="admin_blog_right_header_content">
              <div className="admin_blog_right_header_title">
                <h2>Hello Dinh Hoan!</h2>
              </div>
              <div className="admin_blog_right_header_text">
                <p>
                  That is all of blog of application. Have a nice day my admin,
                  nice to meet you
                </p>
              </div>
              <div className="admin_blog_right_header_input">
                <input type="text" placeholder="Tìm kiếm blog" />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <div className="admin_blog_right_header_img">
              <img src="https://i.pinimg.com/564x/39/a3/b3/39a3b3a4b92614132481909a9adc9171.jpg" />
            </div>
          </div>
          <div className="admin_blog_right_body">
            <div className="admin_blog_right_body_warper">
              <div className="blog_body_header">
                <h2>Top Blog</h2>
              </div>
              <div className="blog_body_content">
                <BLogAdminCard />
                <BLogAdminCard />
                <BLogAdminCard />
                <BLogAdminCard />
              </div>
            </div>
          </div>
        </div>
        <div className="admin_blog_left">
          <div className="admin_blog_left_box">
            <i class="fa-solid fa-blog"></i>
            <div className="admin_blog_left_box_content">
              <h2>1000</h2>
              <span>Total Blog</span>
            </div>
          </div>
          <div
            className="admin_blog_left_box"
            style={{
              background: "#f8b2d4",
            }}
          >
            <i class="fa-solid fa-heart"></i>

            <div className="admin_blog_left_box_content">
              <h2>1000</h2>
              <span>Total Love</span>
            </div>
          </div>
          <div
            className="admin_blog_left_box"
            style={{
              background: "#10c4d8",
            }}
          >
            <i class="fa-solid fa-user"></i>

            <div className="admin_blog_left_box_content">
              <h2>1000</h2>
              <span>Total Bloger</span>
            </div>
          </div>
          <div className="admin_blog_left_type">
            <div className="admin_blog_left_type_title">
              <h2>Type of Blogs</h2>
            </div>
            <div className="admin_blog_left_type_box">
              <div>Software Ennginer</div>
              <div>Social Learning</div>
              <div>Hacker</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
