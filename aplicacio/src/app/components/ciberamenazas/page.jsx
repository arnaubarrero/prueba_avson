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
        <div className="bg-blue-200 bg-opacity-20 p-4 border-2 rounded-2xl border-[#4361ee] w-[450px]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                    <p>Ciberamenazas </p>
                    <p className="border-b-4 border-[#00E498]">internas </p>
                    <p>y </p>
                    <p className="border-b-4 border-[#70A6FE]">externas </p>
                </div>
                <div>
                    <p className="bg-[#E0F6FF] p-2 rounded-md">Últimos 3 meses</p>
                </div>
            </div>

            <ResponsiveContainer width="90%" height={150}>
                <LineChart data={chartData}>
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="internas" stroke="#00E498" strokeWidth={3} />
                    <Line type="monotone" dataKey="externas" stroke="#70A6FE" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
