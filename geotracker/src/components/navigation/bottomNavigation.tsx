"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, Calendar, Info } from "lucide-react";

const navItems = [
  { href: "/home", label: "Início", icon: HomeIcon },
  { href: "/horarios", label: "Horários", icon: Calendar },
  // { href: "/maps", label: "Rotas", icon: MapPin },
  { href: "/info", label: "Info", icon: Info },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          // Considerar "ativo" se rota atual começa com href
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center text-sm ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
