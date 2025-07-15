import AddClient from "@/components/add-client";
import ClientTable from "@/components/client-data-table";
import Header from "@/components/header";

export default function Home() {
  const date = new Date().getDate()
  
  return (
    <div className="">
      <Header/>
      <main className=" p-4 lg:p-6 overflow-auto">
        <ClientTable/>
      </main>
    </div>
  );
}
