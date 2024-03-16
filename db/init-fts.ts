import { Article, db, sql } from 'astro:db';

export default async function initFts() {
	await db.batch([
		// Clean up any existing table if it exists.
		db.run(sql`DROP TABLE IF EXISTS UDHRArticles`),
		// Create virtual full-text search table.
		db.run(
			sql`CREATE VIRTUAL TABLE UDHRArticles USING FTS5(
				title UNINDEXED,
				content,
				tokenize = 'porter unicode61 remove_diacritics 2'
			);`
		),
		// Insert content into the database.
		db.run(sql`INSERT INTO UDHRArticles (title, content) SELECT title, content FROM ${Article};`),
	]);
}
