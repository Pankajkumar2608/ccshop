import axios from "axios";
import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    bin: "",
    country: "",
    base: "dec 2024",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/filter", {
        params: filters,
        withCredentials: true,
      });
      if (response.data) {
        onFilter(response.data);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-gray-200 rounded-xl mt-2 shadow-lg font-nunito">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-black font-semibold min-w-[90px]">Bin:</label>
          <input
            type="text"
            name="bin"
            value={filters.bin}
            onChange={handleInputChange}
            placeholder="Enter bin number"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-black font-semibold min-w-[90px]">Country:</label>
          <input
            type="text"
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            placeholder="Type country name"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-black font-semibold min-w-[90px]">Base:</label>
          <select
            name="base"
            value={filters.base}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          >
            <option value="dec 2024">Dec 2024</option>
            <option value="jan 2025">Jan 2025</option>
            <option value="feb 2025">Feb 2025</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-black font-semibold min-w-[90px]">Zip:</label>
          <input
            type="text"
            name="zip"
            value={filters.zip}
            onChange={handleInputChange}
            placeholder="Enter zip code"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button
            onClick={applyFilter}
            className="px-8 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
