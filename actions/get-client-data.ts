import { db } from "@/lib/db";

export async function getClientData() {
  try {
    const clientsData = await db.client.findMany({
      include:{
        entries:true
      }, 
    })

    const clients = clientsData.map((clientData)=>({
      ...clientData,
      entry: clientData.entries[0] || null,
      entries: null
    }));
    return clients;
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw new Error("Failed to fetch client data");
  }
}