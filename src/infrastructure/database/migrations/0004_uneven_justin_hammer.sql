DO $$ BEGIN
 CREATE TYPE "public"."warranty_status" AS ENUM('Tiếp nhận', 'Đang bảo hành', 'Bảo hành xong', 'Đã bàn giao');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "warranties" ADD COLUMN "warranty_status" "warranty_status" NOT NULL;