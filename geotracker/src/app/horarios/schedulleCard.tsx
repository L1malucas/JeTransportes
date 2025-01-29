// components/schedules/SchedulesCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SchedulesRow } from "./schedulleRow";

interface ScheduleItem {
  cond?: string;
  estacao?: string;
}

interface SchedulesCardProps {
  title: string;
  scheduleData: ScheduleItem[];
}

export function SchedulesCard({ title, scheduleData }: SchedulesCardProps) {
  return (
    <Card className="border-2 border-gray-300">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-lg flex items-center justify-between text-gray-700 font-semibold">
          <span>{title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {scheduleData.map((item, idx) => (
            <SchedulesRow key={idx} cond={item.cond} estacao={item.estacao} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
