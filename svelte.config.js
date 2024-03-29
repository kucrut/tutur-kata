import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'$types': './src/types',
			'$types/*': './src/types.ts',
		},
	},
	preprocess: [ vitePreprocess() ],
};

export default config;
