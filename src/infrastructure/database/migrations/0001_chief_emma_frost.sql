CREATE TABLE IF NOT EXISTS "warranties" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"total_cost" numeric(10, 0) NOT NULL,
	"repair_date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "warranty_cases" DROP CONSTRAINT "warranty_cases_product_id_admins_id_fk";
--> statement-breakpoint
ALTER TABLE "warranty_details" DROP CONSTRAINT "warranty_details_customer_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "warranty_details" ADD COLUMN "warranty_case_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "warranty_details" ADD COLUMN "warranty_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranties" ADD CONSTRAINT "warranties_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_details" ADD CONSTRAINT "warranty_details_warranty_case_id_warranty_cases_id_fk" FOREIGN KEY ("warranty_case_id") REFERENCES "public"."warranty_cases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_details" ADD CONSTRAINT "warranty_details_warranty_id_warranties_id_fk" FOREIGN KEY ("warranty_id") REFERENCES "public"."warranties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "warranty_cases" DROP COLUMN IF EXISTS "product_id";--> statement-breakpoint
ALTER TABLE "warranty_details" DROP COLUMN IF EXISTS "customer_id";--> statement-breakpoint
ALTER TABLE "warranty_details" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "warranty_details" DROP COLUMN IF EXISTS "cost";--> statement-breakpoint
ALTER TABLE "warranty_details" DROP COLUMN IF EXISTS "repair_date";