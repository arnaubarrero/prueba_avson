"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Menu from "./components/menu/page";
import Llegenda from "./components/llegenda/page";
import Cyberark from './components/cyberark/page';
import TotalAmenazas from './components/ciberamenazas/page';
import TraficoMalicioso from './components/traficoMalicioso/page';
import { getData } from "./plugins/communicationManager";

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

export default function Home() {
  const posicio = [37.985199, -1.125110];
  const [hora, setHora] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [createCustomIcon, setCreateCustomIcon] = useState(null);
  const [mapKey, setMapKey] = useState(Date.now());

  const getColorClass = (estado) => {
    switch (estado) {
      case 'alerta':
        return { clases: 'border-yellow-300 bg-yellow-100 text-yellow-700', imgSrc: '/vectoresMapa/groc.png' };
      case 'riesgo':
        return { clases: 'border-red-300 bg-red-100 text-red-700', imgSrc: '/vectoresMapa/tronja.png' };
      case 'normal':
        return { clases: 'border-green-300 bg-green-50 text-green-700', imgSrc: '/vectoresMapa/verd.png' };
      default:
        return {};
    }
  };

  useEffect(() => {
    setIsClient(true);

    return () => {
      const leafletContainers = document.getElementsByClassName('leaflet-container');
      if (leafletContainers.length > 0) {
        for (const el of leafletContainers) {
          el.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      setHora(ahora.toLocaleTimeString());
    };
    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setCategorias(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      setCreateCustomIcon(() => (infra) => {
        const { clases, imgSrc } = getColorClass(infra.estado);
        return L.divIcon({
          className: '',
          html: `
            <div class="p-1 z-30 rounded-xl border shadow-md text-sm font-medium bg-opacity-20 ${clases}">
              <div class="items-center flex gap-2 text-center">
                <img src="${imgSrc}" class="h-[20px] mx-auto mb-1" alt="icono estado" />
                <div>
                  <img src="/logo.svg" alt="Logo" class="h-[15px]" />
                  ${infra.nombre}
                </div>
              </div>
            </div>
            <div class="h-[30px] w-[3px] m-auto bg-black "></div>
            <div class="h-3 w-3 bg-black rounded-full m-auto"></div>
          `,
          iconSize: [150, 40],
          iconAnchor: [75, 73],
        });
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Mapa */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {isClient && (
          <MapContainer
            key={mapKey}
            center={posicio}
            zoom={11}
            zoomControl={false}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />
            {categorias?.infraestructuras?.map((infra) =>
              createCustomIcon ? (
                <Marker
                  key={infra.id}
                  position={[infra.lat, infra.lng]}
                  icon={createCustomIcon(infra)}
                />
              ) : null
            )}
          </MapContainer>
        )}
      </div>

      {/* Filtro azul */}
      <div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="w-full h-full bg-blue-500 opacity-20"></div>
      </div>

      <div className="fixed inset-0 z-20 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <Menu />
        </div>

        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <Llegenda />
        </div>

        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <Cyberark />
        </div>

        <div className="absolute right-25 top-25 pointer-events-auto flex flex-col items-end gap-4">
          <TraficoMalicioso />
          <TotalAmenazas />
        </div>
      </div>

    </div>
  );
}
