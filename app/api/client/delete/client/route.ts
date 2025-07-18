import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id } = await req.json();
  try {
    if (!id) {
      console.error("Invalid request data", { id });
      return new NextResponse("Invalid request data", { status: 400 });
    }
    console.log(id);

    const client = await db.client.delete({
      where: { id },
    });
    
    console.log("Deleted client ");
    return NextResponse.json(client);
  } catch (error) {
    console.error("[DELETE CLIENT API ERROR]: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}