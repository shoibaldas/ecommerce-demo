import React from "react";
import img1 from "../../assets/image/fashoin3.jpg";
import img2 from "../../assets/image/fashon1.jpg";
import img3 from "../../assets/image/fashion2.jpg";
import { Link } from "react-router-dom";

const Hero = ({ heading, message }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 md:mt-0 text-white z-[2] max-w-2xl">
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
      <div
        data-aos="fade-up-left"
        data-aos-duration="1000"
        data-aos-mirror="true"
        className="hidden md:flex items-center justify-center -mx-4 -mt-20 lg:pl-6 z-[2]"
      >
        <div className="flex flex-col items-end">
          <img
            className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
            src={img1}
            alt=""
          />
          <img
            className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
            src={img2}
            alt=""
          />
        </div>
        <div className="px-3">
          <img
            className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
            src={img3}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
