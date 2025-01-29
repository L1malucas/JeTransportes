import React from "react";
import { Clock, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScheduleContent() {
  // Enum for route types
  const RouteType = {
    MATERIAL_COCO: "MATERIAL_COCO", // Via Estrada do Coco
    MATERIAL_TRABALHADOR: "MATERIAL_TRABALHADOR", // Via Estrada do Trabalhador
    MC_DONALDS: "MC_DONALDS", // Via Rua do Canal
  };

  const weekdaySchedule = [
    { cond: "05:00", estacao: "05:55", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "05:40", estacao: "06:35", tipo: RouteType.MATERIAL_COCO },
    { cond: "06:20", estacao: "07:15", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "07:00", estacao: "08:20", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "07:50", estacao: "09:05", tipo: RouteType.MATERIAL_COCO },
    { cond: "08:45", estacao: "10:05", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "09:45", estacao: "11:05", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "10:45", estacao: "12:10", tipo: RouteType.MATERIAL_COCO },
    { cond: "11:55", estacao: "12:55", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "12:40", estacao: "15:15", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "14:25", estacao: "16:15", tipo: RouteType.MATERIAL_COCO },
    { cond: "15:45", estacao: "17:10", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "16:45", estacao: "18:15", tipo: RouteType.MC_DONALDS },
    { cond: "17:40", estacao: "19:15", tipo: RouteType.MC_DONALDS },
    { cond: "18:45", estacao: "20:25", tipo: RouteType.MC_DONALDS },
    { cond: "20:05", estacao: "21:10", tipo: RouteType.MC_DONALDS },
    { cond: "20:45", estacao: "22:10", tipo: RouteType.MC_DONALDS },
    { cond: "21:45", estacao: "22:55", tipo: RouteType.MC_DONALDS },
  ];

  const weekendSchedule = [
    { cond: "05:25", estacao: "06:15", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "07:00", estacao: "07:15", tipo: RouteType.MATERIAL_COCO },
    { cond: "07:45", estacao: "08:05", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "08:45", estacao: "09:05", tipo: RouteType.MATERIAL_COCO },
    { cond: "09:45", estacao: "10:05", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "10:45", estacao: "11:00", tipo: RouteType.MATERIAL_TRABALHADOR },
    { cond: "17:05", estacao: "17:45", tipo: RouteType.MATERIAL_COCO },
    { cond: "17:45", estacao: "18:45", tipo: RouteType.MC_DONALDS },
    { cond: "19:45", estacao: "21:00", tipo: RouteType.MC_DONALDS },
    { cond: "21:20", estacao: "21:50", tipo: RouteType.MC_DONALDS },
  ];

  const extraSchedule = [
    {
      cond: "06:00",
      estacao: "VIA ESTAÇÃO",
      tipo: RouteType.MATERIAL_TRABALHADOR,
    },
    { cond: "06:40", estacao: "VIA ESTAÇÃO", tipo: RouteType.MATERIAL_COCO },
    {
      cond: "07:25",
      estacao: "VIA ESTAÇÃO",
      tipo: RouteType.MATERIAL_TRABALHADOR,
    },
    { cond: "17:45", estacao: "", tipo: RouteType.MATERIAL_COCO },
    { cond: "18:45", estacao: "", tipo: RouteType.MC_DONALDS },
    { cond: "19:45", estacao: "", tipo: RouteType.MC_DONALDS },
  ];

  const getRouteStyle = (tipo: string) => {
    switch (tipo) {
      case RouteType.MATERIAL_COCO:
        return "bg-red-500 text-white";
      case RouteType.MATERIAL_TRABALHADOR:
        return "bg-blue-500 text-white";
      case RouteType.MC_DONALDS:
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getRouteText = (tipo: string) => {
    switch (tipo) {
      case RouteType.MATERIAL_COCO:
        return "MATERIAL (Via Estrada do Coco)";
      case RouteType.MATERIAL_TRABALHADOR:
        return "MATERIAL (Via Estrada do Trabalhador)";
      case RouteType.MC_DONALDS:
        return "MC DONALDS (Via Rua do Canal)";
      default:
        return tipo;
    }
  };

  return (
    <div className="px-4 pb-20 bg-black text-white">
      <h1 className="text-3xl font-bold text-center py-6">
        TABELA DE HORÁRIOS 2024
      </h1>
      <Tabs defaultValue="weekday" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="weekday" className="text-white">
            SEGUNDA A SÁBADO
          </TabsTrigger>
          <TabsTrigger value="weekend" className="text-white">
            DOMINGOS E FERIADOS
          </TabsTrigger>
          <TabsTrigger value="extra" className="text-white">
            CARRO EXTRA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekday">
          <Card className="bg-gray-900 border-blue-500 border-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-300">COND</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-300">ESTAÇÃO</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weekdaySchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.cond}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.estacao}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getRouteStyle(
                          schedule.tipo
                        )}`}
                      >
                        {getRouteText(schedule.tipo)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekend">
          <Card className="bg-gray-900 border-blue-500 border-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-300">COND</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-300">ESTAÇÃO</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weekendSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.cond}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.estacao}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getRouteStyle(
                          schedule.tipo
                        )}`}
                      >
                        {getRouteText(schedule.tipo)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extra">
          <Card className="bg-gray-900 border-red-500 border-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>SEGUNDA A SEXTA</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {extraSchedule.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.cond}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-xl">
                        {schedule.estacao || "—"}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getRouteStyle(
                          schedule.tipo
                        )}`}
                      >
                        {getRouteText(schedule.tipo)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-4 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-base text-white">LEGENDA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="font-medium">COND:</span>
              <span>Saída do COND PSB</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">ESTAÇÃO:</span>
              <span>Volta para o COND PSB</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                MATERIAL
              </span>
              <span>Via Estrada do Coco</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                MATERIAL
              </span>
              <span>Via Estrada do Trabalhador</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                MC DONALDS
              </span>
              <span>Via Rua do Canal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
