import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Product from "../../components/Product/Product";
import { BiSearchAlt, BiChevronUp, BiChevronDown } from "react-icons/bi";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(function (response) {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  // Apply filters to products and update filtered Products
  useEffect(() => {
    let filtered = [...products];

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-");
      filtered = filtered.filter(
        (product) =>
          product.price >= Number(min) && product.price <= Number(max)
      );
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, category, searchQuery, priceRange]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>;
  }

  // Pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="h-screen">
      <div className="flex my-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="w-3/12 p-8 bg-white shadow-lg rounded-md mt-4 h-[28rem] hidden sm:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 -top-3 flex items-center py-4">
              <button className="p-2 text-sky-700 focus:outline-none focus:ring">
                <BiSearchAlt className="h-6 w-6"></BiSearchAlt>
              </button>
            </span>
            <input
              type="search"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-2 pl-10 mb-4 text-sm rounded-md border border-sky-700"
            />
          </div>
          <div className="flex items-center">
            <div>
              <h2 className="text-gray-700 text-md font-semibold mb-4">
                Sort By:
              </h2>
            </div>
            <div className="mx-2">
              <select
                className="border p-2 mb-4"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <h2 className="text-gray-700 text-md font-semibold mb-4">
                Category:
              </h2>
            </div>
            <div className="mx-2">
              <select
                className="border p-2 mb-4"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <h2 className="text-gray-700 text-md font-semibold mb-4">
                Price Range:
              </h2>
            </div>
            <div className="mx-2">
              <select
                className="border p-2 mb-4"
                value={priceRange}
                onChange={handlePriceRangeChange}
              >
                <option value="">None</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-200">$50 - $200</option>
                <option value="250-500">$250 - $500</option>
                <option value="500-1000">$500 - $1000</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full md:w-9/12 p-4">
          <div className="flex items-center justify-end">
            <h2 className="text-sm mb-4">Show per page:</h2>
            <select
              className="border mx-2 p-1 mb-4"
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">20</option>
            </select>
          </div>
          <div className="sm:hidden fixed bottom-4 right-4 z-10">
            <button
              className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
              onClick={handleToggleFilters}
            >
              {showFilters ? (
                <BiChevronUp className="h-6 w-6" />
              ) : (
                <BiChevronDown className="h-6 w-6" />
              )}
            </button>
          </div>
          <div
            className={`w-full p-8 bg-white shadow-lg rounded-md mt-4 h-[28rem] ${
              showFilters ? "block sm:hidden" : "hidden"
            }`}
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 -top-3 flex items-center py-4">
                <button className="p-2 text-sky-700 focus:outline-none focus:ring">
                  <BiSearchAlt className="h-6 w-6"></BiSearchAlt>
                </button>
              </span>
              <input
                type="search"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full py-2 pl-10 mb-4 text-sm rounded-md border border-sky-700"
              />
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-gray-700 text-md font-semibold mb-4">
                  Sort By:
                </h2>
              </div>
              <div className="mx-2">
                <select
                  className="border p-2 mb-4"
                  value={sortBy}
                  onChange={handleSortByChange}
                >
                  <option value="">Default</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-gray-700 text-md font-semibold mb-4">
                  Category:
                </h2>
              </div>
              <div className="mx-2">
                <select
                  className="border p-2 mb-4"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">All</option>
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-gray-700 text-md font-semibold mb-4">
                  Price Range:
                </h2>
              </div>
              <div className="mx-2">
                <select
                  className="border p-2 mb-4"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                >
                  <option value="">None</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-200">$50 - $200</option>
                  <option value="250-500">$250 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-3 sm:row-gap-6 sm:grid-cols-2">
            {currentProducts?.map((product) => (
              <Product key={product.id} products={product}></Product>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
