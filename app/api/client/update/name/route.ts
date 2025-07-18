import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
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