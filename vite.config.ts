import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
// tailwindcss插件
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// 自动导入组件
import AutoImport from "unplugin-auto-import/vite";
// 自动导入 src/components 组件
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Icons from "unplugin-icons/vite";
// https://vitejs.dev/config/
export default defineConfig({
  // 配置代理
  server: {
    port: 8081,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
  plugins: [
    vue(),
    // element plus 组件自动按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // vue 组件自动导入
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 加载svg
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/icons/svg")], // src/icons/svg 资源文件夹
    }),
    // unplugin icon
    Icons({
      // 实验性功能 当您导入图标时，它会自动检测合适的包管理器（npm、yarn 或 pnpm）来安装图标集。
      autoInstall: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
      },
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
