import { Navigation, Scrollbar, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCard from "./SwiperCard";

const SwiperJs = () => {
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
            <SwiperSlide>
                <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
                <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
                <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
                <SwiperCard />
            </SwiperSlide>
            <SwiperSlide>
                <SwiperCard />
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperJs;
