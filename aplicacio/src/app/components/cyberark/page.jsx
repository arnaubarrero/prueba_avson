"use client";

import { useState, useEffect } from "react";
import { getData } from "../../plugins/communicationManager";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function Ciberamenazas() {
    const [chartData, setChartData] = useState([]);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            const cyberark = response.cyberark;

            const formattedData = cyberark.dias.map((dia, index) => ({
                dia,
                sesiones: cyberark.conexiones[index],
            }));

            setChartData(formattedData);
            setInfo({
                sesiones: cyberark.sesiones,
                noAutorizadas: cyberark.noAutorizadas,
                temporalidades: cyberark.temporalidades,
            });
        };

        fetchData();
    }, []);

    return (
        <div className="bg-blue-200 bg-opacity-20 border-2 rounded-2xl border-[#4361ee] w-full max-w-full p-3 flex flex-col">
            <h2 className="text-sm font-semibold text-[#003366] mb-2 lg:text-base">
                Cyberark-PSM
            </h2>

            <div className="h-[100px] w-full mb-2 lg:h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid stroke="#ffffff" strokeDasharray="0" horizontal vertical />
                        <XAxis
                            dataKey="dia"
                            angle={-45}
                            textAnchor="end"
                            height={30}
                            tick={{ fontSize: 9 }}
                        />
                        <YAxis tick={{ fontSize: 9 }} />
                        <Tooltip />
                        <Bar dataKey="sesiones" fill="#4da6ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {info && (
                <div className="bg-blue-100 bg-opacity-30 p-2 rounded-md text-xs text-[#003366] flex items-center gap-2">
                    <div className="flex items-center justify-center border-r-2 pr-2 min-w-[60px]">
                        <div className="font-thin text-sm tracking-tight">
                            Conexiones
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 leading-tight text-xs">
                        <p>
                            Realizadas: <span className="font-bold">{info.sesiones}</span>
                        </p>
                        <p>
                            No Securizadas: <span className="font-bold">{String(info.noAutorizadas).padStart(3, "0")}</span>
                        </p>
                        <p>
                            Legítimas/Temporales: <span className="font-bold">{info.temporalidades}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}