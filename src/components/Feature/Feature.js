import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { BsPatchCheckFill } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";

const Feature = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Why Choose Us
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-8">
          We take pride in delivering an exceptional shopping experience that sets us apart from the rest.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div data-aos="fade-up" data-aos-duration="1000" className="lg:w-1/4 px-4 mb-8">
              <div className="flex items-center flex-col text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-2">
                  <FaShippingFast className="text-green-500 text-3xl" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Free Shipping
                  </h3>
                  <div className="mt-2 text-sm text-gray-600 flex items-center ml-2">
                    <div><p className="mr-1">On all orders over</p></div>
                    <TbCurrencyTaka></TbCurrencyTaka>
                    <div><p>2,000</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" className="lg:w-1/4 px-4 mb-8">
              <div className="flex items-center flex-col text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sky-100 mb-2">
                  <GiReturnArrow className="text-sky-500 text-3xl" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Easy Returns
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    7-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2000" className="lg:w-1/4 px-4 mb-8">
              <div className="flex items-center flex-col text-center">
                <div className="icon-bg w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                  <BsPatchCheckFill className="text-blue-500 text-3xl" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Quality Products
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Guaranteed satisfaction
                  </p>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="3000" className="lg:w-1/4 px-4 mb-8">
              <div className="flex items-center flex-col text-center">
                <div className="icon-bg w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-2">
                  <RiCustomerService2Line className="text-purple-500 text-3xl" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                  Exceptional customer service guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
