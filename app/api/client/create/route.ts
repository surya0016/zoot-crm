import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
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