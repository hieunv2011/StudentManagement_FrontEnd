import React, { useState, useEffect } from "react";
import axios from "axios";
import { Side } from "../components";
import { FaSearch } from "react-icons/fa";
import { set } from "date-fns";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import AddStudent from "./AddStudent";
function StudentList() {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [submitId, setSubmitID] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const baseUrl = "http://localhost:8080/api/v1/student?";
  const finalUrl = `${baseUrl}email=${submitEmail}&id=${submitId}`;
  useEffect(() => {
    fetchStudents();
  }, [submitEmail, submitId]); //
  const fetchStudents = async () => {
    try {
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudents(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  //Search

  const handleIdChange = (event) => {
    setId(event.target.value);
    // console.log(id);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(email);
  };
  const handleSearch = () => {
    setSubmitEmail(email);
    setSubmitID(id);
    console.log(finalUrl);
    // fetchStudents();
  };
  //Add Data
  const [isModalOpen, setIsModelOpen] = useState(false);
  const handleModelOpen = () => {
    setIsModelOpen(!isModalOpen);
  };


  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-10/12 m-2 rounded-2xl flex">
        <Side />
        <div className="w-full rounded-br-2xl rounded-tr-2xl px-8">
          {/* Search */}
          <div className="bg-white h-[80px] my-4 rounded-2xl flex py-[20px] space-x-5 pl-8 items-center">
            {/* Ô tìm kiếm theo ID */}
            <input
              type="text"
              placeholder="Mã số sinh viên"
              value={id}
              onChange={handleIdChange}
              className="h-10 border border-slate-300 focus:outline-none focus:border-blue-500 rounded-lg px-4"
            />

            {/* Ô tìm kiếm theo Email */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="h-10 border border-slate-300 focus:outline-none focus:border-blue-500 rounded-lg px-4"
            />
            <button onClick={handleSearch} className="cursor-pointer">
              <FaSearch className="text-white rounded-full bg-blue-500 h-8 w-8 p-2" />
            </button>
            <button onClick={handleModelOpen} className="cursor-pointer">
              <IoMdAdd className="text-white rounded-full bg-blue-500 h-8 w-8 p-2 text-2xl font-bold" />
            </button>
          </div>
          {/* Main */}
          <div className="text-black text-center p-8 rounded-2xl bg-white h-[660px] overflow-y-auto ">
            <table className="min-w-full bg-white border border-black">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    STT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Mã sinh viên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Họ và tên
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Tên
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border border-black">
                    <td className="border px-4 py-2 border-black ">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {student.id}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      <Link
                        className="text-blue-500 underline"
                        to={`/studentdetail/${student.id}`}
                      >
                        {student.firstName} {student.lastName}
                      </Link>
                    </td>
                    {/* <td className="border px-4 py-2 border-black">
                      {student.lastName}
                    </td> */}
                    <td className="border px-4 py-2 border-black">
                      {student.email}
                    </td>
                  </tr>
                ))}
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
                {/* {time} */}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <img className="bg-blue-800 w-12 h-12 rounded-full" />
            <h1 className="">Nguyễn Việt Hiếu</h1>
          </div>
        </div>
        <div className="text-black h-2/6 p-3">
          {/* <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              className="rounded-2xl text-sm border "
            /> */}
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <AddStudent className="h-96 w-96"/>
        </div>
      )}
    </div>
  );
}

export default StudentList;
