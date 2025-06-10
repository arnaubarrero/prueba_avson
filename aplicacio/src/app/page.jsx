"use client";

import dynamic from 'next/dynamic';
import Menu from "./components/menu/page";
import { useState, useEffect } from 'react';
import Llegenda from "./components/llegenda/page";
import { getData } from "./plugins/communicationManager";

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
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setCategorias(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          />
        </MapContainer>
      </div>

      {/* Filtro azul */}
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="w-full h-full bg-blue-500 opacity-20"></div>
      </div>

      {/* Componentes flotantes */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <Menu />
        </div>
        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <Llegenda />
        </div>
      </div>
    </div>
  );
}
