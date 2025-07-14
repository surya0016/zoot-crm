import AddClient from "@/components/add-client";
import ClientTable from "@/components/client-data-table";
import Header from "@/components/header";

export default function Home() {
  const date = new Date().getDate()
  
  return (
    <div className="">
      <Header/>
      <main className=" p-4 lg:p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-2xl">{date} April</div>
          <div className="">
            <AddClient/>
          </div>
        </div>
        <ClientTable/>
      </main>
    </div>
  );
}
