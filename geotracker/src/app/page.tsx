"use client";

import { redirect } from "next/navigation";

export default function Page() {
  // Assim que essa página carregar, redireciona para /home
  redirect("/home");
  return null;
}
