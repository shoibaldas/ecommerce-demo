import React from "react";
import Hero from "../../components/Hero/Hero";
import Feature from "../../components/Feature/Feature";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero
        heading="Shop Now and Discover the Perfect Products for Every Occasion!"
        message="Your one-stop destination for all your shopping needs. Explore our vast collection of high-quality products, ranging from fashion and accessories to home decor and electronics."
      ></Hero>
      <Feature></Feature>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
