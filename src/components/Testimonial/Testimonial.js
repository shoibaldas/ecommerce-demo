import React from "react";
import { FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
import { IoIosArrowDown} from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const Testimonial = () => {
  const slider1Class = 'testimonial';

  const testimonials = [
    {
      id: 1,
      quote:
        "I absolutely love the quality and style of the clothes at Luminous! Their pieces are unique and make me feel confident and fashionable.",
      author: "Emily Smith",
      title: "Fashion Blogger",
      image: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 2,
      quote:
        "I've been a loyal customer of Luxe for years now and they never disappoint! Their clothes are always on trend and the customer service is amazing.",
      author: "Sophia Chen",
      title: "Fashion Enthusiast",
      image: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 3,
      quote:
        "I can't get enough of the trendy pieces at this store! The quality is amazing and the staff is always so friendly and helpful.",
      author: "Maggie Brown",
      title: "Stylish Mom",
      image: "https://i.pravatar.cc/100?img=6",
    },
    {
      id: 4,
      quote:
        "I'm so glad I discovered Style Avenue! Their clothes are always stylish and comfortable, perfect for my busy lifestyle.",
      author: "Anna Lee",
      title: "Working Professional",
      image: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 5,
      quote:
        "The customer service at this fashion store is top-notch. They went above and beyond to make sure I found exactly what I was looking for.",
      author: "Karen Kim",
      title: "Fashion Novice",
      image: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 6,
      quote:
        "I am so impressed with the unique selection of clothing and accessories. I always leave this store feeling like I found something special.",
      author: "Jessica Brown",
      title: "Body Positivity Advocate",
      image: "https://i.pravatar.cc/100?img=9",
    },
  ];

  return (
    <section className="bg-gray-100 max-w-6xl mx-auto">
      <div className="py-20">
        <h2 className="text-3xl text-center font-bold mb-5 text-gray-800">
          Our Happy Customers
        </h2>
        <p className="text-lg text-center leading-6 text-gray-600">
        Happy Customers, Our Pride and Joy!
        </p>
        <Swiper
          autoplay={{ delay: 2500, disableOnInteractio: false }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            360: {
              slidesPerView: 1,
              
            },
            768: {
              slidesPerView: 2,
            },
            // 991: {
            //   slidesPerView: 2,
            //   spaceBetween: -100,
            // },
          }}
          className={`mySwiper ${slider1Class}`}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="mt-12 px-5 flex flex-col">
                <div className="relative bg-white text-lg text-gray-600 leading-7 rounded-md shadow-lg p-12">
                  <FaQuoteLeft className="absolute top-8 left-10 text-purple-500"></FaQuoteLeft>
                  <p className="text-center">{testimonial.quote}</p>
                  <FaQuoteRight className="absolute bottom-8 right-10 text-purple-500"></FaQuoteRight>
                  
                </div>
                <div className="relative flex justify-center items-center max-w-md mx-auto p-10">
                <IoIosArrowDown className="absolute -top-5 w-16 h-16 text-purple-300"></IoIosArrowDown>
                  <img
                    className="w-12 h-12 rounded-full mr-4 border-double border-4 border-sky-700"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div>
                    <p className="text-gray-800 font-semibold mb-1">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
