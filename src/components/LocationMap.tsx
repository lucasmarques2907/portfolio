"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationMap() {
  const LATITUDE = -26.3125;
  const LONGITUDE = -48.8434;

  return (
    <MapContainer
      center={[LATITUDE, LONGITUDE]}
      zoom={11}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      className='bg-surface0 h-full w-full z-0'
    >
      <TileLayer
        url={`https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_CARTO_KEY}`}
      />
    </MapContainer>
  );
}
