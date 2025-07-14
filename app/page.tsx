import AddClient from "@/components/add-client";
import ClientTable from "@/components/client-data-table";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const date = new Date().getDate()
  
  return (
    <div className="">
      <Header/>
      <main className=" p-4 lg:p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-2xl">Client Management - {date} April</div>
          <div className="">
            <AddClient/>
          </div>
        </div>
        <ClientTable/>
      </main>
    </div>
  );
}
