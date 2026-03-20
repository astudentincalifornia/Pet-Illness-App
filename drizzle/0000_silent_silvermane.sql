CREATE TABLE `pets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`brief` text NOT NULL,
	`emergency_vet_phone` text NOT NULL,
	`type_id` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_pets_type_id` ON `pets` (`type_id`);