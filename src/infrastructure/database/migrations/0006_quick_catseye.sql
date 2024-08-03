ALTER TABLE "warranty_details" DROP CONSTRAINT "warranty_details_warranty_id_warranties_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_details" ADD CONSTRAINT "warranty_details_warranty_id_warranties_id_fk" FOREIGN KEY ("warranty_id") REFERENCES "public"."warranties"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
