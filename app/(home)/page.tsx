"use client"

import ClientTable from "@/components/client-data-table";
import Header from "@/components/header";
import { DarkMode } from "@/components/ui/dark-mode-toggle";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  const date = searchParams.get('date'); // Default to today if no date is provided
  return (
    <div className="">
      <main className="p-4 lg:p-6">
        <ClientTable/>
      </main>
    </div>
  );
}