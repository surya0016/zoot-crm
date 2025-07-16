// filepath: d:\zoot-crm\app\api\client\dates\route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const dates = await db.client.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  // Format dates as YYYY-MM-DD
  const uniqueDates = Array.from(new Set(dates.map(d => d.createdAt.toISOString().slice(0, 10))));
  return NextResponse.json({ dates: uniqueDates });
}