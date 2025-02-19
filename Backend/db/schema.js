import {
    integer,
    pgTable,
    varchar,
    timestamp,
    serial
  } from "drizzle-orm/pg-core";
  
  // Drop existing sequence if it exists
  
  export const urlTable = pgTable("Urls", {
    id: integer().primaryKey().generatedAlwaysAsIdentity().notNull(),
    shortId: varchar(255).unique().notNull(),
    originalUrl: varchar(2083).notNull(), // Supports long URLs
    title: varchar(255).notNull(),
    clicks: integer().notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    expiresAt: timestamp("expires_at").notNull(), 
    ipAddress: varchar(255).notNull(), // Fixed typo
    userId: varchar(255) // Fixed typo
  });
  
  export const analytics = pgTable("analytics", {
    id: serial().primaryKey(),
    urlId: integer("url_id").references(() => urlTable.id, { onDelete: "cascade" }).notNull(),
    userAgent: varchar("user_agent", { length: 512 }).notNull(),
    ipAddress: varchar("ip_address", { length: 45 }).notNull(), // IPv6 Compatible
    referrer: varchar("referrer", { length: 512 }),
    deviceType: varchar("device_type", { length: 50 }).notNull(), // Mobile, Desktop, Tablet
    country: varchar("country", { length: 100 }), // Clicks by Location
    region: varchar("region", { length: 100 }), // State/Province
    clickedAt: timestamp("clicked_at").defaultNow().notNull(), // Clicks Over Time
  });