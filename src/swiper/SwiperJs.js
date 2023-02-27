import { Navigation, Scrollbar, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCard from "./SwiperCard";

const SwiperJs = ({ listMarketing }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, Scrollbar]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop
    >
      {listMarketing?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <SwiperCard item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperJs;
