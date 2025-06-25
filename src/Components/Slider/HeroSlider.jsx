import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";
import SlideFour from "./SlideFour";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [countdown, setCountdown] = useState(4);
  const swiperRef = useRef(null);

  useEffect(() => {
    const updateDeviceType = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  // Countdown for small devices
  useEffect(() => {
    if (isDesktop) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          swiperRef.current?.swiper?.slideNext();
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isDesktop]);

  const handlePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
    setCountdown(4);
  };

  const handleNext = () => {
    swiperRef.current?.swiper?.slideNext();
    setCountdown(4);
  };

  return (
    <div className="relative lg:h-screen w-full">
      <Swiper
        ref={swiperRef}
        direction={isDesktop ? "vertical" : "horizontal"}
        slidesPerView={1}
        spaceBetween={0}
        loop={!isDesktop}
        autoplay={
          !isDesktop
            ? {
                delay: 4000,
                disableOnInteraction: false,
              }
            : false
        }
        mousewheel={
          isDesktop
            ? {
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 0.5,
              }
            : false
        }
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-gray-400",
          bulletActiveClass: "!bg-sky-600",
        }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="h-full w-full"
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

      {/* Arrows for small devices */}
      {!isDesktop && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Countdown timer for small devices */}
      {!isDesktop && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Next slide in {countdown}s
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
