import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        vue({ reactivityTransform: true }),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        compilerOptions: {
            isCustomElement: ['router-link']
        }
    },
})
