// filepath: d:\zoot-crm\app\api\client\dates\route.ts
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const dates = await db.client.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    // Format dates as YYYY-MM-DD
    const uniqueDates = Array.from(new Set(dates.map(d => d.createdAt.toISOString().slice(0, 10))));
    return NextResponse.json({ dates: uniqueDates });
  } catch (error) {
    console.error("Error fetching dates:", error);
    return NextResponse.json({ error: "Failed to fetch dates" }, { status: 500 });
  }
}