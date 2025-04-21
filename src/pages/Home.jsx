import React, { useState, useEffect } from "react";
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
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-10 rounded-xl text-white text-center flex flex-col items-center space-y-4">
      <FaSpinner className="animate-spin text-4xl text-blue-400" />
      <span className="text-2xl">Suraksha Pin</span>
    </div>
  </div>
);

const Home = () => {
  const [gps, setGps] = useState({ latitude: null, longitude: null });
  const [userId, setUserId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([
    "user1",
    "user2",
    "user3",
    "user4",
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    d;
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  console.log(
    "Window height:",
    window.innerHeight,
    "Body height:",
    document.body.offsetHeight
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white">
      <aside className="w-20 bg-gray-800 flex flex-col items-center py-4 shadow-xl space-y-8">
        <FaHome className="text-2xl hover:text-white cursor-pointer" />
        <FaUserFriends className="text-2xl hover:text-white cursor-pointer" />
        <FaMapMarkerAlt className="text-2xl hover:text-white cursor-pointer" />
        <FaCog className="text-2xl hover:text-white cursor-pointer" />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <section className="bg-gray-700 p-4 text-center text-sm">
          🚨 System Operational. GPS tracking active.
        </section>

        <div className="flex flex-1 overflow-hidden">
          <section className="flex-1 p-4 space-y-4 overflow-auto">
            <div className="flex gap-4">
              <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-4 shadow-md">
                <FaMapMarkerAlt
                  className={`text-3xl ${
                    gps.latitude ? "text-green-400" : "text-red-500"
                  } animate-pulse`}
                />
                <span className="text-xl font-semibold">
                  {gps.latitude ? "GPS Connected" : "GPS Not Connected"}
                </span>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl shadow-md flex-1">
                <GPSData setGps={setGps} setUserId={setUserId} />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 shadow-md h-[400px]">
              {gps.latitude && gps.longitude ? (
                <Map latitude={gps.latitude} longitude={gps.longitude} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Waiting for GPS data...
                </div>
              )}
            </div>
          </section>
          <aside className="w-64 bg-gray-800 p-4 shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-2">Users</h2>
            {connectedUsers.map((user) => (
              <div
                key={user}
                onClick={() => setSelectedUser(user)}
                className={`cursor-pointer p-2 rounded-md hover:bg-gray-700 ${
                  selectedUser === user ? "bg-gray-700" : ""
                }`}
              >
                {user}
              </div>
            ))}
          </aside>
        </div>

        <footer className="bg-gray-800 p-4 shadow-inner">
          {selectedUser ? (
            <div>
              <h3 className="text-lg font-semibold">User Details</h3>
              <p>ID: {selectedUser}</p>
              <p>Status: Active</p>
              <p>
                Last Known Location: Lat {gps.latitude}, Lon {gps.longitude}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">Select a user to view details</p>
          )}
        </footer>
      </main>
    </div>
  );
};

export default Home;
