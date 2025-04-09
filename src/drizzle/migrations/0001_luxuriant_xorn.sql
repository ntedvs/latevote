ALTER TABLE "responses" RENAME COLUMN "recipientIds" TO "votes";--> statement-breakpoint
ALTER TABLE "rounds" RENAME COLUMN "revealed" TO "released";--> statement-breakpoint
ALTER TABLE "superlatives" RENAME COLUMN "name" TO "title";