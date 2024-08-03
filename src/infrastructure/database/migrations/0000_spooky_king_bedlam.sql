DO $$ BEGIN
 CREATE TYPE "public"."cart_status" AS ENUM('active', 'inactive', 'expired', 'saved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."name" AS ENUM('mobile_phone', 'tablet', 'accessory');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."order_status" AS ENUM('pending', 'processing', 'shiped', 'delivered', 'cancelled', 'completed', 'refunded', 'returned');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."product_item_request_status" AS ENUM('locked', 'unlock', 'sold');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."product_serial_status" AS ENUM('inventory', 'under warrantying', 'sold');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address" text,
	"ward/commune" text,
	"district" text,
	"city/province" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brands_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"cart_status" "cart_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer NOT NULL,
	"product_item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 0) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "name" NOT NULL,
	"admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"total_price" numeric(10, 0) NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL,
	"order_status" "order_status" NOT NULL,
	"checkout_session_id" varchar NOT NULL,
	"payment_intent_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_serial" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 0) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" text NOT NULL,
	"original_price" numeric(9, 0) NOT NULL,
	"admin_id" integer,
	"brand_id" integer,
	"category_id" integer,
	"feature_id" integer,
	"release_date" timestamp DEFAULT now() NOT NULL,
	"is_delete" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"screenSize" varchar NOT NULL,
	"battery" varchar NOT NULL,
	"camera" varchar NOT NULL,
	"processor" varchar NOT NULL,
	"is_delete" boolean DEFAULT false,
	"os" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar(256) NOT NULL,
	"qty_in_stock" integer NOT NULL,
	"status" "product_item_request_status" NOT NULL,
	"price" numeric(10, 0) NOT NULL,
	"color" varchar NOT NULL,
	"storage" varchar NOT NULL,
	"ram" varchar NOT NULL,
	"image" text NOT NULL,
	"is_delete" boolean DEFAULT false NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_items_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "serial_numbers" (
	"id" serial PRIMARY KEY NOT NULL,
	"serial_number" varchar(100) NOT NULL,
	"product_item_id" integer NOT NULL,
	"status" "product_serial_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "serial_numbers_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"phone_number" text NOT NULL,
	"address_id" integer NOT NULL,
	"tr" varchar(256),
	"stripe_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_tr_unique" UNIQUE("tr")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warranty_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warranty_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"product_serial" varchar NOT NULL,
	"description" text,
	"cost" numeric(9, 2) NOT NULL,
	"repair_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brands" ADD CONSTRAINT "brands_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "carts" ADD CONSTRAINT "carts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_item_id_product_items_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_serial_serial_numbers_serial_number_fk" FOREIGN KEY ("product_serial") REFERENCES "public"."serial_numbers"("serial_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_feature_id_product_details_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."product_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "serial_numbers" ADD CONSTRAINT "serial_numbers_product_item_id_product_items_id_fk" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_cases" ADD CONSTRAINT "warranty_cases_product_id_admins_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_details" ADD CONSTRAINT "warranty_details_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warranty_details" ADD CONSTRAINT "warranty_details_product_serial_serial_numbers_serial_number_fk" FOREIGN KEY ("product_serial") REFERENCES "public"."serial_numbers"("serial_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admins_id_idx" ON "admins" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "brands_id_idx" ON "brands" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "carts_id_idx" ON "carts" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "carts_customer_id_idx" ON "carts" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "categories_id_idx" ON "categories" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customers_id_idx" ON "customers" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_id_idx" ON "orders" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_customer_id_idx" ON "orders" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_details_products_id_idx" ON "order_details" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_details_products_order_id_idx" ON "order_details" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_details_products_produdct_serial_id_idx" ON "order_details" USING btree ("product_serial");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_id_idx" ON "products" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_name_idx" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_feature_id_idx" ON "products" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_idx" ON "products" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_items_id_idx" ON "product_items" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_items_SKU_idx" ON "product_items" USING btree ("sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_items_product_id_idx" ON "product_items" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "serial_numbers_id_idx" ON "serial_numbers" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "serial_numbers_serial_number_idx" ON "serial_numbers" USING btree ("serial_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "serial_numbers_product_item_id_idx" ON "serial_numbers" USING btree ("product_item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_id_idx" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_phone_number_idx" ON "users" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_name_idx" ON "users" USING btree ("name");