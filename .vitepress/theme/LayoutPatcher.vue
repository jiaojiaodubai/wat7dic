<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
// 不能使用tsconfig.json中的路径别名
import MainSearch from '../../src/components/MainSearch.vue'
import NavSearch from '../../src/components/NavSearch.vue'

const { Layout } = DefaultTheme
// 为了使用响应式API，我们在组件中使用主题插槽，而不是在index.ts中
const { frontmatter } = useData()

</script>

<template>
  <Layout>
    <template #home-hero-info-after>
      <MainSearch style="padding-top: 32px; padding-bottom: 6px;" />
    </template>
    <template #nav-bar-content-before>
      <NavSearch v-if="frontmatter.showSearch === true" />
    </template>
  </Layout>
</template>