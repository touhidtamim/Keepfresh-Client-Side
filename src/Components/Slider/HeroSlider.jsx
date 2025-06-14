import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";
import SlideFour from "./SlideFour";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel={{
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.5,
      }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet !bg-gray-400",
        bulletActiveClass: "!bg-sky-600",
      }}
      modules={[Mousewheel, Pagination]}
      className="h-screen w-full"
    >
      <SwiperSlide>
        <SlideOne />
      </SwiperSlide>

      <SwiperSlide>
        <SlideTwo />
      </SwiperSlide>

      <SwiperSlide>
        <SlideThree />
      </SwiperSlide>

      <SwiperSlide>
        <SlideFour />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
