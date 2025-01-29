// components/schedules/SchedulesRow.tsx
"use client";

import { getEstacaoColorClass, getRouteLabel } from "@/lib/colorMap";
import React from "react";

interface SchedulesRowProps {
  cond?: string; // horario col cond
  estacao?: string; // horario col estacao
}

export function SchedulesRow({ cond = "", estacao = "" }: SchedulesRowProps) {
  // cond sempre branco
  const condClass = "bg-white text-black border border-gray-300";

  // estacao com colorMap
  const estacaoColorClass = getEstacaoColorClass(estacao);

  // Montar o texto final da estacao, ex: "05:55 MATERIAL" ou "22:55 MC DONALD'S"
  let estacaoLabel = estacao || "";
  if (estacaoLabel) {
    estacaoLabel += " " + getRouteLabel(estacaoLabel, estacaoColorClass);
  }

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
      {/* COND: sempre branco */}
      <span className={`font-medium text-xl px-2 py-1 rounded ${condClass}`}>
        {cond || "--:--"}
      </span>

      {/* ESTAÇÃO: cor definida pelo colorMap */}
      <span
        className={`font-medium text-xl px-2 py-1 rounded ${estacaoColorClass}`}
      >
        {estacaoLabel.trim() || "—"}
      </span>
    </div>
  );
}
