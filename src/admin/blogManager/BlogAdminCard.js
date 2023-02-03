import "./main.scss";

const BLogAdminCard = () => {
  return (
    <div className="admin_blog_card">
      <div className="admin_blog_card_infor">
        <div className="admin_blog_card_infor_id">01</div>
        <div className="admin_blog_card_infor_img">
          <img src="https://i.pinimg.com/564x/a2/25/6c/a2256cf96d88de8d786e13ae36928eb0.jpg" />
        </div>
        <div className="admin_blog_card_infor_content">
          <h2>
            Shattering the myth of Rosa Parks reveals the civil rights
            movement’s true history
          </h2>
        </div>
      </div>
      <div className="admin_blog_card_love">
        <div className="admin_blog_card_love_detail">
          <i class="fa-solid fa-heart"></i>
          <span>1000</span>
        </div>
        <div className="admin_blog_card_love_option">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </div>
  );
};

export default BLogAdminCard;
