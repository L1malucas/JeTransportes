// components/schedules/SchedulesLegend.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SchedulesLegend() {
  return (
    <Card className="mt-4 border-2 border-gray-300">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-base text-gray-700 font-semibold">
          LEGENDA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-medium">COND:</span>
            <span>Saída do COND PSB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">ESTAÇÃO:</span>
            <span>Volta para o COND PSB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              AZUL
            </span>
            <span>MATERIAL para PSB (Via Estrada do Trabalhador)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
              VERMELHO
            </span>
            <span>
              MATERIAL para PSB (Via Estrada do Coco)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
              AMARELO
            </span>
            <span>MC DONALDS para PSB (Via Rua do Canal)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white text-black px-2 py-1 rounded text-xs border border-gray-300">
              BRANCO
            </span>
            <span>PSB até Material de Construção</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
