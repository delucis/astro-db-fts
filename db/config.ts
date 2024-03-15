import { column, defineDb, defineTable } from 'astro:db';

// https://astro.build/db/config
export default defineDb({
  tables: {
    Article: defineTable({
      columns: {
        title: column.text(),
        content: column.text(),
      },
    }),
  },
});
