<script setup lang="ts">
  import type { Ref } from 'vue'
  import { useRouter } from 'vitepress'
  import TextSearch from './TextSearch.vue'
  import HeadTailSearch from './HeadTailSearch.vue'
  import { toUrlTerm } from '../composables/utils'

  const method: Ref<QueryMethod> = ref('text')
  const text: Ref<string> = ref('')
  const heads: Ref<string[]> = ref([])
  const tail: Ref<string> = ref('')

  const router = useRouter()
  function doSearch() {
    router.go(`./searchResults?${new URLSearchParams({
      method: method.value,
      term: toUrlTerm(method.value, text.value, heads.value, tail.value)
    }).toString()}`);
  }
</script>

<template>
  <div style="
    padding-top: 32px;
    padding-bottom: 6px;
    display: flex;
    justify-content: center;
  ">
    <el-tabs v-model="method" type="card">
      <el-tab-pane name="text" label="常规搜索" >
        <TextSearch
          v-model="text" 
          size="large"
          class="search-module"
          @query="doSearch"
        />
      </el-tab-pane>
      <el-tab-pane name="headTail" label="声母+韵尾">
        <HeadTailSearch
          v-model:heads="heads"
          v-model:tail="tail"
          size="large"
          class="search-module"
          @query="doSearch"
        />
      </el-tab-pane>
      <el-tab-pane name="manul"label="手写输入" disabled></el-tab-pane>
      <el-tab-pane name="voice" label="语音识别" disabled></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.search-module {
  max-width: 650px;
  min-width: 650px;
}
</style>