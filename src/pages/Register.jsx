import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { PiMetaLogoThin } from "react-icons/pi";
import video from "../assets/video.mp4";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // State to track success

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password matches confirm password
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !confirmPassword ||
      !address ||
      !email
    ) {
      setMessage("Vui lòng điền vào tất cả các phần");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Check user and email exist
      const responsecheck = await axios.get(
        "http://localhost:8080/student/getAll"
      );

      // Kiểm tra xem username hoặc email đã tồn tại trong danh sách hay chưa
      const users = responsecheck.data;
      const userExists = users.some(
        (user) => user.username === username || user.email === email
      );

      // Nếu username hoặc email đã tồn tại, hiển thị thông báo lỗi
      if (userExists) {
        setMessage("Tên đăng nhập hoặc email đã tồn tại");
        return;
      }

      const response = await axios.post("http://localhost:8080/student/add", {
        name: `${firstName} ${lastName}`,
        username: username,
        address: address,
        email: email,
        password: password,
      });
      setSuccess(true); // Set success to true upon successful registration
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("An error occurred while adding account. Please try again.");
    }
  };

  // Render success message and login button
  if (success) {
    return (
      <div className="h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Đăng ký thành công</h2>
          <p className="text-green-600 mb-4">
            Tài khoản của bạn đã được tạo thành công.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  // Render registration form
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
        <form className="flex flex-col p-8 mt-20 space-y-4">
          <div className="flex items-center">
            <PiMetaLogoThin className="text-blue-800 text-bold text-6xl" />
            <h1 className="text-2xl pl-2 text-blue-800 font-semibold">
              HM Education
            </h1>
            <h1 className="text-xl pl-2 text-blue-300 font-semibold">
              v1.1.1.1
            </h1>
          </div>
          <h2 className="text-4xl text-blue-800 mb-4 text-left font-bold">
            Đăng ký
          </h2>
          <Link to="/login" className="text-xl text-blue-800 text-left">
            Bạn đã có tài khoản? Đăng nhập
          </Link>
          <form className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Họ"
                  className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Tên"
                  className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Tên đăng nhập"
              className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-800 text-white py-2 px-4 rounded-3xl hover:bg-blue-600 transition duration-300"
            >
              Đăng ký tài khoản
            </button>
          </form>
          {message && <p className="text-red-600 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
