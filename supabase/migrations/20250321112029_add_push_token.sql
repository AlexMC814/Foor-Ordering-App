alter table "public"."orders" alter column "status" set default 'New'::text;

alter table "public"."profiles" add column "expo_push_token" text;


