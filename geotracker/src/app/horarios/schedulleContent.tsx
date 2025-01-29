"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchedulesCard } from "./schedulleCard";
import { SchedulesLegend } from "./schedulleLegend";

// ====== Arrays de horários ======
const weekdaySchedule = [
  { cond: "05:00", estacao: "" },
  { cond: "05:40", estacao: "05:55" },
  { cond: "06:20", estacao: "06:35" },
  { cond: "07:00", estacao: "08:20" },
  { cond: "07:50", estacao: "09:05" },
  { cond: "08:45", estacao: "10:05" },
  { cond: "09:45", estacao: "11:05" },
  { cond: "10:45", estacao: "12:10" },
  { cond: "11:55", estacao: "12:55" },
  { cond: "12:40", estacao: "15:15" },
  { cond: "14:25", estacao: "16:15" },
  { cond: "15:45", estacao: "17:10" },
  { cond: "16:45", estacao: "18:15" },
  { cond: "17:40", estacao: "19:15" },
  { cond: "18:45", estacao: "20:25" },
  { cond: "20:05", estacao: "21:10" },
  { cond: "20:45", estacao: "22:10" },
  { cond: "21:45", estacao: "22:55" },
  { cond: "22:35", estacao: "22:55" },
];

const weekendSchedule = [
  { cond: "05:25", estacao: "06:15" },
  { cond: "07:00", estacao: "07:15" },
  { cond: "07:45", estacao: "08:05" },
  { cond: "08:45", estacao: "09:05" },
  { cond: "09:45", estacao: "10:05" },
  { cond: "10:45", estacao: "11:00" },
  { cond: "--:--", estacao: "17:05" }, // vermelha
  { cond: "17:45", estacao: "18:45" }, // amarela
  { cond: "19:45", estacao: "21:00" }, // amarela
  { cond: "21:20", estacao: "21:50" }, // amarela
];

const extraSchedule = [
  { cond: "06:00", estacao: "" },
  { cond: "06:40", estacao: "" },
  { cond: "07:25", estacao: "" },
  { cond: "--:--", estacao: "17:45" }, // vermelha
  { cond: "--:--", estacao: "18:45" }, // amarela
  { cond: "--:--", estacao: "19:45" }, // amarela
];

// ====== Componente Principal ======
export default function ScheduleContent() {
  return (
    <div className="px-4 pb-20 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">
        TABELA DE HORÁRIOS 2024
      </h1>

      <Tabs defaultValue="weekday" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger
            value="weekday"
            className="
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            SEGUNDA A SÁBADO
          </TabsTrigger>
          <TabsTrigger
            value="weekend"
            className="
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            DOMINGOS E FERIADOS
          </TabsTrigger>
          <TabsTrigger
            value="extra"
            className="
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            EXTRA (SEG - SEX)
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo: SEG-SAB */}
        <TabsContent value="weekday">
          <SchedulesCard title="SEG. A SÁB." scheduleData={weekdaySchedule} />
        </TabsContent>

        {/* Conteúdo: DOM-FER */}
        <TabsContent value="weekend">
          <SchedulesCard
            title="DOM. E FERIADOS"
            scheduleData={weekendSchedule}
          />
        </TabsContent>

        {/* Conteúdo: EXTRA */}
        <TabsContent value="extra">
          <SchedulesCard title="CARRO EXTRA" scheduleData={extraSchedule} />
        </TabsContent>
      </Tabs>

      {/* Legenda */}
      <SchedulesLegend />
    </div>
  );
}
