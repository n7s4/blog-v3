# vite.config.js 别名配置

实测 在 windows 电脑中 可以使用 src src/ 但是不能用 /src
mac 中可以 使用 /src

```js
export default defineConfig({
  resolve: {
    alias: {
      // 去 src 下找文件
      "@": resolve(__dirname, "src"),
    },
  },
});
```

# body 样式

body 设置宽度 100vw 会出现滚动条 设置成 宽度 100% 就好了

# 解决 main.js 出现的警告

这里我们 use 了 App， 其实 app 就是 App 执行来的 他不是一个插件不能 use

```js
// false
app.use(App).use(router).use(createPinia().use(piniaPluginPersist)).mount("#app");
// right
app.use(router).use(createPinia().use(piniaPluginPersist)).mount("#app");
```

# body 滚动样式 bug

body 高度 100vh 宽度 100% overflow: auto
