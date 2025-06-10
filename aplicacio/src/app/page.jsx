"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Menu from "./components/menu/page";
import Llegenda from "./components/llegenda/page";

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

export default function Home() {
  const posicio = [37.985199, -1.125110];
  const [hora, setHora] = useState('');

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const horaFormateada = ahora.toLocaleTimeString();
      setHora(horaFormateada);
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Full-screen map (client-side only) */}
      <div className="w-full h-full fixed top-0 left-0 z-0">
        <MapContainer center={posicio} zoom={15} style={{ width: '100%', height: '100%' }} scrollWheelZoom={false} >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>' />
        </MapContainer>
      </div>

      {/* Your content (above the map) */}
      <div className="relative z-10">
        <Menu />
      </div>

      < Llegenda />
    </div>
  );
}