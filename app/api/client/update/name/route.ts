import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const { id, newName } = await req.json();
    const updatedClient = await db.client.update({
      where:{ id },
      data:{
        name: newName,
      }
    });
    console.log("Updated client name");
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("[UPDATE CLIENT NAME API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}