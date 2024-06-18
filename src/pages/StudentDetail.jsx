import React, { useState, useEffect } from "react";
import axios from "axios";
import { Side } from "../components";
import { FaSearch } from "react-icons/fa";
import { set } from "date-fns";
import { Link, useParams } from "react-router-dom";

function StudentDetail() {
  const [students, setStudents] = useState([]);
  const { student_id } = useParams();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [submitId, setSubmitID] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const baseUrl = "http://localhost:8080/api/v1/student/";
  const finalUrl = `${baseUrl}${student_id}`;
  const imageUrl = `http://localhost:8080/api/v1/student/${student_id}/uploadImage`;
  //Upload Ảnh
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(imageUrl, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded:", response.data);
      fetchImage();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Hình ảnh quá lớn hoặc không đúng định dạng");
    }
  };
  //Upload

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

  //get
  const [image, setImage] = useState(null);
  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/student/${student_id}/image`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImage(`data:image/jpeg;base64,${base64}`);
    } catch (error) {
      console.error("Error fetching image", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [student_id, image]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-full m-2 rounded-2xl flex">
        <Side />
        <div className="w-full rounded-br-2xl rounded-tr-2xl px-8">
          <div className="bg-white h-[80px] my-4 rounded-2xl flex py-[20px] space-x-5 pl-8 items-center">
            <h1 className="text-black text-3xl font-bold">
              Thông tin sinh viên
            </h1>
          </div>
          {/* Main */}
          <div className="text-black text-center p-8 rounded-2xl bg-white h-[660px] overflow-y-auto flex flex-col space-y-4">
            <div className="flex space-x-4">
              {image ? (
                <img
                  src={image}
                  alt="Student"
                  className="h-80 w-80 border-black rounded-2xl"
                />
              ) : (
                <p>Đang tải ảnh...</p>
              )}
              <div className="flex flex-col space-y-8 text-xl">
                <div className="flex">
                  <h1 className="font-bold">Thay đổi ảnh sinh viên</h1>
                  <form onSubmit={handleSubmit} className="">
                    <input
                      type="text"
                      value={studentId}
                      onChange={handleIdChange}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <button
                      className="h-10 w-20 bg-blue-500 text-white font-bold rounded-xl"
                      type="submit"
                    >
                      Tải lên
                    </button>
                  </form>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex">
                      <h2 className="font-bold">Họ và tên: </h2>
                      <h2>
                        {students.firstName} {studentId.lastName}
                      </h2>
                    </div>
                    <div className="flex">
                      <h2 className="font-bold">Email: </h2>
                      <h2>{students.email}</h2>
                    </div>
                    <div className="flex">
                      <h2 className="font-bold"> Trường :</h2>
                      <h2>Điện tử - Đại học Bách Khoa Hà Nội</h2>
                    </div>
                    <div className="flex">
                      <h2 className="font-bold">Ngày sinh : </h2>
                      <h2>30/08/2001</h2>
                    </div>
                    <div className="flex">
                      <h2 className="font-bold">Khoá : </h2>
                      <h2>64</h2>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex">
                      <h2 className="font-bold">Lớp : </h2>
                      <h2>Điện tử K64-08</h2>
                    </div>
                    <div className="flex">
                      <h2 className="font-bold">Bậc đào tạo : </h2>
                      <h2>Đại học chính quy</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-slate-500"></div>
            <div className=" flex space-x-4">
              <Link className="bg-blue-800 w-80 h-10 rounded-2xl text-white font-bold flex items-center justify-center"
              to={`/studentgrade/${students.id}`}>
                Kiểm tra điểm học kỳ mới nhất
              </Link>
              <button className="bg-blue-800 w-80 h-10 rounded-2xl text-white font-bold">
                Bảng điểm cá nhân
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
