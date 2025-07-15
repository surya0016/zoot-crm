import { db } from "@/lib/db";
import { TagTimerProps } from "@/lib/types";
import { NextResponse } from "next/server";

type Tag = { [key: string]: any };

export async function GET(){
  try {
    const clientsData = await db.client.findMany({
      // where:{
      //   createdAt: new Date().toISOString(), // Fetch clients created today
      // },
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
      let tagTimers: TagTimerProps[] = [];
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
        tagTimers = (entry.tagTimers || []).map((timer: any) => ({
          ...timer,
          createdAt: timer.createdAt instanceof Date ? timer.createdAt.toISOString() : timer.createdAt,
          startTime: timer.startTime instanceof Date ? timer.startTime.toISOString() : timer.startTime,
          endTime: timer.endTime instanceof Date ? timer.endTime.toISOString() : timer.endTime,
        }));
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
    console.log("Fetched clients [D:\\zoot-crm\\app\\api\\client\\route.ts]:", clients.map(c => c.entry?.tagTimers)); 
    return NextResponse.json({
      clients
    });
  } catch (error) {
    console.error("[GET CLIENT API ERROR]: ", error);
    return new NextResponse("Internal server error",{status:500})
  }
}
