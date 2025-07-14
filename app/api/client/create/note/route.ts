import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  const { note, entryId } = await req.json();
  try {
    if (!note || !entryId) {
      console.error("Invalid request data", { note, entryId });
      return new NextResponse("Invalid request data", { status: 400 });
    }

    const newNote = await db.clientEntry.update({
      where: { id: entryId },
      data: {
        note,
        updatedAt: new Date().toISOString(),
      }
    })

    console.log("Updated client note: ", newNote);
    return NextResponse.json(newNote);
  } catch (error) {
    console.error("[CREATE CLIENT NOTE API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}