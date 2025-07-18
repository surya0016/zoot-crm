import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, newNote } = await req.json();
  try {
    if (!id || !newNote) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    // Fetch existing notes
    const entry = await db.clientEntry.findUnique({
      where: { id },
      select: { note: true },
    });

    const updatedNotes = entry && entry.note ? [newNote, ...entry.note] : [newNote];

    const createNote = await db.clientEntry.update({
      where: { id },
      data: {
        note: updatedNotes,
        updatedAt: new Date().toISOString(),
      },
    });
    console.log("Updated client note");
    return NextResponse.json(createNote);
  } catch (error) {
    console.error("[UPDATE CLIENT NOTE API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}