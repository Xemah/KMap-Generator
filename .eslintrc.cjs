module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	rules: {
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		'no-empty': ['off'],
		'no-unused-vars': ['off'],
		'svelte/valid-compile': ['off'],
	},
};
