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
      {/* Mapa */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <MapContainer
          center={posicio}
          zoom={10}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />
        </MapContainer>
      </div>

      {/* Filtro azul encima del mapa */}
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="w-full h-full bg-blue-500 opacity-20"></div>
      </div>

      {/* Componentes por encima de todo */}
      <div className="fixed top-0 left-0 w-full h-full z-20">
        <Menu />
        <Llegenda />
      </div>
    </div>
  );
}