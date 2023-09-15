import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'$types': './src/types',
			'$types/*': './src/types/*',
		},
	},
	preprocess: [ vitePreprocess() ],
};

export default config;
