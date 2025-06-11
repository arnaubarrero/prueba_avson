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
        <div className="bg-blue-200/90 p-3 border-2 rounded-2xl border-[#4361ee] w-full max-w-full relative" style={{ filter: "drop-shadow(0 0 5pxrgb(255, 197, 197))" }}>
            {/* Header de la tarjeta */}
            <div className="flex gap-3 items-center mb-3">
                <button
                    className="flex items-center text-xs bg-[#FF6F6F] text-white py-1 px-2 rounded-full gap-1 shrink-0"
                    style={{ filter: "drop-shadow(0 0 5px #FF6F6F)" }}
                >
                    <TriangleAlert size={12} />
                    Nueva Amenaza
                </button>

                <div className="flex-1 min-w-0">
                    <p className="text-blue-500 text-xs lg:text-sm">Tráfico malicioso externo intensivo.</p>
                    <p className="text-[#FF6F6F] font-semibold text-sm">{riesgo}/100</p>
                </div>

                {riesgo >= 50 && (
                    <div className="h-3 w-3 bg-red-500 rounded-full shrink-0" style={{ filter: "drop-shadow(0 0 5px #FF6F6F)" }}></div>
                )}
            </div>

            {/* Información detallada */}
            <div className="flex gap-3">
                <div className="flex-1 py-3 px-2 bg-blue-300 rounded-xl flex flex-col justify-between">
                    <p className="text-blue-800 text-sm font-semibold lg:text-base">{mensaje}</p>
                    <p className="font-extrabold text-xs mt-1 lg:text-sm">{fuente}</p>
                </div>

                <div className="w-20 flex items-end justify-center lg:w-24">
                    <img src="/amenazas/image.png" alt="Velocímetro" className="max-h-16 object-contain lg:max-h-20" />
                </div>
            </div>
        </div>
    );
}