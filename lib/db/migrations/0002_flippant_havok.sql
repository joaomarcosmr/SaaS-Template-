CREATE TABLE "auth.users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "auth.users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "costumer_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_costumer_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "plan_price_id" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth_id_auth.users_id_fk" FOREIGN KEY ("auth_id") REFERENCES "public"."auth.users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_unique" UNIQUE("customer_id");