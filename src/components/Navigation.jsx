import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai"; // Import AiOutlineSearch
import { Sidebar } from "./Sidebar";

export const Navigation = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("https://jira.shlx.vn/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Perform search/filter operation here
  };

  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b-2 bg-white shadow-md">
      <div className="flex items-center gap-3 pl-4">
        <Sidebar />
      </div>
      <div className="flex items-center border border-gray-300 rounded-2xl px-3">
        <AiOutlineSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Tìm khoá học..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="focus:outline-none ml-1 h-8"
        />
      </div>
      <a
        className="flex items-center gap-2 px-4 py-2 text-black border border-black bg-white rounded-xl"
        href=""
      >
        <AiOutlineUser className="text-lg" />
        <h1 className="">Nguyễn Việt Hiếu</h1>
      </a>
    </nav>
  );
};
