import { useNavigate } from "react-router-dom";
import "./style.scss";

const ProfileCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="course_card"
      onClick={() => navigate(`/course/${item?.courseID}`)}
    >
      <div className="course_card_img">
        <img src={item?.image} />
      </div>
      <div className="course_card_info">
        <h3>{item?.courseName}</h3>
        <p>{item?.description}</p>
      </div>
    </div>
  );
};
export default ProfileCard;
