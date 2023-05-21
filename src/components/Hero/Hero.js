import React from "react";
import img1 from "../../assets/image/fashoin3.jpg";
import img2 from "../../assets/image/fashon1.jpg";
import img3 from "../../assets/image/fashion2.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const bannerItem = [
  {
    image: img1,
    id: 1,
    prev: 3,
    next: 2,
  },
  {
    image: img2,
    id: 2,
    prev: 1,
    next: 3,
  },
  {
    image: img3,
    id: 3,
    prev: 2,
    next: 1,
  },
];

const Hero = ({ heading, message }) => {
  const slider1Class = "slide";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="w-9/12 p-5 md:mt-0 text-white z-[2] max-w-2xl">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl ">{message}</p>
        <div className="mt-8">
          <Link
            to="/products"
            className="px-8 py-3 border hover:bg-black hover:border-0 transition ease-in duration-300"
          >
            Shop Now{" "}
          </Link>
        </div>
      </div>
      <div className="hidden w-3/12 md:flex justify-center items-center z-[2]">
        <Swiper
          autoplay={{ delay: 1500, disableOnInteractio: false }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
          }}
          className={`mySwiper ${slider1Class}`}
        >
          {bannerItem.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                className="w-96 h-96 object-cover"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
