import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
// https://element-plus.org/zh-CN/guide/dark-mode.html
import 'element-plus/theme-chalk/dark/css-vars.css'
import CustomLayout from "./LayoutPatcher.vue";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


export default {
  extends: DefaultTheme,
  // https://vitepress.dev/guide/custom-theme
  Layout: CustomLayout,
  enhanceApp({ app, _router, _siteData }) {
    app.use(ElementPlus, {
      locale: zhCn,
    })
  }
} satisfies Theme
