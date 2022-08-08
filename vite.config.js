import { defineConfig } from "vite";
import windicss from 'vite-plugin-windicss';
import { sveltekit } from "@sveltejs/kit/vite";
import {resolve} from "path"


export default defineConfig({
    resolve: {
        alias: {
            $components: resolve('src/components'),
            $stores: resolve('src/stores')
        }
    },
    ssr: {
        noExternal: ["@fortawesome/free-solid-svg-icons"],
    },
    plugins: [
        sveltekit(),
        windicss()
    ],
    server: {
        port: 1234
    }
})