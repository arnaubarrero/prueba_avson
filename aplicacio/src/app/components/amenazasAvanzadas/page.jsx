"use client";

import { useEffect, useState } from "react";
import { getData } from "../../plugins/communicationManager";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer,} from "recharts";

export default function AmenazasAvanzadas() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenazas = async () => {
      try {
        const response = await getData();
        const amenazas = response?.amenazasAvanzadas;

        if (!amenazas?.horas?.length || !amenazas.valores) {
          console.warn("No se encontraron datos válidos de amenazas avanzadas.");
          return;
        }

        const datosFormateados = amenazas.horas.map((hora, idx) => ({
          hora,
          "SQL injection": amenazas.valores["SQL injection"][idx],
          "XSS malware": amenazas.valores["XSS malware"][idx],
        }));

        setChartData(datosFormateados);
      } catch (error) {
        console.error("Error al cargar amenazas avanzadas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenazas();
  }, []);

  return (
    <div className="p-6 sm:py-3 sm:px-4 sm:w-full xl:max-w-full sm:max-w-[300px] bg-blue-200/80 border-2 rounded-2xl border-[#4361ee] flex flex-col">
      <h2 className="text-sm font-semibold text-[#003366] mb-2 lg:text-base">
        Amenazas Avanzadas
      </h2>

      <div className="flex gap-2 mb-3 text-xs font-medium lg:text-sm lg:gap-3">
        <span className="px-2 py-1 rounded-full text-blue-500">SQL Injection</span>
        <span className="px-2 py-1 rounded-full bg-[#008f39] text-white">XSS Malware</span>
      </div>

      <div className="w-full h-[180px] lg:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="100%">

            <PolarGrid stroke="#ffffff" />

            <PolarAngleAxis dataKey="hora" tick={{ fill: "#ffffff", fontSize: 10 }} />

            <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc", fontSize: "0.75rem", }} formatter={(valor) => [`${valor}`, "Amenazas"]} />

            <Radar name="SQL injection" dataKey="SQL injection" stroke="#2563eb" fill="#2563eb" fillOpacity={0.5} />

            <Radar name="XSS malware" dataKey="XSS malware" stroke="#ff3e3c" fill="none" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}