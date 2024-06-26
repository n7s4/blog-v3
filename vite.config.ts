import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
// tailwindcss插件
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// 自动导入组件
import AutoImport from 'unplugin-auto-import/vite';
// 自动导入 src/components 组件
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Icons from 'unplugin-icons/vite';
// https://vitejs.dev/config/
export default defineConfig({
  // 配置代理
  server: {
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/api/, ""),  
      }
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(),
    // element plus 组件自动按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    // vue 组件自动导入
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 加载svg
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/icons/svg")] // src/icons/svg 资源文件夹
    }),
    // unplugin icon
    Icons({
      autoInstall: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      }
    },
  },
})
