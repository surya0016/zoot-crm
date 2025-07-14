// const prevTimer = await db.tagTimer.findFirst({
//   where: { clientEntryId, tagField: previousTagIndex, endTime: null }
// });
// if (prevTimer) {
//   const endTime = new Date();
//   const durationMins = Math.round((endTime - prevTimer.startTime) / 60000);
//   const status = durationMins > prevTimer.countDownMins ? 'overdue' : 'completed';
//   await db.tagTimer.update({
//     where: { id: prevTimer.id },
//     data: { endTime, durationMins, status }
//   });
// }