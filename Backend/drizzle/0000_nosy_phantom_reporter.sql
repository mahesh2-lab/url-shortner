CREATE TABLE "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"url_id" integer NOT NULL,
	"user_agent" varchar(512) NOT NULL,
	"ip_address" varchar(45) NOT NULL,
	"referrer" varchar(512),
	"device_type" varchar(50) NOT NULL,
	"country" varchar(100),
	"region" varchar(100),
	"clicked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"shortId" varchar NOT NULL,
	"originalUrl" varchar NOT NULL,
	"title" varchar NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"ipAddress" varchar NOT NULL,
	"userId" varchar,
	CONSTRAINT "Urls_shortId_unique" UNIQUE("shortId")
);
--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_url_id_Urls_id_fk" FOREIGN KEY ("url_id") REFERENCES "public"."Urls"("id") ON DELETE cascade ON UPDATE no action;