import React, { useState, useEffect } from "react";
import axios from "axios";

const GPSData = ({
  setGps,
  setUserId,
  ipAddress,
  setConnectedUsers,
  setStatus,
}) => {
  const [gpsData, setGpsData] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const fetchGPS = async () => {
      try {
        const res = await axios.get(`http://${ipAddress}/data`);
        const packets = res.data;

        if (Array.isArray(packets) && packets.length > 0) {
          const validPackets = packets.filter(
            (p) =>
              p &&
              typeof p.latitude === "string" &&
              typeof p.longitude === "string" &&
              !isNaN(parseFloat(p.latitude)) &&
              !isNaN(parseFloat(p.longitude)) &&
              typeof p.unique_id === "string"
          );

          if (validPackets.length > 0) {
            const latest = validPackets[validPackets.length - 1];
            const { latitude, longitude, unique_id } = latest;

            setGpsData({ latitude, longitude });
            setGps({
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            });
            setUserId(unique_id);

            const ids = [...new Set(validPackets.map((p) => p.unique_id))];
            setConnectedUsers(ids);

            setStatus("operational");
          } else {
            console.warn("Dropped invalid packets:", packets);
            setStatus("empty");
          }
        } else {
          setStatus("empty");
        }
      } catch (error) {
        setGpsData({ error: "❌ Unable to fetch data" });
        console.log(error);
        setUserId(null);
        setConnectedUsers([]);

        // Set status to down if unable to fetch data
        setStatus("down");
      }
    };

    fetchGPS();
    const interval = setInterval(fetchGPS, 5000);
    return () => clearInterval(interval);
  }, [setGps, setUserId, ipAddress, setConnectedUsers, setStatus]);

  return (
    <div>
      <h2 className="text-xl font-bold">GPS Data</h2>
      {gpsData.error ? (
        <p className="text-red-400">{gpsData.error}</p>
      ) : (
        <div>
          <p>Latitude: {gpsData.latitude || "..."}</p>
          <p>Longitude: {gpsData.longitude || "..."}</p>
        </div>
      )}
    </div>
  );
};

export default GPSData;
