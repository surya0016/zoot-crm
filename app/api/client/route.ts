import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Tag = { [key: string]: any };
type TagTimer = { [key: string]: any };

export async function GET(){
  try {
    const clientsData = await db.client.findMany({
      include:{
        entries: {
          include: {
            tagTimers: true,
          },
        },
      },
    })

    const clients = clientsData.map((clientData) => {
      const entry = clientData.entries[0] || null;
      let tags: Tag[] = [];
      let tagTimers: TagTimer[] = [];
      if (entry) {
        tags = [
          { tag: entry.tag1 },
          { tag: entry.tag2 },
          { tag: entry.tag3 },
          { tag: entry.tag4 },
          { tag: entry.tag5 },
          { tag: entry.tag6 },
          { tag: entry.tag7 },
          { tag: entry.tag8 },
        ];
        tagTimers = entry.tagTimers || [];
      }
      return {
        ...clientData,
        entry: entry
          ? {
              ...entry,
              tags,
              tagTimers,
            }
          : null,
        entries: null,
      };
    });
    console.log("Fetched Clients: ", clients.map(c => c.entry?.tags));
    return NextResponse.json({
      clients
    });
  } catch (error) {
    console.error("[GET CLIENT API ERROR]: ", error);
    return new NextResponse("Internal server error",{status:500})
  }
}
