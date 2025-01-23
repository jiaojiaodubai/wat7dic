import type { Theme } from 'vitepress'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { searchParams } from '../../src/composables/utils'
import CustomLayout from './LayoutPatcher.vue'
import './style.css'
import './custom.css'
// https://element-plus.org/zh-CN/guide/dark-mode.html
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  extends: DefaultTheme,
  // https://vitepress.dev/guide/custom-theme
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    })
    app.provide('searchParams', searchParams)
  },
} satisfies Theme
