"use client";

import React, { useState } from "react";
import { MapPin, Clock, Navigation, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [trafficStatus] = useState("Moderado");

  const [busInfo] = useState({
    busId: "PSB-01",
    lastLocation: "Material de Construção",
    lastUpdate: "2 minutos atrás",
    direction: "Indo para o Condomínio",
    nextStop: "Condomínio PSB",
    status: "Em movimento",
    schedule: "17:10",
    type: "MATERIAL",
  });

  return (
    <div className="p-4 space-y-4">
      {/* Status Card */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>Ônibus {busInfo.busId}</span>
            <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
              {busInfo.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">
              Horário programado: {busInfo.schedule}
            </div>
            <div className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {busInfo.type}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Info */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Última localização</p>
                <p className="font-medium text-lg">{busInfo.lastLocation}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Atualizado</p>
                <p className="font-medium text-lg">{busInfo.lastUpdate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Navigation className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Direção</p>
                <p className="font-medium text-lg">{busInfo.direction}</p>
                <p className="text-sm text-gray-500">
                  Próxima parada: {busInfo.nextStop}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condições do Trânsito */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Condições do Trânsito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Status: {trafficStatus}</p>
            <div className="h-2 bg-yellow-200 rounded">
              <div className="h-full w-1/2 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
