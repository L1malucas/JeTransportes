// ./src/app/maps/page.tsx

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const MapsPage = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "Estrada do coco"; // Default location if none is provided

  // Function to generate the Google Maps embed URL
  const getGoogleMapsEmbedUrl = (loc: string) => {
    const encodedLocation = encodeURIComponent(loc);
    return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default MapsPage;
