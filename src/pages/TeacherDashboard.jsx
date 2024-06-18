import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PiMetaLogoThin } from "react-icons/pi";
import { Side } from "../components";

const TeacherDashboard = () => {
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
  
    return (
      <div className="flex min-h-screen bg-slate-100">
        <div className="w-10/12 border border-black m-2 rounded-2xl flex">
          <Side />
          <div className="w-full rounded-br-2xl rounded-tr-2xl">
            <div className="text-black text-left pl-3">
              <h1 className="text-4xl font-bold">Xin chào giáo viên</h1>
              <img
                className="w-32 h-32 rounded-full"
                src="your_image_url_here"
                alt="Avatar"
              />
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
}

export default TeacherDashboard