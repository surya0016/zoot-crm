import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest){
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const updateOverdueTagTimers = async () => {
  const tagTimers = await db.tagTimer.findMany({
    where: {
      endTime: null,
      tagStatus: 'in_progress',
    },
  });
  
  const now = new Date();

  for (const timer of tagTimers) {
    const start = new Date(timer.startTime).getTime();
    const deadline = start + timer.countDownSec * 1000;
    if (now.getTime() > deadline) {
      await db.tagTimer.update({
        where: { id: timer.id },
        data: { tagStatus: 'overdue' },
        });
      }
    }

  return new NextResponse("Cron job executed", { status: 200 });
  }
}