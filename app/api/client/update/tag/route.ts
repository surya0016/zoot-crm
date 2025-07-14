import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { entryId, tagIndex, tag } = await req.json();
    if (!entryId || tagIndex === undefined || tag === undefined) {
      console.error("Invalid request data", { entryId, tagIndex, tag });
      return new NextResponse("Invalid request data", { status: 400 });
    }
    const tagValue = tag ? tag.label : null; // Use label for the tag value
    const tagTime = tag ? tag.time : null; // Use time if available

    const updateTagTimer = await db.tagTimer.create({
      data: {
        tagValue,
        startTime: new Date().toISOString(),
        countDownMins: tagTime,
        clientEntryId: entryId,
        tagField: tagIndex + 1, // Prisma uses 1-based index for fields
      },
    });

    const updatedEntry = await db.clientEntry.update({
      where: { id: entryId },
      data: {
        [`tag${tagIndex + 1}`]: tagValue, // Prisma uses 1-based index for fields
        updatedAt: new Date().toISOString(),
      },
    });
    console.log("Updated Entry: ", updatedEntry);
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("[UPDATE CLIENT TAG API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}