"use client";

import { useState, useEffect } from "react";
import { getData } from "../../plugins/communicationManager";
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
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
                const amenazas = response?.amenazasAvanzadas;

                if (!amenazas) {
                    console.error("No se encontraron datos de 'amenazasAvanzadas'", response);
                    setChartData([]);
                    setLoading(false);
                    return;
                }

                const formattedData = amenazas.horas.map((hora, i) => ({
                    hora,
                    "SQL injection": amenazas.valores["SQL injection"][i],
                    "XSS malware": amenazas.valores["XSS malware"][i],
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                setChartData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-blue-900">Cargando datos...</p>;
    }

    if (chartData.length === 0) {
        return <p className="text-red-600">No hay datos disponibles para mostrar.</p>;
    }

    return (
        <div className="bg-blue-200 bg-opacity-20 p-4 border-2 rounded-2xl border-[#4361ee] w-[450px]">
            <h2 className="text-lg font-semibold mb-2 text-[#003366]">Amenazas Avanzadas</h2>

            <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="hora" />
                    <PolarRadiusAxis angle={30} domain={[0, Math.max(...chartData.flatMap(d => [d["SQL injection"], d["XSS malware"]])) + 2]} />
                    <Tooltip />
                    <Radar
                        name="SQL injection"
                        dataKey="SQL injection"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                    <Radar
                        name="XSS malware"
                        dataKey="XSS malware"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
