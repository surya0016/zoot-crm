import { db } from "@/lib/db";
import { updateOverdueTagTimers } from "@/lib/script";
import { TagTimerProps } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

type Tag = { [key: string]: any };

export async function GET(req: Request) {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const url = new URL(req.url);
  const dateParam = url.searchParams.get("date");
  let where = {};
  if (dateParam) {
    // dateParam is "2025-07-16"
    const start = new Date(dateParam + "T00:00:00.000Z");
    const end = new Date(dateParam + "T23:59:59.999Z");
    where = {
      createdAt: {
        gte: start,
        lte: end,
      },
    };
  }
  try {
    const clientsData = await db.client.findMany({
      where,
      include: {
        entries: {
          include: {
            tagTimers: true,
          },
        },
      },
    });

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
          createdAt:
            timer.createdAt instanceof Date
              ? timer.createdAt.toISOString()
              : timer.createdAt,
          startTime:
            timer.startTime instanceof Date
              ? timer.startTime.toISOString()
              : timer.startTime,
          endTime:
            timer.endTime instanceof Date
              ? timer.endTime.toISOString()
              : timer.endTime,
        }));
      }
      return {
        ...clientData,
        entry:
          entry && {
            ...entry,
            tags,
            tagTimers,
          },
        entries: null,
      };
    });
    console.log(
      "Fetched clients [D:\\zoot-crm\\app\\api\\client\\route.ts]:",clients.length === 0 ? "No clients found" : `${clients.length} clients found`
    );
    await updateOverdueTagTimers(); // Run the scheduled task to update overdue tag timers
    console.log("Overdue tag timers updated successfully");
    return NextResponse.json({
      clients,
    });
  } catch (error) {
    console.error("[GET CLIENT API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
