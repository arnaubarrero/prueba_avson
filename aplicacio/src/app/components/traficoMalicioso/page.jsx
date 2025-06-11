"use client";

import { useState, useEffect } from "react";
import { TriangleAlert } from 'lucide-react';
import { getData } from "../../plugins/communicationManager";

export default function TraficoMalicioso() {
    const [chartData, setChartData] = useState(null);
    const riesgo = chartData?.traficoBloqueado?.riesgo ?? 0;
    const mensaje = chartData?.traficoBloqueado?.mensaje ?? "";
    const fuente = chartData?.traficoBloqueado?.fuente ?? "";

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            console.log(response);
            setChartData(response);
        };

        fetchData();
    }, []);

    return (
        <div className="bg-blue-200 bg-opacity-20 p-4 border-2 rounded-2xl border-[#BDD8ECB2] w-[450px] mb-10" style={{ filter: "drop-shadow(0 0 5px #FF6F6F)" }}>
            {/* Header de la tarjeta */}
            <div className="flex gap-4 items-center">
                <button
                    className="flex items-center text-xs bg-[#FF6F6F] text-white py-2 px-3 rounded-full gap-1"
                    style={{ filter: "drop-shadow(0 0 5px #FF6F6F)" }}
                >
                    <TriangleAlert />
                    Nueva Amenaza
                </button>

                <div>
                    <p className="text-blue-500">Tráfico malicioso externo intensivo.</p>
                    <p className="text-[#FF6F6F] font-semibold">{riesgo}/100</p>
                </div>

                {riesgo >= 50 && (
                    <div className="h-5 w-5 bg-red-500 rounded-full absolute right-2 top-2" style={{ filter: "drop-shadow(0 0 5px #FF6F6F)" }}></div>
                )}
            </div>

            {/* Informació detallada */}
            <div className="flex p-3 gap-4">
                {/* Texto a la izquierda */}
                <div className="w-1/2 py-4 px-3 bg-blue-300 rounded-xl flex flex-col justify-between">
                    <p className="text-blue-800 text-xl font-semibold">{mensaje}</p>
                    <p className="font-extrabold text-sm mt-2">{fuente}</p>
                </div>

                {/* Imagen a la derecha, alineada abajo */}
                <div className="w-1/2 flex items-end justify-center">
                    <img src="/amenazas/image.png" alt="Velocímetro" className="max-h-32 object-contain" />
                </div>
            </div>
        </div>
    );
}