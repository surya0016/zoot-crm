import { db } from "@/lib/db";
import { TagUpdateProps } from "@/lib/types";
import { NextResponse } from "next/server";

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

export async function updateClientTags({entryId, tagIndex, tag}:TagUpdateProps) {
  try {
      if (!entryId || tagIndex === undefined || tag === undefined) {
        return new NextResponse("Invalid request data", { status: 400 });
      }
      // Update the tag in the database
      const updatedEntry = await db.client.update({
        where: {id: entryId},
        data:{
          entries: {
            update: {
              where: { id: entryId },
              data:{
                [`tag${tagIndex + 1}`]: tag, // Adjusting index for tag1, tag2, etc.
                updatedAt: new Date().toISOString(), // Update the timestamp
              }
            },
          },
        }
      })
      console.log("Updated Entry: ", updatedEntry);
      return updatedEntry;
    } catch (error) {
      console.error("[UPDATE CLIENT ACTION ERROR]: ", error);
      return new Error("Internal server error");
    }
}