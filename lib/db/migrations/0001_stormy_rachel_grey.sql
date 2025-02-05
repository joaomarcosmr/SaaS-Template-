ALTER TABLE "users" ADD COLUMN "has_access" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_price_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "costumer_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_costumer_id_unique" UNIQUE("costumer_id");