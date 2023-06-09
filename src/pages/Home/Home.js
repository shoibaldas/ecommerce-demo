import React from "react";
import Hero from "../../components/Hero/Hero";
import Feature from "../../components/Feature/Feature";
import Testimonial from "../../components/Testimonial/Testimonial";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import ReachUs from "../../components/ReachUs/ReachUs";
import FeatureProducts from "../../components/FeatureProducts/FeatureProducts";
import ScrollToTop from "../../hooks/ScrollToTop/ScrollToTop";

const Home = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Hero
        heading="Shop Now and Discover the Perfect Products for Every Occasion!"
        message="Your one-stop destination for all your shopping needs. Explore our vast collection of high-quality products, ranging from fashion and accessories to home decor and electronics."
      ></Hero>
      <FeatureProducts></FeatureProducts>
      <Feature></Feature>
      <Testimonial></Testimonial>
      <NewsLetter></NewsLetter>
      <ReachUs></ReachUs>
    </div>
  );
};

export default Home;
