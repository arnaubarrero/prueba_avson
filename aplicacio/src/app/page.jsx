"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import Menu from "./components/menu/page"

export default function Home() {
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
    <div className="bg-white w-[100vw] h-[100vh] border border-white">

      < Menu />

    </div>
  );
}
