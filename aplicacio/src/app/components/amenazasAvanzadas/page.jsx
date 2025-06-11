"use client";

import { useEffect, useState } from "react";
import { getData } from "../../plugins/communicationManager";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AmenazasAvanzadas() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        const data = response?.amenazasAvanzadas;

        if (!data?.horas?.length || !data.valores) {
          console.error("Datos de 'amenazasAvanzadas' incompletos o inexistentes", response);
          return;
        }

        const formatted = data.horas.map((hora, i) => ({
          hora,
          "SQL injection": data.valores["SQL injection"][i],
          "XSS malware": data.valores["XSS malware"][i],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("Error al obtener los datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-blue-900 text-center">Cargando amenazas...</p>;
  }

  if (!chartData.length) {
    return <p className="text-red-600 text-center">No hay datos disponibles.</p>;
  }

  return (
    <div className="max-w-[450px] max-h-[45vh] bg-blue-200 bg-opacity-20 py-4 px-8 border-2 rounded-2xl border-[#4361ee] mx-auto flex flex-col">
      <h2 className="text-base font-semibold text-[#003366] text-xl font-thin mb-2">
        Amenazas Avanzadas
      </h2>

      <div className="flex justify-center gap-3 mb-4 text-sm font-medium shrink-0">
        <span className="px-3 py-1 rounded-full text-blue-500">SQL Injection</span>
        <span className="px-3 py-1 rounded-full bg-[#008f39] text-white">XSS Malware</span>
      </div>

      <div className="w-full" style={{ height: "25vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke="#ffffff" />
            <PolarAngleAxis dataKey="hora" tick={{ fill: "#ffffff", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
                fontSize: "0.85rem",
              }}
              formatter={(value) => [`${value}`, "Amenazas"]}
            />
            <Radar
              name="SQL injection"
              dataKey="SQL injection"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.5}
            />
            <Radar
              name="XSS malware"
              dataKey="XSS malware"
              stroke="#ff3e3c"
              fill="none"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
