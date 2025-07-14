import { db } from "@/lib/db";

export interface GetTagTimerParams {
  tagName: string | null; 
  entryId: string;
}

export async function getTagTimer({entryId, tagName}: GetTagTimerParams) {
  if (!entryId || !tagName) {
    console.warn("Entry ID or Tag Name is missing");
    return null;
  }
  try {
      const tagTimer = await db.tagTimer.findFirst({
        where:{
          clientEntryId: entryId,
          tagValue: tagName,
        }
      })
      if (!tagTimer) {
        console.warn(`No tag timer found for entryId: ${entryId} and tagName: ${tagName}`);
        return null;
      }
      return {
        ...tagTimer,
        createdAt: tagTimer.createdAt instanceof Date ? tagTimer.createdAt.toISOString() : tagTimer.createdAt,
        startTime: tagTimer.startTime instanceof Date ? tagTimer.startTime.toISOString() : tagTimer.startTime,
        endTime: tagTimer.endTime instanceof Date ? tagTimer.endTime.toISOString() : tagTimer.endTime,
      };
    } catch (error) {
      console.error("[UPDATE CLIENT ACTION ERROR]: ", error);
      return new Error("Internal server error");
    }
}