// ./src/app/maps/page.tsx

"use client";

import React, { useEffect, useState } from "react";

const MapsPage = () => {
  const [location, setLocation] = useState<string>("Estrada do coco");

  useEffect(() => {
    // Pega o valor do parâmetro "location" da URL (se existir)
    const queryParams = new URLSearchParams(window.location.search);
    const locationFromUrl = queryParams.get("location");

    if (locationFromUrl) {
      setLocation(locationFromUrl); // Atualiza o estado com o valor da URL
    }
  }, []); // O array vazio faz a execução do useEffect apenas na montagem do componente

  // Função para gerar a URL de incorporação do Google Maps
  const getGoogleMapsEmbedUrl = (loc: string) => {
    const encodedLocation = encodeURIComponent(loc);
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  };

  return (
    <div className="p-4 flex flex-col items-center">
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
};

export default MapsPage;
