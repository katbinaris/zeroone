import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { builtinModules } from "module";

// https://vitejs.dev/config
export default defineConfig({
  mode: 'development',
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  plugins: [
    eslint({
      cache: true,
      failOnError: false,
    }),
  ],
  build: {
    minify: false, //process.env.MODE !== "development",
    rollupOptions: {
      external: ["electron", "serialport", ...builtinModules]
    }
  },
})
