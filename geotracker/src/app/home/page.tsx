"use client";

import React, { useState } from "react";
import { MapPin, Clock, Info, ExternalLink } from "lucide-react"; // Importar ExternalLink  ou outro ícone apropriado
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"; // Importar Link do Next.js

export default function Home() {
  const [trafficStatus] = useState("Moderado");

  const [busInfo] = useState({
    busId: "PSB-01",
    lastLocation: "Estrada do coco",
    lastUpdate: "19:18:33",
    direction: "Indo para o Condomínio",
    nextStop: "Condomínio PSB",
    status: "Em movimento",
    schedule: "17:10",
    type: "MATERIAL",
  });

  // Função para gerar a URL do Google Maps com a localização
  const getMapsUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `/maps?location=${encodedLocation}`;
  };

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Link href={getMapsUrl(busInfo.lastLocation)} passHref>
        <Card className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-lg transition-shadow">
          {/* Cabeçalho do Card */}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              {/* Nome do Ônibus */}
              <CardTitle className="text-xl">Ônibus {busInfo.busId}</CardTitle>
              {/* Horário (schedule) */}
              <div className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {busInfo.schedule}
              </div>
            </div>
          </CardHeader>

          {/* Conteúdo do Card */}
          <CardContent>
            <div className="space-y-4">
              {/* Última localização */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex items-center">
                  <div>
                    <p className="text-sm text-gray-600">Última localização</p>
                    <p className="font-medium text-lg">
                      {busInfo.lastLocation}
                    </p>
                  </div>
                  {/* Ícone de navegação */}
                  <ExternalLink className="h-5 w-5 text-gray-500 ml-2" />
                </div>
              </div>

              {/* Último horário de atualização */}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="font-medium text-lg">{busInfo.lastUpdate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Repetir para o segundo Card (Van) */}
      <Link href={getMapsUrl(busInfo.lastLocation)} passHref>
        <Card className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-lg transition-shadow">
          {/* Cabeçalho do Card */}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              {/* Nome do Van */}
              <CardTitle className="text-xl">Van {busInfo.busId}</CardTitle>
              {/* Horário (schedule) */}
              <div className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {busInfo.schedule}
              </div>
            </div>
          </CardHeader>

          {/* Conteúdo do Card */}
          <CardContent>
            <div className="space-y-4">
              {/* Última localização */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div className="flex items-center">
                  <div>
                    <p className="text-sm text-gray-600">Última localização</p>
                    <p className="font-medium text-lg">
                      {busInfo.lastLocation}
                    </p>
                  </div>
                  {/* Ícone de navegação */}
                  <ExternalLink className="h-5 w-5 text-gray-500 ml-2" />
                </div>
              </div>

              {/* Último horário de atualização */}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="font-medium text-lg">{busInfo.lastUpdate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

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
