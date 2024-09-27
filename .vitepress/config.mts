import { defineConfig } from 'vitepress'
import vite from "./vite.config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "鬱典",
  description: "一个在线玉林话字典",
  lang: "zh-CN",
  srcDir: "./src",
  base: '/wat7dic/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiaojiaodubai/watdict' }
    ],

    outline: {
      label: "页面导航",
      level: [2, 3],
    },
  },
  vite
})
