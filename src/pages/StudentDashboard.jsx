import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PiMetaLogoThin } from "react-icons/pi";
import { BsPeople, BsFillPersonFill, BsBook, BsGear } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Side } from "../components";
import bg from "../assets/bg.jpg";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Bar } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement);

const StudentDashboard = () => {
  const [time, setTime] = useState("");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}:${seconds}`);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date); // Log selected date to console
  };

  const [user, setUser] = useState([]);
  const finalUrl = "http://localhost:8080/api/v1/user/me";
  useEffect(() => {
    fetchUser();
  }, []); //
  const fetchUser = async () => {
    try {
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 40],
        backgroundColor: ["rgb(239, 68, 68)", "rgb(59, 130, 246)"],
        borderColor: ["rgb(0, 0, 0)", "rgb(0, 0, 0)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-10/12 m-2 rounded-2xl flex">
        <Side />
        <div className="w-full rounded-br-2xl rounded-tr-2xl"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="text-black text-left p-8">
            <h1 className="text-3xl font-medium">
              Xin chào {user.firstname} {user.secondname}! Chúc một ngày tốt
              lành
            </h1>
            <div className="h-[1px] w-full bg-slate-500 mt-5"></div>
            <div className="h-52 flex mt-10">
              <div className="flex space-x-2">
                <div className="space-y-2">
                  <div
                    className="bg-blue-800 h-20 w-60 text-white font-medium rounded-xl flex items-center space-x-2
                  hover:text-black hover:bg-blue-500"
                  >
                    <h1 className="ml-3">Danh sách sinh viên</h1>
                    <BsPeople className="text-4xl" />
                  </div>
                  <div
                    className="bg-green-800 h-20 w-60 text-white font-medium rounded-xl flex items-center space-x-2
                  hover:text-black hover:bg-green-500"
                  >
                    <h1 className="ml-3">Danh sách giáo viên</h1>
                    <FaChalkboardTeacher className="text-4xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="bg-yellow-500 h-20 w-60 text-white font-medium rounded-xl flex items-center space-x-2
                  hover:text-black hover:bg-yellow-300"
                  >
                    <h1 className="ml-3">Danh sách lớp học</h1>
                    <BsBook className="text-4xl" />
                  </div>
                  <div
                    className="bg-red-800 h-20 w-60 text-white font-medium rounded-xl flex items-center space-x-2
                  hover:text-black hover:bg-red-500"
                  >
                    <h1 className="ml-3">Cài đặt chung</h1>
                    <BsGear className="text-4xl" />
                  </div>
                </div>
              </div>
              <div className="flex ml-28">
                <Pie data={data} />
                <div className="ml-10">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-blue-500 border border-black"></div>
                    <h2>Có mặt</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-red-500  border border-black"></div>
                    <h2>Vắng mặt</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/12 flex flex-col">
        <div className="h-1/6 bg-white ml-3 rounded-bl-2xl">
          <div>
            <div className="clock">
              <span id="clock" className="text-3xl font-tick">
                {time}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <img className="bg-blue-800 w-12 h-12 rounded-full" />
            <h1 className="">Nguyễn Việt Hiếu</h1>
          </div>
        </div>
        <div className="text-black h-2/6 p-3">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-2xl text-sm border "
          />
        </div>
        <div className="h-2/5 overflow-y-auto border border-slate-600 mt-16 mx-3 rounded-2xl">
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Notification 1
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Notification content 1
                  </p>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Notification 2
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Notification content 2
                  </p>
                </div>
              </div>
            </li>
            {/* Add more notifications as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
