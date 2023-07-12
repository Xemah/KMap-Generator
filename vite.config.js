import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default {
	plugins: [svelte()],
	resolve: {
		alias: {
			'@': path.resolve('./src'),
		},
	},
};
