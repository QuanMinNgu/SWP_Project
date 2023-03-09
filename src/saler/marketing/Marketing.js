import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SwiperJs from "../../swiper/SwiperJs";
import MarketingCard from "./MarketingCard";
import "./style.scss";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { UserContext } from "../../App";
const Marketing = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [listMarketing, setListMarketing] = useState([]);
  const [image, setImage] = useState("");
  const imageRef = useRef();
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (image) {
      URL.revokeObjectURL(image);
    }
    imageRef.current = acceptedFiles[0];
    setImage(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleCreateMarketingImage = async () => {
    const formData = new FormData();
    let urlImage = "";
    formData.append("file", imageRef.current);
    formData.append("upload_preset", "sttruyenxyz");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/sttruyen/image/upload",
        formData
      );
      urlImage = "https:" + res.data.url.split(":")[1];
    } catch (err) {
      return;
    }
    dispatch(isLoading());
    try {
      const data = await axios.post(
        "/api/marketing/create",
        {
          link: urlImage,
        },
        {
          headers: {
            token: auth.user?.token,
          },
        }
      );
      console.log(urlImage);
      setUpdate(!update);
      setImage("");
      imageRef.current = {};
      toast.success(data?.data?.msg);
      dispatch(isSuccess());
    } catch (err) {
      dispatch(isFailing());
      return toast.error(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      handleCreateMarketingImage();
    }
  }, [image]);

  useEffect(() => {
    let here = true;
    const url = "/api/common/marketing";
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setListMarketing(res?.data?.marketingImage);
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
        return toast.error(err?.response?.data?.msg);
      });
    return () => {
      here = false;
    };
  }, [update]);
  return (
    <div className="marketing">
      <div className="marketing_swiper">
        <SwiperJs listMarketing={listMarketing} />
      </div>
      <div className="marketing_card">
        <div className="marketing_card_create">
          <div className="movie_drop_zone">
            <div className="movie_drop_zone_wrap" {...getRootProps()}>
              <input {...getInputProps()} />
              <i className="fa-regular fa-image"></i>
              <div className="image_create_container_img">
                <img src={image} />
              </div>
            </div>
          </div>
        </div>
        {listMarketing?.map((item, index) => {
          return (
            <MarketingCard
              item={item}
              index={index}
              setListMarketing={setListMarketing}
              update={update}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Marketing;
