import React, { useState, useEffect } from "react";
import axios from "axios";

const EditGradeModal = ({ isOpen, onClose, student, malop, onSave }) => {
  const [giuaky, setGiuaky] = useState(0);
  const [cuoiky, setCuoiky] = useState(0);

  useEffect(() => {
    if (student) {
      setGiuaky(student.giuaky || 0);
      setCuoiky(student.cuoiky || 0);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // Update giuaky
      await axios.put(
        `http://localhost:8080/api/v1/grade/${malop}/${student.student}/giuaky`,
        { giuaky },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update cuoiky
      await axios.put(
        `http://localhost:8080/api/v1/grade/${malop}/${student.student}/cuoiky`,
        { cuoiky },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Notify parent about the change
      onSave();
    } catch (error) {
      console.error("Error updating grade:", error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Nhập điểm</h2>
        <div className="mb-4">
          <label className="block mb-1">Điểm giữa kỳ</label>
          <input
            type="number"
            value={giuaky}
            onChange={(e) => setGiuaky(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Điểm cuối kỳ</label>
          <input
            type="number"
            value={cuoiky}
            onChange={(e) => setCuoiky(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGradeModal;
