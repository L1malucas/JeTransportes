"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Info, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { io } from "socket.io-client";

const socket = io("https://jetransportes.onrender.com/", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function Home() {
  const [busInfo, setBusInfo] = useState<any>({
    latitude: 0,
    longitude: 0,
    currentAddress: "",
    vehicleType: "",
    lastUpdatedTime: "",
  });

  useEffect(() => {
    // Add connection event handlers
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("locationUpdate", (data) => {
      setBusInfo(data);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("locationUpdate");
    };
  }, []);

  const getMapsUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `/maps?location=${encodedLocation}`;
  };

  return (
    <div className="space-y-4">
      <Link href={getMapsUrl(busInfo.currentAddress)} passHref>
        <Card className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Ônibus {busInfo.vehicleType}
              </CardTitle>
              <div className="inline-block text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {busInfo.lastUpdatedTime}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Última localização</p>
                  <p className="font-medium text-lg">
                    {busInfo.currentAddress}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-500 ml-2" />
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="font-medium text-lg">
                    {busInfo.lastUpdatedTime}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Condições do Trânsito
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Status: Moderado</p>
            <div className="h-2 bg-yellow-200 rounded">
              <div className="h-full w-1/2 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
