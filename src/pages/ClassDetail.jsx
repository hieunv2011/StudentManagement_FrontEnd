import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Side } from "../components";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ClassDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [classDetail, setClassDetail] = useState([]);
  const videoId = "Z0S92UkrAbk"; // ID của video YouTube bạn muốn nhúng
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/student/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header
            },
          }
        );
        setClassDetail(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching class detail:", error);
      }
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/class/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header
            },
          }
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching class detail:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleDeleteClick = async (student_id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return;
      }
      const confirmed = window.confirm(
        `Xác nhận xoá sinh viên có mã số: ${student_id}?`
      );
      if (!confirmed) return;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:8080/api/v1/class/${id}/delete/${student_id}`,
        config
      );
      const updatedClassDetail = classDetail.filter(
        (item) => item.id !== student_id
      );
      setClassDetail(updatedClassDetail);
      console.log("Sinh viên đã được xóa");
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8080/student/detail/${id}`
  //         );
  //         setClassDetail(response.data);
  //         console.log(response);
  //       } catch (error) {
  //         console.error("Error fetching class detail:", error);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  return (
    <div>
      <div className="flex min-h-screen bg-slate-100">
        <div className="w-10/12 m-2 rounded-2xl flex">
          <Side />
          <div className="w-full rounded-br-2xl rounded-tr-2xl p-8">
            <div className="flex flex-row gap-3">
              <div className="text-black text-left p-8 mb-3 rounded-2xl bg-white w-96">
                <h1 className="font-bold text-blue-800 text-2xl">
                  Thông tin lớp học
                </h1>
                <h1> Tên học phần: {data?.tenhocphan}</h1>
                <h1> Mã học phần: {data?.id}</h1>
                <h1> Phòng: {data?.room}</h1>
                <h1> Thời gian: {data?.time}</h1>
              </div>
              <div className="w-px bg-gray-300"></div> {/* Dòng kẻ mờ */}
              <div className="text-black text-left p-8 mb-3 w-[380px] rounded-2xl bg-white">
                <h1 className="font-bold text-2xl text-blue-800 flex items-center">
                  Tài liệu tham khảo
                  <span className="text-sm pl-2">
                    <FaExternalLinkAlt />
                  </span>
                </h1>
                <a
                  href={data?.doclink}
                  className="break-words text-blue hover:underline hover:text-blue-500"
                >
                  {data?.doclink}
                </a>
              </div>
              <div className="w-px bg-gray-300"></div> {/* Dòng kẻ mờ */}
              <div className="text-black text-left p-8 mb-3 rounded-2xl bg-white">
                <a
                  href={
                    data && data.vidlink
                      ? data.vidlink
                      : "https://www.youtube.com/watch?v=ZcZHva1NYSE"
                  }
                  className="font-bold text-2xl text-blue-800 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Video tham khảo
                  <span className="text-sm pl-2">
                    <FaExternalLinkAlt />
                  </span>
                </a>
                <ReactPlayer
                  url={
                    data && data.vidlink
                      ? data.vidlink
                      : "https://www.youtube.com/watch?v=ZcZHva1NYSE"
                  }
                  config={{
                    youtube: {
                      playerVars: { autoplay: 0 } // Tắt tự động phát
                    }
                  }}
                  width="100%"
                  height="200px"
                />
              </div>
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
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                    >
                      Mã sinh viên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                    >
                      Họ và tên
                    </th>
                    <th
                      scope="col"
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                    >
                      Nhập điểm 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classDetail !== null ? (
                    classDetail.map((classdata, index) => (
                      <tr key={index} className="border border-black">
                        <td className="border px-4 py-2 border-black">
                          {index + 1}
                        </td>
                        <td className="border px-4 py-2 border-black">
                          {classdata.email}
                        </td>
                        <td className="border px-4 py-2 border-black">
                          {classdata.id}
                        </td>
                        <td className="border px-4 py-2  flex">
                          {classdata.firstName} {classdata.lastName}
                        </td>
                        <td className="border px-4 py-2 border-black">
                          <FaEdit className="text-xl text-blue-800 hover:text-slate-500 cursor-pointer"/>
                        </td>
                        <td className="px-4 py-2 flex text-2xl">
                          <button
                            onClick={() => handleDeleteClick(classdata.id)}
                          >
                            <MdDeleteForever className="cursor-pointer text-red-500 hover:text-slate-500 ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border px-4 py-2 border-black text-center"
                      >
                        No data available
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
            <div className="flex items-center justify-center space-x-2">
              <img className="bg-blue-800 w-12 h-12 rounded-full" />
              <h1 className="">Nguyễn Việt Hiếu</h1>
            </div>
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
    </div>
  );
};

export default ClassDetail;
