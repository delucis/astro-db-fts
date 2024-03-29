import db from '@astrojs/db';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [db()],
	output: 'server',
	adapter: vercel(),
});
