"use client";

import { useState, useEffect } from "react";
import { getData } from "../../plugins/communicationManager";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Ciberamenazas() {
    const [chartData, setChartData] = useState([]);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            const cyberark = response.cyberark;

            const formattedData = cyberark.dias.map((dia, index) => ({
                dia,
                sesiones: cyberark.conexiones[index]
            }));

            setChartData(formattedData);
            setInfo({
                sesiones: cyberark.sesiones,
                noAutorizadas: cyberark.noAutorizadas,
                temporalidades: cyberark.temporalidades
            });
        };

        fetchData();
    }, []);

    return (
        <div className="bg-blue-200 bg-opacity-20 p-4 border-2 rounded-2xl border-[#4361ee] w-[450px]">
            <h2 className="text-lg font-semibold mb-2 text-[#003366]">Cyberark-PSM</h2>

            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Bar dataKey="sesiones" fill="#4da6ff" radius={[4, 4, 0, 0]} />
                    <XAxis dataKey="dia" angle={-45} textAnchor="end" height={50} />
                </BarChart>
            </ResponsiveContainer>

            {info && (
                <div className="bg-blue-300 bg-opacity-30 p-2 mt-4 rounded-md text-sm text-[#003366] flex gap-3">
                    <div className="border-r-2 pr-2">
                        <p><strong>Conexiones</strong></p>
                    </div>
                    <div>
                        <p>Realizadas (sesiones PSM): <strong>{info.sesiones}</strong></p>
                        <p>No Securizadas: <strong>{String(info.noAutorizadas).padStart(3, "0")}</strong></p>
                        <p>Legítimas / Temporales: <strong>{info.temporalidades}</strong></p>
                    </div>
                </div>
            )}
        </div>
    );
}
