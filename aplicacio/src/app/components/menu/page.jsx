"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import logo from "../../../../public/logo.svg";
import { X as CrossIcon, Menu as IconaMenu } from 'lucide-react';

export default function Menu({ onMenuChange }) {
    const [hora, setHora] = useState('');
    const [menuObert, setMenuObert] = useState(true);

    useEffect(() => {
        const estadoGuardado = localStorage.getItem("estatMenu");
        if (estadoGuardado !== null) {
            const estadoBoolean = estadoGuardado === "true";
            setMenuObert(estadoBoolean);
            if (onMenuChange) {
                onMenuChange(estadoBoolean);
            }
        } else {
            localStorage.setItem("estatMenu", "true");
            if (onMenuChange) {
                onMenuChange(true);
            }
        }
    }, [onMenuChange]);

    useEffect(() => {
        localStorage.setItem("estatMenu", menuObert.toString());
        if (onMenuChange) {
            onMenuChange(menuObert);
        }
    }, [menuObert, onMenuChange]);

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

    const toggleMenu = () => {
        setMenuObert((prev) => !prev);
    };

    return (
        <div className="flex items-center h-[10vh] min-h-[80px] px-2">
            <div className="w-1/3 flex justify-center lg:justify-start lg:ml-[10%]">
                <Image className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]" priority src={logo} alt="El nostre logo" />
            </div>

            <div className="w-1/3 flex flex-col items-center text-blue-800">
                <h3 className="font-Outfit text-lg font-thin mb-1 lg:text-2xl">
                    Filtrar infraestructuras
                </h3>

                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 lg:gap-8">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="infra" id="infra1" className="h-3 w-3 lg:h-4 lg:w-4" />
                        <label htmlFor="infra1" className="text-sm cursor-pointer lg:text-xl">Infra 1</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="radio" name="infra" id="infra2" className="h-3 w-3 lg:h-4 lg:w-4" />
                        <label htmlFor="infra2" className="text-sm cursor-pointer lg:text-xl">Infra 2</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="radio" name="infra" id="infra3" className="h-3 w-3 lg:h-4 lg:w-4" />
                        <label htmlFor="infra3" className="text-sm cursor-pointer lg:text-xl">Infra 3</label>
                    </div>
                </div>
            </div>

            {/* Hora i menu */}
            <div className="w-1/3 flex justify-center items-center gap-3 lg:gap-6">
                <span className="text-lg lg:text-2xl">{hora}</span>

                <div onClick={toggleMenu} className="cursor-pointer p-2 rounded-full bg-[#E8F9FF]">
                    {menuObert ? (
                        <CrossIcon className="text-red-500" size={20} />
                    ) : (
                        <IconaMenu className="text-[#003B99]" size={20} />
                    )}
                </div>
            </div>
        </div>
    );
}