// app/maps/page.tsx
"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MapsPage() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Rotas no Mapa</h1>

      <Tabs defaultValue="trabalhador">
        <TabsList
          className="
            flex
            w-full
            gap-2
            overflow-x-auto
            sm:overflow-x-visible
            sm:grid
            sm:grid-cols-3
            mb-4
          "
        >
          {/* ABA 1 */}
          <TabsTrigger
            value="trabalhador"
            className="
              whitespace-nowrap
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            Estr. Trabalhador
          </TabsTrigger>

          {/* ABA 2 */}
          <TabsTrigger
            value="coco"
            className="
              whitespace-nowrap
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            Estr. Coco
          </TabsTrigger>

          {/* ABA 3 */}
          <TabsTrigger
            value="mcdonalds"
            className="
              whitespace-nowrap
              data-[state=active]:bg-blue-100
              data-[state=active]:text-blue-600
              data-[state=active]:font-semibold
            "
          >
            Rua do Canal
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba 1: MATERIAL (Estrada do Trabalhador) */}
        <TabsContent value="trabalhador">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d31114.964837103045!2d-38.35125864930278!3d-12.8838745597032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e9!4m5!1s0x71617007d1461ed%3A0xee7417f60ffe4b10!2sPSI%20Service%20-%20Palfinger%2C%20PX.%20PASS.%20DO%20METR%C3%94%20-%20Rua%20Doutor%20Gerino%20de%20Souza%20Filho%20-%20Iting%C3%A1%2C%20Lauro%20de%20Freitas%20-%20BA!3m2!1d-12.902249!2d-38.3408067!4m5!1s0x71615f48d49406d%3A0x399583a02372feb6!2sR.%20Jurema%2C%20608%20-%20Port%C3%A3o%2C%20Lauro%20de%20Freitas%20-%20BA%2C%2042711-820!3m2!1d-12.865326399999999!2d-38.3205453!5e0!3m2!1spt-BR!2sbr!4v1738188669437!5m2!1spt-BR!2sbr"
            width="800"
            height="600"
            loading="lazy"
          ></iframe>
        </TabsContent>

        {/* Conteúdo da aba 2: MATERIAL (Estrada do Coco) */}
        <TabsContent value="coco">
          <IframeRota
            src="https://www.google.com/maps/embed?pb=!1m18...EstradaDoCoco..."
            descricao="Rota MATERIAL para PSB via Estrada do Coco"
          />
        </TabsContent>

        {/* Conteúdo da aba 3: MC DONALD'S */}
        <TabsContent value="mcdonalds">
          <IframeRota
            src="https://www.google.com/maps/embed?pb=!1m18...McDonalds..."
            descricao="Rota MC DONALD'S para PSB via Rua do Canal"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Subcomponente que exibe um iframe do Google Maps.
 * Ajuste a largura/altura conforme necessidade.
 */
function IframeRota({ src, descricao }: { src: string; descricao: string }) {
  return (
    <div className="w-full h-[60vh]">
      <iframe
        src={src}
        style={{ border: 0 }}
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
      ></iframe>
      <p className="mt-2 text-gray-500 text-sm">{descricao}</p>
    </div>
  );
}
