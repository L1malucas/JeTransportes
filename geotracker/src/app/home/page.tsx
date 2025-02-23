"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { io } from "socket.io-client";

// const socket = io("http://localhost:4001", {
const socket = io("https://jetransportes.onrender.com/", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function Home() {
  const [clientsInfo, setClientsInfo] = useState<any>({});

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      const { clientId, vehicleType, currentAddress, lastUpdatedTime } = data;

      setClientsInfo((prevState: any) => {
        const updatedClients = { ...prevState };
        if (!updatedClients[clientId]) {
          updatedClients[clientId] = {
            vehicleType: "",
            currentAddress: "",
            lastUpdatedTime: "",
          };
        }
        updatedClients[clientId] = {
          vehicleType: vehicleType || updatedClients[clientId].vehicleType,
          currentAddress:
            currentAddress || updatedClients[clientId].currentAddress,
          lastUpdatedTime:
            lastUpdatedTime || updatedClients[clientId].lastUpdatedTime,
        };

        return updatedClients;
      });
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

  const renderVehicleCards = () => {
    return Object.keys(clientsInfo).map((clientId) => {
      const clientData = clientsInfo[clientId];

      if (!clientData) return null;

      return (
        <Link
          href={getMapsUrl(clientData.currentAddress)}
          passHref
          key={clientId}
        >
          <Card className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-lg transition-shadow mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {clientData.vehicleType}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Última localização</p>
                    <p className="font-medium text-lg">
                      {clientData.currentAddress}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-500 ml-2" />
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Última Atualização</p>
                    <p className="font-medium text-lg">
                      {clientData.lastUpdatedTime}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    });
  };

  return <div className="space-y-4">{renderVehicleCards()}</div>;
}
