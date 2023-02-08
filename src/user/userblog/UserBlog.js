import UserBlogCard from "./UserBlogCard";
import "./style.scss";
const UserBlog = () => {
  return (
    <div className="user_blog">
      <div className="user_blog_header">
        <h1>Bài viết của tôi</h1>
        <p>Nơi lưu trữ blog của bạn</p>
      </div>
      <div className="user_blog_body">
        <UserBlogCard />
        <UserBlogCard />
        <UserBlogCard />
        <UserBlogCard />
        <UserBlogCard />
        <UserBlogCard />
      </div>
    </div>
  );
};
export default UserBlog;
