import UserBlogCard from "./UserBlogCard";
import "./style.scss";
const UserBlog = () => {
  return (
    <div className="user_blog">
      <div className="user_blog_container">
        <div className="user_blog_container_header">
          <h1>Bài viết của tôi</h1>
        </div>
        <div className="user_blog_container_body">
          <div className="user_blog_container_body_nav">
            <h3>Đã xuất bản</h3>
          </div>
          <div className="user_blog_container_body_content">
            <UserBlogCard />
            <UserBlogCard />
            <UserBlogCard />
            <UserBlogCard />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBlog;
