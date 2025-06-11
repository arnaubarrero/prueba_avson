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
        <div className="bg-blue-200 bg-opacity-20 border-2 rounded-2xl border-[#4361ee] w-[450px] max-h-[45vh] p-3 flex flex-col justify-between">
            <h2 className="text-base font-semibold text-[#003366] text-xl font-thin p-3 mb-2">
                Cyberark-PSM
            </h2>

            {/* Establecemos una altura fija para que el gráfico se muestre */}
            <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid stroke="#ffffff" strokeDasharray="0" horizontal vertical />
                        <XAxis
                            dataKey="dia"
                            angle={-45}
                            textAnchor="end"
                            height={40}
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Bar dataKey="sesiones" fill="#4da6ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {info && (
                <div className="bg-blue-100 bg-opacity-30 mt-2 p-2 rounded-md text-xs text-[#003366] flex justify-center items-center gap-4 h-[100px]">
                    <div className="flex items-center justify-center border-r-2 pr-3 h-full">
                        <div className="origin-center font-thin text-xl tracking-tight">
                            Conexiones
                        </div>
                    </div>

                    {/* Info a la derecha */}
                    <div className="flex flex-col gap-1 leading-snug">
                        <p>
                            Realizadas (sesiones PSM):{" "}
                            <span className="font-bold">{info.sesiones}</span>
                        </p>
                        <p>
                            No Securizadas:{" "}
                            <span className="font-bold">
                                {String(info.noAutorizadas).padStart(3, "0")}
                            </span>
                        </p>
                        <p>
                            Legítimas / Temporales:{" "}
                            <span className="font-bold">{info.temporalidades}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
