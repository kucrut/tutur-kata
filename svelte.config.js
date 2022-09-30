import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'$types': './src/types',
			'$types/*': './src/types/*',
			'$utils': './src/utils',
			'$utils/*': './src/utils/*',
		},
	},
};

export default config;
