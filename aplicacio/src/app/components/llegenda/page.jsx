"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import llegenda1 from "../../../../public/leyenda/llegenda1.png";
import llegenda2 from "../../../../public/leyenda/llegenda2.png";
import llegenda3 from "../../../../public/leyenda/llegenda3.png";

export default function Llegenda() {
    const [visible, setVisible] = useState(true);

    return (
        <>
            {visible && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/70 sm:left-auto sm:right-10 sm:translate-x-0 sm:bg-transparent rounded-xl flex overflow-hidden text-blue-700 px-5 py-2 w-fit whitespace-nowrap z-50">
                    <div className="border-r-3 border-blue-800 font-bold flex justify-center items-center min-w-[90px]">
                        Leyenda
                    </div>
                    <div className="px-4 py-2 space-y-2">
                        <div className="flex items-center gap-2">
                            <Image src={llegenda1} alt="Infra 2" width={12} height={12} />
                            <span className="text-sm font-medium">Infra 2</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={llegenda2} alt="Infra 1" width={12} height={12} />
                            <span className="text-sm font-medium">Infra 1</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src={llegenda3} alt="Infra 3" width={12} height={12} />
                            <span className="text-sm font-medium">Infra 3</span>
                        </div>
                    </div>
                </div>
            )}

            {/* mostrar/ocultar */}
            <button onClick={() => setVisible(!visible)} className="fixed bottom-4 right-4 flex items-center gap-1 text-black p-2 cursor-pointer z-50"
            aria-label="Mostrar/Ocultar leyenda" >
                <p className="text-sm font-medium">Leyenda</p>
                {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

        </>
    );
}
