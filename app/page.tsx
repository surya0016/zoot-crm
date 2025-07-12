import ClientTable from "@/components/client-data-table";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="">
      <Header/>
      <main className=" p-4 lg:p-6 overflow-auto">
        <ClientTable/>
      </main>
    </div>
  );
}
