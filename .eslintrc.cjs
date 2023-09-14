module.exports = {
	root: true,
	extends: [
		'@sveltejs',
		'plugin:svelte/recommended',
		'plugin:@wordpress/eslint-plugin/custom',
		'plugin:@wordpress/eslint-plugin/esnext',
		'plugin:@wordpress/eslint-plugin/jsdoc',
		'plugin:@typescript-eslint/recommended',
	],
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	globals: {
		BufferEncoding: false,
		globalThis: false,
		NodeJS: false,
	},
	overrides: [
		{
			files: [ '*.html', '*.svelte' ],
			parser: 'svelte-eslint-parser',
		},
		{
			files: [ '*.ts' ],
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 13, // es2022
		sourceType: 'module',
	},
	plugins: [ '@typescript-eslint' ],
	rules: {
		'arrow-parens': [ 'error', 'as-needed' ],
		'camelcase': 'off',
		// See https://github.com/sveltejs/eslint-plugin-svelte3/issues/41
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxBOF: 2,
				maxEOF: 1,
			},
		],
		'quote-props': [ 'error', 'consistent' ],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		// Plugins
		// Need to wait for WP's config to catch up with the latest jsdoc plugin.
		'jsdoc/no-undefined-types': 'off',
		'jsdoc/check-param-names': 'off',
		'jsdoc/require-param': 'off',
		'jsdoc/require-param-type': 'off',
		'jsdoc/valid-types': 'off',
	},
};
