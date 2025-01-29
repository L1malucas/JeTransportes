// lib/colorMap.ts
export const colorMap: Record<string, string> = {
  // Segunda a Sábado (Azul)
  "05:40": "bg-blue-500 text-white",
  "05:55": "bg-blue-500 text-white",
  "06:35": "bg-blue-500 text-white",
  "07:15": "bg-blue-500 text-white",
  "08:20": "bg-blue-500 text-white",
  "09:05": "bg-blue-500 text-white",
  "10:05": "bg-blue-500 text-white",
  "11:05": "bg-blue-500 text-white",
  "12:10": "bg-blue-500 text-white",
  "12:55": "bg-blue-500 text-white",
  "17:10": "bg-blue-500 text-white",

  // Segunda a Sábado (Vermelho)
  "15:15": "bg-red-500 text-white",
  "16:15": "bg-red-500 text-white",

  // Segunda a Sábado (Amarelo)
  "18:15": "bg-yellow-500 text-black",
  "19:15": "bg-yellow-500 text-black",
  "20:25": "bg-yellow-500 text-black",
  "21:10": "bg-yellow-500 text-black",
  "22:10": "bg-yellow-500 text-black",
  "22:55": "bg-yellow-500 text-black",

  // Domingos e Feriados (Vermelho)
  "17:05": "bg-red-500 text-white",

  // Domingos e Feriados (Amarelo)
  "18:45": "bg-yellow-500 text-black",
  "21:00": "bg-yellow-500 text-black",
  "21:50": "bg-yellow-500 text-black",

  // Domingos e Feriados (Azul)
  "06:15": "bg-blue-500 text-white",
  "08:05": "bg-blue-500 text-white",
  "11:00": "bg-blue-500 text-white",

  // Carro Extra (Vermelho)
  "17:45": "bg-red-500 text-white",

  // Carro Extra (Amarelo)
  "19:45": "bg-yellow-500 text-black",
};
export function getEstacaoColorClass(estacao: string | undefined): string {
  if (!estacao) {
    return "bg-white text-black border border-gray-300";
  }
  return colorMap[estacao] || "bg-white text-black border border-gray-300";
}

/**
 * Se for amarelo => "MC DONALD'S"
 * Caso contrário => "MATERIAL"
 */
export function getRouteLabel(estacao: string, colorClass: string): string {
  if (!estacao) return "";
  if (colorClass.includes("bg-yellow-500")) {
    return "MC DONALD'S";
  }
  return "MATERIAL";
}
