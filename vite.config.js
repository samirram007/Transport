/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import mkcert from 'vite-plugin-mkcert';
// https://vite.dev/config/
// if (typeof window !== 'undefined') {
//   scan({
//     enabled: true,
//     log: true, // logs render info to console (default: false)
//   });
// }
// const ReactCompilerConfig = { /* ... */ };
export default defineConfig({

  plugins: [
    
    // scan({
    //   enabled: false,
    //   log: false,  
    // }),
    react({
      babel: {
        plugins: [
          // ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
    mkcert(),
    compression({
      algorithm: 'gzip', // Specify the compression algorithm
      ext: '.gz', // File extension for compressed files
      threshold: 1024, // Minimum size in bytes for files to be compressed
    }),
    visualizer({
      filename: './stats.html', // Output file for the visualizer report
      open: false, // Automatically open the visualizer report in the browser
    })],
  consistentExport: true,
  server: {
    https: true, // Enable HTTPS
    hmr: {
      overlay: true, // Disable the HMR overlay
    },
    open: false,
    // proxy: {
    //   '/api': {
    //     target: 'https://transport-api.local',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  build: {
    outDir: 'dist', // Ensure correct output directory
    // minify: true,
    // target: 'esnext',
    // modulePreload: true,
    // cssCodeSplit: true,
    // cssMinify: true,
    // lib: {
    //   entry: "index.html",
    //   name: "GoSchool",
    //   fileName: "go-school",
    //   formats: ["es", "cjs"],
    // },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
