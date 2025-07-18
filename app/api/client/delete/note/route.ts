import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, noteToDelete } = await req.json();
  try {
    if (!id || noteToDelete === undefined) {
      console.error("Invalid request data", { id, noteToDelete });
      return new NextResponse("Invalid request data", { status: 400 });
    }

    // Fetch existing notes
    const entry = await db.clientEntry.findUnique({
      where: { id },
      select: { note: true },
    });

    if (!entry || !entry.note) {
      return new NextResponse("Entry not found", { status: 404 });
    }

    // Remove the note to delete
    const updatedNotes = entry.note.filter((n) => n !== noteToDelete);

    const updatedEntry = await db.clientEntry.update({
      where: { id },
      data: {
        note: updatedNotes,
        updatedAt: new Date().toISOString(),
      },
    });
    console.log("Deleted client note");
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("[DELETE CLIENT NOTE API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}