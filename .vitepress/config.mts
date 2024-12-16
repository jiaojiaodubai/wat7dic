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

    footer: {
      message: '友情链接：<a href="https://jyutdict.org/">泛粤大典</a> | <a href="http://yedict.com/">叶典</a> | <a href="https://qxk.bnu.edu.cn/#/">汉字全息资源应用系统</a> | <a href="https://zi.tools/">字统网</a> | <a href="http://cheonhyeong.com/Simplified.html">天珩的小站</a> | <a href="https://zhongguoyuyan.cn/index">中国语言资源保护工程采录展示平台</a> | <a href="https://fangyan.xunfei.cn/#/">讯飞方言保护计划</a>',
      copyright: 'Copyright © 2024-present <a href="https://github.com/jiaojiaodubai">jiaojiaodubai</a> & <a href="https://github.com/1028867764">之音饲料馆</a>'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiaojiaodubai/wat7dic' }
    ],

    outline: {
      label: "页面导航",
      level: [2, 3],
    },
  },
  vite
})
