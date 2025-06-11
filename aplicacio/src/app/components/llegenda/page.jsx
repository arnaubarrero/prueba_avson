"use client";

import Image from "next/image";
import llegenda1 from "../../../../public/leyenda/llegenda1.png";
import llegenda2 from "../../../../public/leyenda/llegenda2.png";
import llegenda3 from "../../../../public/leyenda/llegenda3.png";

export default function Llegenda() {
    return (
        <div className="flex overflow-hidden text-blue-700 px-3 py-2 bg-white bg-opacity-90 rounded-lg shadow-lg lg:px-5">
            <div className="border-r-2 border-blue-800 font-bold flex justify-center items-center min-w-[60px] pr-2 lg:min-w-[90px] lg:pr-3">
                <span className="text-xs lg:text-sm">Leyenda</span>
            </div>
            <div className="px-2 py-1 space-y-1 lg:px-4 lg:py-2 lg:space-y-2">
                <div className="flex items-center gap-2">
                    <Image src={llegenda1} alt="Indicador Infraestructura 2" width={10} height={10} className="lg:w-3 lg:h-3" />
                    <span className="text-xs font-medium lg:text-sm">Infra 2</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src={llegenda2} alt="Indicador Infraestructura 1" width={10} height={10} className="lg:w-3 lg:h-3" />
                    <span className="text-xs font-medium lg:text-sm">Infra 1</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src={llegenda3} alt="Indicador Infraestructura 3" width={10} height={10} className="lg:w-3 lg:h-3" />
                    <span className="text-xs font-medium lg:text-sm">Infra 3</span>
                </div>
            </div>
        </div>
    );
}