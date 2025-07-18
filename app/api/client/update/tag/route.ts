import { doneTags } from "@/lib/data";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { Status } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  console.log("Updating client tag...");
  const { entryId, tagIndex, tag } = await req.json();
  try {
    if (!entryId || tagIndex === undefined || tag === undefined) {
      console.error("Invalid request data", { entryId, tagIndex, tag });
      return new NextResponse("Invalid request data", { status: 400 });
    }
    const tagValue = tag ? tag.label : null; // Use label for the tag value
    const tagTime = tag ? tag.value : null; // Use time if available

    const createTagTimer = await db.tagTimer.create({
      data: {
        tagValue,
        startTime: new Date().toISOString(),
        countDownSec: (tagTime ?? 0) * 60,
        clientEntryId: entryId,
        tagField: tagIndex + 1, // Prisma uses 1-based index for fields
        tagStatus: Status.in_progress, // Assuming you want to set it to in_progress initially
      },
    });

    const updatedEntry = await db.clientEntry.update({
      where: { id: entryId },
      data: {
        [`tag${tagIndex + 1}`]: tagValue, // Prisma uses 1-based index for fields
        updatedAt: new Date().toISOString(),
      },
    });

      // Find the previous tagTimer record by clientEntryId and tagField
    const previousTagTimer = await db.tagTimer.findFirst({
      where: {
        clientEntryId: entryId,
        tagField: tagIndex, // Prisma uses 1-based index for fields
      },
    });
    if (previousTagTimer) {
      const updatePreviousTagTimer = await db.tagTimer.update({
        where: {
          id: previousTagTimer.id,
        },
        data: {
          endTime: new Date().toISOString(),
        },
      });
      console.log("Updated previous tag timer");
    }

    
    if(doneTags.includes(tagValue)){
      console.log("Tag is a done tag, updating entry status to completed");
      const updatedEntry = await db.clientEntry.update({
        where: { id: entryId },
        data: {
          [`tag${tagIndex + 1}`]: tagValue, // Prisma uses 1-based index for fields
          status: Status.completed,
          updatedAt: new Date().toISOString(),
        },
      });
      // First, find the tagTimer record by clientEntryId and tagField
      const tagTimerRecord = await db.tagTimer.findFirst({
        where: {
          clientEntryId: entryId,
          tagField: tagIndex+1, // Prisma uses 1-based index for fields
        },
      });
      if (tagTimerRecord) {
        const updatedTagTimer = await db.tagTimer.update({
          where: {
            id: tagTimerRecord.id,
          },
          data: {
            endTime: new Date().toISOString(),
            tagStatus: Status.completed,
          }
        });
      }
    }

    console.log("Updated Entry");
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("[UPDATE CLIENT TAG API ERROR]: ", error, tag);
    return new NextResponse("Internal server error", { status: 500 });
  }
}