CREATE DATABASE mobile_store;
\c mobile_store;
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(50) NOT NULL,
  "password" varchar(50) NOT NULL,
  "full_name" varchar(50) NOT NULL,
  "address" varchar(150),
  "uid" uuid NOT NULL,
  "avatar" varchar(150) NOT NULL,
  "role" varchar(5) NOT NULL DEFAULT 'user',
  "phone_number" varchar(15),
  "created_at" timestamp
);

CREATE TABLE "mobiles" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar(100) NOT NULL,
  "avatar" varchar(150) NOT NULL,
  "brand_id" integer NOT NULL,
  "price" bigint NOT NULL DEFAULT 0,
  "rating" float NOT NULL DEFAULT 0,
  "updated_at" timestamp,
  "created_at" timestamp
);

CREATE TABLE "specifications" (
  "id" SERIAL PRIMARY KEY,
  "mobile_id" integer NOT NULL,
  "name" varchar(150) NOT NULL,
  "value" varchar(100) NOT NULL
);

CREATE TABLE "capacities" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(20) NOT NULL
);

CREATE TABLE "options" (
  "id" SERIAL PRIMARY KEY,
  "mobile_id" integer NOT NULL,
  "capacity_id" integer NOT NULL,
  "name" varchar(30) NOT NULL,
  "price" bigint NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "order_details" (
  "id" SERIAL PRIMARY KEY,
  "order_id" integer NOT NULL,
  "option_id" integer NOT NULL
);

CREATE TABLE "cart" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL
);

CREATE TABLE "cart_details" (
  "id" SERIAL PRIMARY KEY,
  "cart_id" integer NOT NULL,
  "option_id" integer NOT NULL
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer NOT NULL,
  "mobile_id" integer NOT NULL,
  "body" text,
  "rating" integer,
  "updated_at" timestamp,
  "created_at" timestamp
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(10) NOT NULL
);

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_details" ADD CONSTRAINT "fk_order_details_orders" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "cart" ADD CONSTRAINT "fk_cart_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cart_details" ADD CONSTRAINT "fk_cart_details_cart" FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "specifications" ADD CONSTRAINT "fk_specifications_mobiles" FOREIGN KEY ("mobile_id") REFERENCES "mobiles" ("id");

ALTER TABLE "order_details" ADD CONSTRAINT "fk_order_details_options" FOREIGN KEY ("option_id") REFERENCES "options" ("id");

ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_mobiles" FOREIGN KEY ("mobile_id") REFERENCES "mobiles" ("id");

ALTER TABLE "mobiles" ADD CONSTRAINT "fk_mobiles_brands" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "options" ADD FOREIGN KEY ("mobile_id") REFERENCES "mobiles" ("id");

ALTER TABLE "options" ADD FOREIGN KEY ("capacity_id") REFERENCES "capacities" ("id");
