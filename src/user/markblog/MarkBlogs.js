import "../userblog/style.scss";
import UserBlogCard from "../userblog/UserBlogCard";
const MarkBlog = () => {
  return (
    <div className="user_blog">
      <div className="user_blog_container">
        <div className="user_blog_container_header">
          <h1>Bài viết của tôi</h1>
        </div>
        <div className="user_blog_container_body">
          <div className="user_blog_container_body_nav">
            <h3>Bài viết</h3>
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
export default MarkBlog;
