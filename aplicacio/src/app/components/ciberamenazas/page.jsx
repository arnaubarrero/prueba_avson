"use client";

import { useState, useEffect } from "react";
import { getData } from "../../plugins/communicationManager";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Ciberamenazas() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();

            const data = response.ciberamenazas.meses.map((mes, index) => ({
                mes,
                internas: response.ciberamenazas.internas[index],
                externas: response.ciberamenazas.externas[index],
            }));
            setChartData(data);
        };

        fetchData();
    }, []);

    if (chartData.length === 0) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="bg-blue-200/80 p-3 border-2 rounded-2xl border-[#4361ee] w-full max-w-full">
            <div className="flex flex-col gap-2 mb-3 lg:flex-row lg:justify-between lg:items-center">
                <div className="flex flex-wrap gap-1 text-sm">
                    <p>Ciberamenazas </p>
                    <p className="border-b-2 border-[#00E498]">internas </p>
                    <p>y </p>
                    <p className="border-b-2 border-[#70A6FE]">externas </p>
                </div>
                <div>
                    <p className="bg-[#E0F6FF] p-1 rounded-md text-xs lg:text-sm lg:p-2">Últimos 3 meses</p>
                </div>
            </div>

            <div className="h-[120px] lg:h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="internas" stroke="#00E498" strokeWidth={2} />
                        <Line type="monotone" dataKey="externas" stroke="#70A6FE" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}