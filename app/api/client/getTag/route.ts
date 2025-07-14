import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { entryId, tagName } = await req.json();
  try {
    const tagTimer = await db.tagTimer.findFirst({
      where: {
        clientEntryId: entryId,
        tagValue: tagName,
      },
    });
    if (!tagTimer) {
      console.warn(`No tag timer found for entryId: ${entryId} and tagName: ${tagName}`);
      return NextResponse.json(
        { error: "No tag timer found", tagTimerVar: null },
        { status: 404 }
      );
    }
    const tagTimerVar = {
      ...tagTimer,
      createdAt: tagTimer.createdAt instanceof Date ? tagTimer.createdAt.toISOString() : tagTimer.createdAt,
      startTime: tagTimer.startTime instanceof Date ? tagTimer.startTime.toISOString() : tagTimer.startTime,
      endTime: tagTimer.endTime instanceof Date ? tagTimer.endTime.toISOString() : tagTimer.endTime,
    };
    return NextResponse.json({ tagTimerVar });
  } catch (error) {
    console.error("[UPDATE CLIENT ACTION ERROR]: ", error);
    return NextResponse.json(
      { error: "Internal server error", tagTimerVar: null },
      { status: 500 }
    );
  }
}
