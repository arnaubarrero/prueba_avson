"use client";

import Image from "next/image";
import llegenda1 from "../../../../public/leyenda/llegenda1.png";
import llegenda2 from "../../../../public/leyenda/llegenda2.png";
import llegenda3 from "../../../../public/leyenda/llegenda3.png";

export default function Llegenda() {
    return (
        <div className="fixed bottom-10 right-10 flex overflow-hidden text-blue-700 px-5">
            <div className="border-r-3 border-blue-800 font-bold flex justify-center items-center min-w-[90px]">
                Leyenda
            </div>
            <div className="px-4 py-2 space-y-2">
                <div className="flex items-center gap-2">
                    <Image src={llegenda1} alt="Indicador Infraestructura 2" width={12} height={12} />
                    <span className="text-sm font-medium">Infra 2</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src={llegenda2} alt="Indicador Infraestructura 1" width={12} height={12} />
                    <span className="text-sm font-medium">Infra 1</span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src={llegenda3} alt="Indicador Infraestructura 3" width={12} height={12} />
                    <span className="text-sm font-medium">Infra 3</span>
                </div>
            </div>
        </div>
    );
}