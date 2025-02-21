import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './Backend/drizzle',
  schema: './Backend/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    
  },
});

// cron.schedule('0 0 * * *', async () => {
//   console.log("Running link cleanup...");

//   try {
//     await db
//       .delete(urlTable)
//       .where(sql`${urlTable.createdAt} < NOW() - INTERVAL '30 days'`);

//     console.log("Expired short links deleted.");
//   } catch (error) {
//     console.error("Error deleting expired links:", error);
//   }
// });
