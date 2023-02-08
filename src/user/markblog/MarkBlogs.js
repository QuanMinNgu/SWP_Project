import "../userblog/style.scss";
import UserBlogCard from "../userblog/UserBlogCard";
import MarkBlogCard from "./MarkBlogCard";
const MarkBlog = () => {
  return (
    <div className="user_blog">
      <div className="user_blog_header">
        <h1>Bài viết yêu thích</h1>
        <p>Nơi lưu trữ blog của bạn</p>
      </div>
      <div className="user_blog_body">
        <MarkBlogCard />
        <MarkBlogCard />
        <MarkBlogCard />
        <MarkBlogCard />
        <MarkBlogCard />
        <MarkBlogCard />
      </div>
    </div>
  );
};
export default MarkBlog;
