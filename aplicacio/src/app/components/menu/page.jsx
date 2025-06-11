"use client"

import Image from "next/image";
import { Menu as IconaMenu } from 'lucide-react';
import logo from "../../../../public/logo.svg";
import { useState, useEffect } from 'react';

export default function Menu() {
    const [hora, setHora] = useState('');

    useEffect(() => {
        const actualizarHora = () => {
            const ahora = new Date();
            const horaFormateada = ahora.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setHora(horaFormateada);
        };

        actualizarHora();
        const intervalo = setInterval(actualizarHora, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="flex items-center h-25 ">
            {/* Logo */}
            <div className="w-1/3">
                <Image className="h-[70px] w-[70px] ml-[25%]" priority src={logo} alt="El nostre logo" />
            </div>

            {/* Filtres */}
            <div className="w-1/3 flex flex-col items-center text-blue-800">
                <h3 className="font-Outfit text-2xl font-bold mb-1">Filtrar infraestructuras</h3>
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="infra" id="infra1" className="h-4 w-4" />
                        <label htmlFor="infra1" className="text-xl cursor-pointer">Infra 1</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="radio" name="infra" id="infra2" className="h-4 w-4" />
                        <label htmlFor="infra2" className="text-xl cursor-pointer">Infra 2</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="radio" name="infra" id="infra3" className="h-4 w-4" />
                        <label htmlFor="infra3" className="text-xl cursor-pointer">Infra 3</label>
                    </div>
                </div>
            </div>

            {/* Hora e icona del menu */}
            <div className="w-1/3 flex justify-center items-center pr-3 gap-6">
                <span className="text-2xl">{hora}</span>
                <div className="cursor-pointer p-2 bg-[#E8F9FF] rounded-full">
                    <IconaMenu className="text-[#003B99]" />
                </div>
            </div>
        </div>
    );
}