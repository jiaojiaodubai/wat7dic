<script setup lang="ts">
import { useRouter, withBase } from 'vitepress'
import { inject } from 'vue'
import HeadTailSearch from './HeadTailSearch.vue'
import TextSearch from './TextSearch.vue'

const params = inject<SearchParma>('searchParams') as SearchParma

const router = useRouter()

function doSearch() {
  router.go(withBase('/searchResults'))
}
</script>

<template>
  <el-tabs
    v-model="params.method"
    type="card"
  >
    <el-tab-pane
      name="text"
      label="常规搜索"
    >
      <TextSearch
        v-model="params.term"
        size="large"
        class="search-module"
        @query="doSearch"
      />
    </el-tab-pane>
    <el-tab-pane
      name="headTail"
      label="声母+韵尾"
    >
      <HeadTailSearch
        v-model:heads="params.heads"
        v-model:tail="params.tail"
        size="large"
        class="search-module"
        @query="doSearch"
      />
    </el-tab-pane>
    <!-- <el-tab-pane name="manul"label="手写输入" disabled></el-tab-pane>
    <el-tab-pane name="voice" label="语音识别" disabled></el-tab-pane> -->
  </el-tabs>
</template>

<style scoped>
.search-module {
  min-width: 100%;
}
</style>
