"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Menu from "./components/menu/page";
import Llegenda from "./components/llegenda/page";
import Cyberark from './components/cyberark/page';
import TotalAmenazas from './components/ciberamenazas/page';
import AmenazasAvanzadas from './components/amenazasAvanzadas/page';
import TraficoMalicioso from './components/traficoMalicioso/page';
import { getData } from "./plugins/communicationManager";

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

export default function Home() {
  const [hora, setHora] = useState('');
  const posicio = [37.985199, -1.125110];
  const [estatMenu, setEstatMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [mapKey, setMapKey] = useState(Date.now());
  const [createCustomIcon, setCreateCustomIcon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const components = [
    { component: AmenazasAvanzadas, key: 'amenazas' },
    { component: Cyberark, key: 'cyberark' },
    { component: TraficoMalicioso, key: 'trafico' },
    { component: TotalAmenazas, key: 'total' }
  ];

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

  const handleMenuChange = useCallback((isOpen) => {
    setEstatMenu(isOpen);
    console.log('Estado del menú:', isOpen);
  }, []);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % components.length;
    setCurrentIndex(newIndex);

    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount * newIndex,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? components.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);

    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount * newIndex,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);

    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount * index,
        behavior: 'smooth'
      });
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mapa */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {isClient && (
          <MapContainer
            key={mapKey}
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
          <Menu onMenuChange={handleMenuChange} />
        </div>

        {/* Componentes con scroll y mejor organización */}
        {estatMenu && (
          <div id='items' className="absolute inset-0 pt-[12vh] pb-4">

            {/* Layout móvil - Carrusel horizontal con botones */}
            <div className="md:hidden w-full h-full flex flex-col items-center justify-center relative">
              <div className="relative w-full flex-1 flex items-center">

                <button onClick={prevSlide} className="absolute left-2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 pointer-events-auto" >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <div ref={scrollContainerRef} className="w-full overflow-x-hidden overflow-y-hidden scroll-smooth" >
                  <div className="flex transition-transform duration-300 ease-in-out">
                    {components.map(({ component: Component, key }, index) => (
                      <div key={key} className="w-full flex-shrink-0 flex items-center justify-center p-4">
                        <Component />
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={nextSlide} className="absolute right-2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 pointer-events-auto" >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Layout desktop - Columnas como antes */}
            <div className="hidden md:block">
              {/* Contenedor izquierdo con scroll */}
              <div className="no-scrollbar absolute left-2 bottom-10 top-[20vh] w-[min(450px,45vw)] pointer-events-auto overflow-y-auto max-h-full">
                <div className="flex flex-col gap-3 p-2">
                  <AmenazasAvanzadas />
                  <Cyberark />
                </div>
              </div>

              {/* Contenedor derecho con scroll */}
              <div className="no-scrollbar absolute right-2 gap-10 top-[20vh] bottom-4 w-[min(450px,45vw)] pointer-events-auto overflow-y-auto">
                <div className="flex flex-col gap-3 p-2">
                  <TraficoMalicioso />
                  <TotalAmenazas />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <Llegenda />
        </div>
      </div>
    </div>
  );
}