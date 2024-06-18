import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//icons
import { FiLogIn, FiLogOut } from "react-icons/fi";
import student from "../assets/student.jpg";
import ielts from "../assets/ietls.png";
import dhqghn from "../assets/dhqghn.jpg";
import hust from "../assets/hust.png";
import { FaBookBookmark } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { PiMetaLogoThin } from "react-icons/pi";
import { CiChat1 } from "react-icons/ci";

const LandingPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="flex justify-between items-center bg-white">
        <div className="flex items-center w-6/12 ">
          <PiMetaLogoThin className="ml-16 text-blue-800 text-6xl" />
          <h1 className="text-2xl pl-2 text-blue-800 font-semibold">
            HM Education
          </h1>
          <h1 className="text-xl pl-2 text-blue-300 font-semibold">v1.1.1.1</h1>
        </div>

        <div className="flex flex-row-reverse items-center w-6/12 bg-white">
          <Link
            to="/login"
            className="flex items-center mx-5 px-3 py-2 bg-red-500 text-white rounded-3xl mr-4 hover:bg-blue-500"
          >
            <FiLogIn className="mr-2" />
            Đăng nhập/ Đăng ký
          </Link>
          <button className="flex items-center mx-3 py-2 text-black rounded-md hover:text-blue-500">
            E-learning
          </button>
          <button className="flex items-center mx-3 py-2 text-black rounded-md hover:text-blue-500">
            Tin tức giáo dục
            <span className="h-3 w-3 text-2xl pb-8 pr-3 text-red-800">
              <CiChat1 />
            </span>
          </button>
          <button className="flex items-center mx-3 py-2 text-black rounded-md hover:text-blue-500">
            Liên hệ với chúng tôi
          </button>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="w-7/12 bg-white p-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-800 text-left pt-44">
            Gieo mầm sáng tạo, dẫn hướng tương lai
          </h2>
          <p className="text-gray-700 text-left">
            Các bài giảng của giáo sư cho dù có đầy đủ, súc tích đến đâu, có
            chứa chan tình yêu tri thức đến đâu, thì về thực chất mà nói đó
            chẳng qua cũng vẫn chỉ là chương trình, là những lời chỉ dẫn tuần tự
            nhận thức của sinh viên. Người nào chỉ biết ngồi nghe giáo sư giảng
            chứ bản thân mình trong lòng không cảm thấy khát khao đọc sách, thì
            có thể nói tất cả những điều người ấy nghe giảng ở trường đại học
            cũng sẽ chỉ như một tòa nhà xây trên cát mà thôi.
          </p>
          <h2 className="italic text-right">Ivan Goncharov</h2>
          <div className="flex space-x-3">
            <button
              className="flex items-center px-16 py-5 bg-blue-800 text-white
           rounded-[32px] text-xl hover:bg-slate-300 hover:text-blue-800"
            >
              <FaBookBookmark className="mr-2 pl-1 text-2xl" />
              Đăng ký học tập
            </button>
            <button
              className="flex items-center px-16 py-5 bg-red-600 text-white
           rounded-[32px] text-xl hover:bg-slate-300 hover:text-blue-800"
            >
              <FaYoutube className="mr-2 pl-1 text-xl" />
              HM Education
            </button>
          </div>
          <div className="flex space-x-3">
            <img src={ielts} alt="ielts" className="h-[120px] object-cover" />
            <img
              src={dhqghn}
              alt="dhqghn"
              className="h-[60px] mt-[25px] object-cover"
            />
            <img
              src={hust}
              alt="hust"
              className="h-[60px] mt-[25px] object-cover"
            />
          </div>
        </div>
        <div className="w-5/12 bg-white text-white">
          <img
            src={student}
            alt="Student"
            className="h-[700px] object-cover pl-24"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
