import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import windicss from 'vite-plugin-windicss';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$stores: path.resolve('./src/stores')
				}
			},
			ssr: {
				noExternal: ["@fortawesome/free-solid-svg-icons"],
			},
			plugins: [
				windicss()
			],
			server: {
				port: 1234
			}
		}
	}
};

export default config;
