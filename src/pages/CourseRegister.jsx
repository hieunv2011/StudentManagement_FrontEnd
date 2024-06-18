import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PiMetaLogoThin } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Side } from "../components";

const CourseRegister = () => {
  const [data, setData] = useState([]);
  const [idData, setIdData] = useState([]);
  const [time, setTime] = useState("");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [mahocphan, setMahocphan] = useState("");
  const [malop, setMalop] = useState("");

  const [mahocphansearch, setMahocphansearch] = useState("");
  const [malopsearch, setMalopsearch] = useState("");

  const [submitmahocphan, setSubmitMahocphan] = useState("");
  const [submitmalop, setSubmitMalop] = useState("");

  const [room, setRoom] = useState("");
  const [studentnumber, setStudentnumber] = useState("");
  const [teachername, setTeachername] = useState("");
  const [classTime, setClassTime] = useState("");

  const baseUrl = "http://localhost:8080/api/v1/class";
  const finalUrl = `${baseUrl}/search?mahocphan=${submitmahocphan}&malop=${submitmalop}`;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(finalUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header
          },
        });
        setData(response.data);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [submitmahocphan, submitmalop]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (selectedId !== null) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/class/${selectedId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header
              },
            }
          );
          setIdData(response.data);
          // console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [
    selectedId,
    mahocphan,
    malop,
    room,
    studentnumber,
    teachername,
    classTime,
  ]);
  const handleUpdateSubmit = async (e, id, malop) => {
    e.preventDefault();
    // Thực hiện gửi dữ liệu cập nhật
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }
      const confirmed = window.confirm(`Xác nhận cập nhật thông tin lớp ?`);
      if (!confirmed) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:8080/api/v1/class/update/${selectedId}`,
        {
          mahocphan,
          malop,
          room,
          studentnumber,
          time: classTime,
        },
        config
      );

      // Cập nhật dữ liệu trực tiếp sau khi cập nhật thành công
      const updatedData = data.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              mahocphan,
              malop,
              room,
              studentnumber,
              teachername,
              time: classTime,
            }
          : item
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDeleteClick = async (id, malop) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }

      const confirmed = window.confirm(`Xác nhận xoá lớp có mã số: ${malop}?`);
      if (!confirmed) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:8080/api/v1/class/delete/${id}`,
        config
      );

      // Cập nhật dữ liệu trực tiếp sau khi xóa thành công
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);

      console.log("Lớp học đã được xóa");
    } catch (error) {
      console.error("Lỗi khi xóa lớp học:", error);
    }
  };

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

  const handleEditClick = (id) => {
    setShowModal(true);
    console.log("Selected class ID:", id);
    setSelectedId(id);
  };
  const handleCancelClick = () => {
    setShowModal(false);
    setMahocphan("");
    setMalop("");
    setRoom("");
    setStudentnumber("");
    setTeachername("");
    setClassTime("");
  };
  const handleMalopClick = (id) => {
    console.log("Clicked class ID:", id);
  };

  const handleMahocphanChange = (event) => {
    setMahocphansearch(event.target.value);
  };
  const handleMalopChange = (event) => {
    setMalopsearch(event.target.value);
  };
  const handleSearch = () => {
    setSubmitMahocphan(mahocphansearch);
    setSubmitMalop(malopsearch);
  };
  // console.log(finalUrl);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-10/12 m-2 rounded-2xl flex">
        <Side />
        <div className="w-full rounded-br-2xl rounded-tr-2xl pl-9">
          <div className="bg-white h-[80px] my-4 rounded-2xl flex space-x-5 pl-8 items-center">
            {/* Ô tìm kiếm theo ID */}
            <input
              type="text"
              placeholder="Mã lớp"
              value={mahocphansearch}
              onChange={handleMahocphanChange}
              className="h-10 border border-slate-300 focus:outline-none focus:border-blue-500 rounded-lg px-4"
            />

            {/* Ô tìm kiếm theo Email */}
            <input
              type="text"
              placeholder="Mã sinh viên"
              value={malopsearch}
              onChange={handleMalopChange}
              className="h-10 border border-slate-300 focus:outline-none focus:border-blue-500 rounded-lg px-4"
            />
            <button onClick={handleSearch} className="cursor-pointer">
              <FaSearch className="text-white rounded-full bg-blue-500 h-8 w-8 p-2" />
            </button>
          </div>
          <div className="text-black text-center p-8 rounded-2xl bg-white h-[660px] overflow-y-auto">
            <table className="min-w-full bg-white border border-black">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Mã học phần
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Mã lớp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Phòng học
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Số sinh viên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Giáo viên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Thời gian
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((classdata, index) => (
                    <tr key={classdata.id} className="border border-black">
                      <td className="border px-4 py-2 border-black">
                        {classdata.id}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {classdata.mahocphan}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        <Link
                          to={`/classdetail/${classdata.id}`}
                          className="text-blue-800 underline"
                        >
                          {classdata.malop}
                        </Link>
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {classdata.room}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {classdata.studentnumber}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {classdata.teachername}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {classdata.time}
                      </td>
                      <td className="px-4 py-2 flex text-2xl">
                        <FaEdit
                          className="cursor-pointer text-blue-800 hover:text-slate-500"
                          onClick={() =>
                            handleEditClick(classdata.id, classdata.malop)
                          }
                        />
                        <button
                          onClick={() =>
                            handleDeleteClick(classdata.id, classdata.malop)
                          }
                        >
                          <MdDeleteForever className="cursor-pointer text-red-500 hover:text-slate-500 ml-2" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Không tìm thấy dữ liệu !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Cập nhật thông tin lớp
            </h2>
            {/* Form để cập nhật thông tin */}
            <form>
              <div className="flex space-x-3">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label
                      htmlFor="mahocphan"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mã học phần:
                      <span>{idData.mahocphan}</span>
                    </label>
                    <input
                      type="text"
                      id="mahocphan"
                      onChange={(e) => setMahocphan(e.target.value)}
                      className="mt-1 p-2 block w-full border  rounded-md border-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="malop"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mã lớp:
                      <span>{idData.malop}</span>
                    </label>
                    <input
                      type="text"
                      id="malop"
                      onChange={(e) => setMalop(e.target.value)}
                      className="mt-1 p-2 block w-full border  rounded-md border-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="room"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phòng học:
                      <span>{idData.room}</span>
                    </label>
                    <input
                      type="text"
                      id="room"
                      onChange={(e) => setRoom(e.target.value)}
                      className="mt-1 p-2 block w-full border  rounded-md border-black"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="mb-4">
                    <label
                      htmlFor="classTime"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thời gian:
                      <span>{idData.time}</span>
                    </label>
                    <input
                      type="text"
                      id="classTime"
                      onChange={(e) => setClassTime(e.target.value)}
                      className="mt-1 p-2 block w-full border  rounded-md border-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="classTime"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Số sinh viên:
                      <span>{idData.studentnumber}</span>
                    </label>
                    <input
                      type="text"
                      id="classTime"
                      onChange={(e) => setStudentnumber(e.target.value)}
                      className="mt-1 p-2 block w-full border  rounded-md border-black"
                    />
                  </div>
                </div>
              </div>
              {/* Tương tự, thêm các trường đầu vào khác */}
              <button
                type="submit"
                onClick={handleUpdateSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Cập nhật
              </button>
              <button
                onClick={handleCancelClick}
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Huỷ bỏ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRegister;
