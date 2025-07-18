import ClientTable from "@/components/client-data-table";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  console.log("User Claims: ", data?.claims);
  if (error || !data?.claims) {
    redirect("/auth/login");
  }// Default to today if no date is provided

  return (
    <div className="">
      <main className="p-4 lg:p-6">
        <ClientTable />
      </main>
    </div>
  );
}