import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet library
import axios from "axios";
export default function App() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/student/getAll"
        );
        setStudents(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const customIcon = L.icon({
    iconUrl: require("../assets/car.png"), // URL of the custom icon image
    iconSize: [100, 100], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Popup anchor point
  });

  return (
    <div>
      <MapContainer
        center={[21.007511192388034, 105.84279403090373]}
        zoom={200}a
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {students.map((student, index) => (
          <Marker key={index} position={[student.latitude, student.longitude]} icon={customIcon}>
            <Popup>
              {student.name}
            </Popup>
          </Marker>
        ))}
                  {/* <Marker position={[21.00017310940542, 105.84258300924056]} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
      </MapContainer>
    </div>
  );
}
