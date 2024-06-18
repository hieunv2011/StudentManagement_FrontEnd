import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/add",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data);
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("An error occurred while adding student. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            {" "}
            First Name:
          </label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="address"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="longLtude" className="block text-gray-700">
            Email:
          </label>
          <input
            type="text"
            id="longitude"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
