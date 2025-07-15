import cron from "node-cron";

console.log("Running test.ts script...");
cron.schedule('* * * * *', () => {
  console.log('🚀 Cron job is running every minute:', new Date().toLocaleTimeString());
});
