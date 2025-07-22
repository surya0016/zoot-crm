import { db } from "./db";

export const updateOverdueTagTimers = async () => {
  console.log("Running scheduled task to update overdue tag timers...");
  
  try {
    const tagTimers = await db.tagTimer.findMany({
      where: {
        endTime: null,
        tagStatus: 'in_progress',
      },
    });
    
    const now = new Date();
    let updatedCount = 0;

    for (const timer of tagTimers) {
      const start = new Date(timer.startTime).getTime();
      const deadline = start + timer.countDownSec * 1000;
      if (now.getTime() > deadline) {
        await db.tagTimer.update({
          where: { id: timer.id },
          data: { tagStatus: 'overdue' },
        });
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} overdue timers successfully.`);
  } catch (error) {
    console.error("Error updating overdue tag timers:", error);
    process.exit(1); // Exit with error code for GitHub Actions
  } finally {
    await db.$disconnect();
  }
}