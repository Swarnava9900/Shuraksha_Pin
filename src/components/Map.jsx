import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import process from "process";

const Map = ({ latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      center={{ lat: latitude, lng: longitude }}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default Map;
