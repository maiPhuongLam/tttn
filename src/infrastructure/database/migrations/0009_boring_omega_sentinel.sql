DO $$ BEGIN
 CREATE TYPE "public"."payment_type" AS ENUM('online', 'Khi nhận hàng');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_type" "payment_type" NOT NULL;