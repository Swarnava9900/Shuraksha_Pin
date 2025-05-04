/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import axios from "axios";

const GPSData = ({
  setGps,
  setUserId,
  setConnectedUsers,
  ipAddress,
  setStatus,
}) => {
  const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = ipAddress.startsWith("http")
          ? `${ipAddress}/data`
          : `http://${ipAddress}/data`;

        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          setStatus("empty");
          return;
        }

        // Updated key references (assuming your JSON format)
        const validEntries = data.filter((entry) => entry && entry.unique_id);

        if (validEntries.length === 0) {
          setStatus("empty");
          return;
        }

        const lastEntry = validEntries[validEntries.length - 1];
        setUserId(lastEntry.unique_id);

        const lat = lastEntry.latitude;
        const lon = lastEntry.longitude;

        if (isNumeric(lat) && isNumeric(lon)) {
          setGps({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        } else if (
          lat === "No Fix" ||
          lon === "No Fix" ||
          !lat ||
          !lon
        ) {
          setGps({ latitude: "No Fix", longitude: "No Fix" });
        } else {
          setGps({ latitude: null, longitude: null });
        }

        const uniqueUserIds = [
          ...new Set(validEntries.map((entry) => entry.unique_id)),
        ];
        setConnectedUsers(uniqueUserIds);

        setStatus("operational");
      } catch (error) {
        console.error("Failed to fetch GPS data:", error);
        setStatus("down");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [ipAddress]);

  return null;
};

export default GPSData;
