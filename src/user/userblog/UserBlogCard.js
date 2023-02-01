import "./style.scss";
const UserBlogCard = () => {
  return (
    <div className="user_blog_card">
      <div className="user_blog_card_img">
        <img src="https://i.pinimg.com/564x/26/3a/d5/263ad55f3fc6f594d8f1c91d2c396a48.jpg" />
      </div>
      <div className="user_blog_card_left">
        <div className="user_blog_card_left_header">
          <h2>Bài viết của tôi</h2>
        </div>
        <div className="user_blog_card_left_body">
          <p>
            Hi there, in this article I will guide you guys on how to use
            CKEditor v5 in React project (you can also use this in the...
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserBlogCard;
