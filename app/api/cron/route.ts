import { db } from "@/lib/db";
import cron from "node-cron";

console.log("Running scheduled task to update overdue tag timers...");
cron.schedule("* * * * *",async () => {
  try {
    console.log("Running scheduled task to update overdue tag timers...");
    await updateOverdueTagTimers();
    console.log("Overdue tag timers updated successfully.");
  } catch (error) {
    console.error("Error updating overdue tag timers:", error);
  }
})

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
}