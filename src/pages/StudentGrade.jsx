import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Side } from "../components";
import { FaSearch } from "react-icons/fa";
import { set } from "date-fns";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import AddStudent from "./AddStudent";
function StudentGrade() {
  const [students, setStudents] = useState([]);
  const { id } = useParams(); // Lấy `id` từ URL
  const [email, setEmail] = useState("");
  const [submitId, setSubmitID] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const baseUrl = "http://localhost:8080/api/v1/grade/student/";
  const finalUrl = `${baseUrl}${id}`;
  useEffect(() => {
    fetchStudents();
  }, []); //
  const fetchStudents = async () => {
    try {
      const response = await axios.get(finalUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudents(response.data);
      if (response.data.length > 0) {
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  //Search

  const handleIdChange = (event) => {
    // setId(event.target.value);
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

  //quy đổi điểm
  const convertToGrade = (score) => {
    if (score >= 8.5) {
      return "A";
    } else if (score >= 8.0) {
      return "B+";
    } else if (score >= 7.0) {
      return "B";
    } else if (score >= 6.5) {
      return "C+";
    } else if (score >= 5.5) {
      return "C";
    } else if (score >= 5.0) {
      return "D+";
    } else if (score >= 4.0) {
      return "D";
    } else {
      return "F";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-full m-2 rounded-2xl flex">
        <Side />
        <div className="w-full rounded-br-2xl rounded-tr-2xl px-8">
          {/* Search */}
          <div className="bg-white h-[80px] my-4 rounded-2xl flex py-[20px] space-x-5 pl-8 items-center text-blue-800 font-medium text-2xl ">
            Bảng điểm cá nhân
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
                    Mã lớp học
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Tên học phần 
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
                    Điểm giữa kỳ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Điểm cuối kỳ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Điểm tổng kết
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                    Điểm chữ
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
                      >
                        {student.subject}
                      </Link>
                    </td>
                    {/* <td className="border px-4 py-2 border-black">
                      {student.lastName}
                    </td> */}
                    <td className="border px-4 py-2 border-black">
                      {student.giuaky}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {student.cuoiky}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {(student.giuaky * 0.3 + student.cuoiky * 0.7).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {convertToGrade(
                        (student.giuaky * 0.3 + student.cuoiky * 0.7).toFixed(2)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="w-/12 flex flex-col">
        <div className="h-1/6 bg-white ml-3 rounded-bl-2xl">
          <div>
            <div className="clock">
              <span id="clock" className="text-3xl font-tick">
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <img className="bg-blue-800 w-12 h-12 rounded-full" />
            <h1 className="">Nguyễn Việt Hiếu</h1>
          </div>
        </div>
        <div className="text-black h-2/6 p-3">
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
          </ul>
        </div>
      </div> */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <AddStudent className="h-96 w-96" />
        </div>
      )}
    </div>
  );
}

export default StudentGrade;
