"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { X as CrossIcon, Menu as IconaMenu } from 'lucide-react';
import logo from "../../../../public/logo.svg";

export default function Menu({ onMenuChange }) {
    const [hora, setHora] = useState('');
    const [menuObert, setMenuObert] = useState(true);

    useEffect(() => {
        const estadoGuardado = localStorage.getItem("estadoMenu");
        if (estadoGuardado !== null) {
            const estadoBoolean = estadoGuardado === "true";
            setMenuObert(estadoBoolean);
            // Notificar al componente padre del estado inicial
            if (onMenuChange) {
                onMenuChange(estadoBoolean);
            }
        } else {
            localStorage.setItem("estadoMenu", "true");
            if (onMenuChange) {
                onMenuChange(true);
            }
        }
    }, [onMenuChange]);

    useEffect(() => {
        localStorage.setItem("estadoMenu", menuObert.toString());
        // Notificar al componente padre cada vez que cambie el estado
        if (onMenuChange) {
            onMenuChange(menuObert);
        }
    }, [menuObert, onMenuChange]);

    useEffect(() => { // Hora
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
        <div className="flex items-center h-[10vh]">
            <div className="w-1/3">
                <Image className="h-[70px] w-[70px] ml-[25%]" priority src={logo} alt="El nostre logo" />
            </div>

            {/* Filtros */}
            <div className="w-1/3 flex flex-col items-center text-blue-800">
                <h3 className="font-Outfit text-2xl font-bold mb-1">Filtrar infraestructuras</h3>
                <div className="flex flex-col gap-8 md:flex-row">
                    {["Infra 1", "Infra 2", "Infra 3"].map((infra, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input type="radio" name="infra" id={`infra${index + 1}`} className="h-4 w-4" />
                            <label htmlFor={`infra${index + 1}`} className="text-xl cursor-pointer">{infra}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hora e icono del menú */}
            <div className="w-1/3 flex justify-center items-center pr-3 gap-6">
                <span className="text-2xl">{hora}</span>

                <div onClick={toggleMenu} className={`cursor-pointer p-2 rounded-full bg-[#E8F9FF] `} >
                    {menuObert ? (
                        <CrossIcon className="text-red-500" />
                    ) : (
                        <IconaMenu className="text-[#003B99]" />
                    )}
                </div>
            </div>
        </div>
    );
}