import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [ip, setIp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIp = localStorage.getItem("esp32_ip");
    if (storedIp) setIp(storedIp);
  }, []);

  const handleSave = () => {
    localStorage.setItem("esp32_ip", ip);
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "Verdana, sans-serif" }} className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border-1">
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <label className="block text-gray-700 text-lg">
          Set Reciever Staion IP Address
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="e.g. 192.168.0.1"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-300 transition duration-300 w-full"
        >
          Save & Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
