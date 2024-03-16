# Astro DB full-text search example

This example demonstrates creating an [FTS5 virtual table](https://sqlite.org/fts5.html) in [Astro DB](https://astro.build/db/) to power full-text search on table content.

## Summary

Neither Astro DB nor Drizzle — the ORM Astro DB build on — have bindings for FTS5 tables, so this is done manually with SQL statements and Drizzle’s [`` sql`...` `` tagged template utility](https://orm.drizzle.team/docs/sql).

1. In [`db/init-fts.ts`](./db/init-fts.ts), an FTS5 table is created and populated using an existing Astro DB table.
   (In this case it contains a row for each article of the Universal Declaration of Human Rights and is named `UDHRArticles`.)
   This method is called from [`db/seed.ts`](./db/seed.ts) to set up FTS5 in the local development environment.

2. In [`src/pages/index.astro`](./src/pages/index.astro), if a `?search` query param is sent to the server, the `UDHRArticles` table is queried for items matching the search query.

## Running locally

1. Install dependencies:

   ```sh
   pnpm i
   ```

2. Start the dev server:

   ```sh
   pnpm dev
   ```

Open the URL printed in the terminal and try searching.

## Hosting the FTS5 table on Astro Studio

Because FTS5 tables cannot be configured in [`db/config.ts`](./db/config.ts), they will not be created on the remote database when running [`astro db push`](https://docs.astro.build/en/guides/integrations-guide/db/#astro-db-push).

Instead, we will need to manually create them using the [`astro db execute`](https://docs.astro.build/en/guides/integrations-guide/db/#astro-db-execute-file-path) command.

1. Make sure you are logged-in and have linked the repository to an Astro Studio project:

   ```sh
   pnpm astro login
   pnpm astro link
   ```

2. Push your database schema — this creates any tables defined in `db/config.ts` on the remote database:

   ```sh
   pnpm astro db push
   ```

3. Execute the project seed file against the remote database to populate it and create the FTS5 table:

   ```sh
   pnpm astro db execute db/seed.ts --remote
   ```

You can now deploy your project with `astro build --remote` and use the hosted database for queries.
Make sure you add the `ASTRO_STUDIO_APP_TOKEN` environment variable with a token from the Studio dashboard to your hosting CI.

## Notes

- SQLite FTS5 has a handy [`highlight()`](https://sqlite.org/fts5.html#the_highlight_function) function.
  This is used in the search query to wrap matches in results with `<mark>`.

- In this example, I opted for a combo of FTS5’s `porter` and `unicode61` [tokenizers](https://sqlite.org/fts5.html#tokenizers).
  This should work well for English texts, but Porter stemming is not designed to handle other languages.
  Unfortunately (and kind of disappointingly), FTS5 doesn’t have support for an ICU tokenizer even though its predecessors FTS3 and FTS4 did.
