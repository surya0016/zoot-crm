import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, newNote } = await req.json();
    console.log(id, newNote);
    const updatedNote = await db.clientEntry.update({
      where:{ id },
      data:{
        note: newNote,
        updatedAt: new Date().toISOString(),
      }
    });
    console.log("Updated client note: ", updatedNote);
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("[UPDATE CLIENT NOTE API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}