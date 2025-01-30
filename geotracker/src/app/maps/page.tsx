// ./src/app/maps/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function MapsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "Estrada do coco"; // Valor padrão se nenhum parâmetro for fornecido

  // Gerar a URL do Google Maps para incorporação
  const getGoogleMapsEmbedUrl = (loc: string) => {
    const encodedLocation = encodeURIComponent(loc);
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="w-[90%] h-[90vh]">
        <iframe
          src={getGoogleMapsEmbedUrl(location)}
          style={{ border: 0 }}
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          title="Mapa do Ônibus"
        ></iframe>
      </div>
    </div>
  );
}
