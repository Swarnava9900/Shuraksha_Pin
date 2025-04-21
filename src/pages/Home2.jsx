/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GPSData from "../components/Gps";
import Map from "../components/Map";
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaCog,
  FaHome,
  FaSpinner,
} from "react-icons/fa";

const Loader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div className="bg-white p-10 rounded-2xl text-red-600 text-center flex flex-col items-center space-y-6 border-2 border-black shadow-2xl animate-fadeIn">
      <FaSpinner className="animate-spin text-5xl text-blue-400" />
      <span className="text-3xl font-bold text-black">
        Suraksha <span className="text-red-600">Pin</span>
      </span>
    </div>
  </div>
);

const Home2 = () => {
  const [gps, setGps] = useState({ latitude: null, longitude: null });
  const [userId, setUserId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState("loading"); // Status: loading, operational, empty, down
  const [ipAddress, setIpAddress] = useState(
    () => localStorage.getItem("esp32_ip") || "192.168.0.1"
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const perspectiveStyle = { perspective: "1000px" };

  const getStatusStyles = () => {
    switch (status) {
      case "down":
        return {
          bgColor: "bg-red-500",
          textColor: "text-white",
        };
      case "operational":
        return {
          bgColor: "bg-green-500",
          textColor: "text-white",
        };
      case "empty":
        return {
          bgColor: "bg-yellow-500",
          textColor: "text-black",
        };
      default:
        return {
          bgColor: "bg-gray-500",
          textColor: "text-white",
        };
    }
  };

  const { bgColor, textColor } = getStatusStyles();

  if (loading) return <Loader />;

  return (
    <div className="flex w-full min-h-screen bg-white text-black font-sans transition-all duration-300">
      <aside className="w-20 bg-gray-100 flex flex-col items-center py-6 shadow-2xl space-y-10 transition-all duration-300 hover:bg-gray-200 rounded-e-2xl">
        <Link to="/">
          <FaHome className="text-3xl text-black hover:text-gray-600 cursor-pointer transition-transform duration-200 transform hover:scale-110" />
        </Link>
        <Link to="/settings">
          <FaCog className="text-3xl text-black hover:text-gray-600 cursor-pointer transition-transform duration-200 transform hover:scale-110" />
        </Link>
        {[FaUserFriends, FaMapMarkerAlt].map((Icon, idx) => (
          <Icon
            key={idx}
            className="text-3xl text-black hover:text-gray-600 cursor-pointer transition-transform duration-200 transform hover:scale-110"
          />
        ))}
      </aside>

      <main
        className="flex-1 flex flex-col overflow-hidden p-4"
        style={perspectiveStyle}
      >
        <a href={`http://${ipAddress}/data`} target="_blank" rel="noopener noreferrer">
          <section
            className={`${bgColor} p-6 text-center text-xl font-bold ${textColor} shadow-xl mb-6 rounded-2xl transform transition-transform duration-500 hover:scale-102 hover:shadow-2xl animate-fadeIn`}
          >
            {status === "loading"
              ? "Loading system status..."
              : status === "down"
              ? "⚠️ System Down. Unable to Fetch Data."
              : status === "empty"
              ? "☑️ System Operational. No SOS Recieved Yet"
              : "✅ System Operational. GPS tracking active."}
          </section>
        </a>

        <div className="flex flex-1 overflow-hidden gap-4">
          <section className="flex-1 flex flex-col space-y-6 overflow-auto">
            <div className="flex gap-6" style={perspectiveStyle}>
              <div className="bg-white p-6 rounded-2xl flex items-center gap-6 shadow-xl border-l-4 border-red-500 transform transition-transform duration-500 hover:rotate-y-3 hover:rotate-x-1 hover:shadow-2xl animate-float">
                <FaMapMarkerAlt
                  className={[
                    "text-4xl",
                    gps.latitude ? "text-green-500" : "text-red-500",
                    "animate-pulse",
                  ].join(" ")}
                />
                <span className="text-2xl font-semibold text-red-500 drop-shadow-md">
                  {gps.latitude ? "GPS Connected" : "GPS Not Connected"}
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-300 flex-1 transform transition-transform duration-500 hover:rotate-y-2 hover:shadow-2xl animate-float">
                <GPSData
                  setGps={setGps}
                  setUserId={setUserId}
                  setConnectedUsers={setConnectedUsers}
                  ipAddress={ipAddress}
                  setStatus={setStatus} // Passing setStatus to update the status
                />
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-300 h-[450px] transform transition-transform duration-500 hover:rotate-y-1 hover:shadow-2xl animate-float"
              style={perspectiveStyle}
            >
              {gps.latitude && gps.longitude ? (
                <Map latitude={gps.latitude} longitude={gps.longitude} />
              ) : (
                <div className="h-full flex items-center justify-center text-black text-xl">
                  Waiting for GPS data...
                </div>
              )}
            </div>
          </section>

          <aside
            className="w-64 bg-gradient-to-b from-gray-900 to-red-700 p-6 shadow-xl space-y-6 max-h-screen overflow-y-auto transform transition-transform duration-500 hover:rotate-y-1 hover:shadow-2xl rounded-2xl animate-fadeIn"
            style={perspectiveStyle}
          >
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
              Users
            </h2>
            <ul className="space-y-4">
              {connectedUsers.length > 0 ? (
                connectedUsers.map((user) => (
                  <li
                    key={user}
                    className="text-white hover:text-red-400 cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    {user}
                  </li>
                ))
              ) : (
                <p className="text-white">No users connected</p>
              )}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home2;
