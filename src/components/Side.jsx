import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";


import { AiOutlineDashboard } from "react-icons/ai";
import { FaChalkboard } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { BiCalendar, BiUser, BiHelpCircle } from "react-icons/bi";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { PiMetaLogoThin } from "react-icons/pi";

const Side = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const handleHover = (isHovered) => {
    setIsHovered(isHovered);
  };
  return (
    <>
      <div className=" flex">
        <div
          className="bg-slate-800 text-white p-2 rounded-bl-2xl rounded-tl-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="mb-4 text-5xl mr-2">
            <PiMetaLogoThin />
          </div>
          <ul className="text-white space-y-4">
            <li className=" p-2 cursor-pointer flex items-center">
              <AiOutlineDashboard className="mr-2 text-xl " />
            </li>
            <li className=" p-2 cursor-pointer flex items-center">
              <FaChalkboard className="mr-2 text-xl " />
            </li>
            <li className=" p-2 cursor-pointer flex items-center">
              <GiBookshelf className="mr-2 text-xl " />
            </li>
            {/* <li className=" p-2 cursor-pointer flex items-center">
              <BiCalendar className="mr-2 text-xl " />
            </li>
            <li className=" p-2 cursor-pointer flex items-center">
              <BiUser className="mr-2 text-xl " />
            </li>
            <li className=" p-2 cursor-pointer flex items-center">
              <BiHelpCircle className="mr-2 text-xl " />
            </li>
            <li className=" p-2 cursor-pointer flex items-center">
              <RiBarChartGroupedLine className="mr-2 text-xl " />
            </li> */}
            {/* <li className=" p-2 cursor-pointer flex items-center">
              <IoLogOutOutline className="mr-2 text-xl mt-52" />
            </li> */}
          </ul>
        </div>
        <motion.div
          initial={{ width: "0px", visibility: "hidden" }}
          animate={{
            width: isHovered ? "200px" : "0px",
            visibility: "visible",
          }}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          className="min-h-screen bg-slate-800 text-white rounded-br-2xl rounded-tr-2x flex flex-1 flex-col"
        >
          <div
            className="mb-4 pt-[23px] text-2xl"
            style={{ visibility: isHovered ? "visible" : "hidden" }}
          >
            HMEducation
          </div>
          <ul className="text-white space-y-3">
            <li className="p-2 cursor-pointer flex items-center">
              <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
                Trang chủ
              </div>
            </li>
            <li
              className={`p-2 cursor-pointer flex items-center ${
                location.pathname === "/class" ? "bg-slate-100 text-black" : ""
              }`}
              style={{ visibility: isHovered ? "visible" : "hidden" }}
            >
              <Link to="/class">Lớp học</Link>
            </li>
            <li className="p-2 cursor-pointer flex items-center  hover:bg-slate-300 hover:text-black">
              <Link
                to="/studentlist"
                style={{ visibility: isHovered ? "visible" : "hidden" }}
              >
                Danh sách sinh viên
              </Link>
            </li>
            {/* <li className="p-2 cursor-pointer flex items-center">
              <Link
                to="/courseregister"
                style={{ visibility: isHovered ? "visible" : "hidden" }}>
                Đăng ký lớp
              </Link>
            </li>
            <li className="p-2 cursor-pointer flex items-center">
              <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
                Thời khoá biểu
              </div>
            </li>
            <li className="p-2 cursor-pointer flex items-center">
              <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
                Học phí
              </div>
            </li>
            <li className="p-2 cursor-pointer flex items-center">
              <div style={{ visibility: isHovered ? "visible" : "hidden" }}>
                Thông tin sinh viên
              </div>
            </li> */}
          </ul>
          <div className="p-2 cursor-pointer flex items-center mt-auto">
            <div
              style={{
                visibility: isHovered ? "visible" : "hidden",
                flex: "reverse",
              }}
            >
              Logout
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Side;
