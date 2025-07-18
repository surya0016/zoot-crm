import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    // Add User Validation

    const { name } = await req.json()

    const client =  await db.client.create({
      data:{
        name,
      }
    })

    const clientEntry = await db.clientEntry.create({
      data:{
        clientId: client.id, 
      }
    })
    console.log("Created client");
     
    return NextResponse.json({
      client,
      clientEntry
    })

  } catch (error) {
    console.log("[CREATE CLIENT API]: ", error)
    return new NextResponse("Internal Error",{status:500})
  }
}