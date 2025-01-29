// components/DarkModeToggle.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Ao montar, verifica se o usuário já tem modo dark
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDark) {
      htmlEl.classList.add("dark");
    } else {
      htmlEl.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-sm font-medium">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
