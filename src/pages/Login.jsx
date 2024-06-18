import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PiMetaLogoThin } from "react-icons/pi";
import video from "../assets/video.mp4";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu POST tới API
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        {
          email,
          password,
        }
      );
      const token = response.data.token; // Giả sử token được trả về từ server là trường 'token'
      localStorage.setItem("token", token); // Lưu token vào localStorage
      console.log("Thành công");
      console.log(response);
      navigate("/student");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Đã xảy ra lỗi:", error.response.data);
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="w-7/12 relative">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 p-4 text-white flex items-center space-x-3">
          <PiMetaLogoThin className="text-white text-bold text-6xl" />
          <h1 className="text-2xl text-white font-semibold">HM Education</h1>
          <h1 className="text-xl text-blue-300 font-semibold">v1.1.1.1</h1>
        </div>
      </div>
      <div className="w-5/12 bg-white">
        <form
          className="flex flex-col p-8 mt-[180px] space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center">
            <PiMetaLogoThin className="text-blue-800 text-bold text-6xl" />
            <h1 className="text-2xl pl-2 text-blue-800 font-semibold">
              HM Education
            </h1>
            <h1 className="text-xl pl-2 text-blue-300 font-semibold">
              v1.1.1.1
            </h1>
          </div>
          <h2 className="text-4xl text-blue-800 mb-4 text-left">Đăng nhập</h2>
          <div className="flex flex-col space-y-4 ">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="px-4 py-2 mb-4 rounded-3xl bg-white text-gray-700 border border-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="px-4 py-2 pr-10 rounded-3xl bg-white text-gray-700 border border-gray-200 w-[2000px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Nút icon con mắt */}
              <div
                className="px-3 hover:text-blue-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-800 text-white py-2 rounded-3xl font-semibold hover:bg-blue-500 hover:text-blue-800"
            >
              Đăng nhập
            </button>
            <p className="text-red-500">{errorMessage}</p>
            <button
              type="forgot"
              className="text-blue-800 relative flex items-center justify-center"
            >
              Quên tên đăng nhập / Mật khẩu
              {/* <span className="absolute bottom-[-5px]  w-6/12 h-0.5 bg-gray-200"></span> */}
            </button>
            <Link
              to="/register"
              className="bg-green-600 w-52 text-white py-2 rounded-3xl mx-auto font-semibold hover:bg-blue-800 hover:text-white"
            >
              Đăng ký tài khoản mới
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
