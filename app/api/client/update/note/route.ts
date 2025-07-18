import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id, oldNote, newNote } = await req.json();
  if (!id || oldNote === undefined || newNote === undefined) {
    return new NextResponse("Invalid request data", { status: 400 });
  }
  const entry = await db.clientEntry.findUnique({
    where: { id },
    select: { note: true },
  });
  if (!entry || !entry.note) {
    return new NextResponse("Entry not found", { status: 404 });
  }
  const updatedNotes = entry.note.map(n => n === oldNote ? newNote : n);
  const updatedEntry = await db.clientEntry.update({
    where: { id },
    data: {
      note: updatedNotes,
      updatedAt: new Date().toISOString(),
    },
  });
  return NextResponse.json(updatedEntry);
}