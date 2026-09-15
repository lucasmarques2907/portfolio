"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "./theme/ThemeProvider";

const LATITUDE = -26.3125;
const LONGITUDE = -48.8434;

const KEY = process.env.NEXT_PUBLIC_CARTO_KEY;
const tiles = (style: "light_all" | "dark_all") =>
  `https://basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png?key=${KEY}`;

export default function LocationMap() {
  const {flavor} = useTheme();
  const light = flavor === "latte";

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
      <TileLayer url={tiles("dark_all")} opacity={light ? 0 : 1} zIndex={1} />
      <TileLayer url={tiles("light_all")} opacity={light ? 1 : 0} zIndex={2} />
    </MapContainer>
  );
}
