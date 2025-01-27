<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter, withBase } from 'vitepress'
import { computed, inject } from 'vue'
import MainSearch from '../components/MainSearch.vue'
import HeadTailSearch from './HeadTailSearch.vue'
import TextSearch from './TextSearch.vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 900)

const isOpenDrawer = ref(false)

const params = inject<SearchParma>('searchParams') as SearchParma
const method = ref<QueryMethod>(params.method)
const term = ref(params.term)
const heads = ref<string[]>(params.heads)
const tail = ref(params.tail)

const router = useRouter()
// TODO: wait for https://github.com/vuejs/vitepress/issues/4461
// let doSearch: () => void
// onMounted(() => {
//   doSearch = () => {
//     const newUrl = withBase(`/searchResults?${new URLSearchParams({
//       method: method.value,
//       term: toUrlTerm(method.value, text.value, heads.value, tail.value),
//     }).toString()}`)
//     if (router.route.path === '/searchResults.html') {
//       window.location.assign(newUrl)
//     }
//     else {
//       router.go(newUrl)
//     }
//   }
// })
function doSearch() {
  if (router.route.path === withBase('/searchResults.html')) {
    params.method = method.value
    if (method.value === 'text') {
      params.term = term.value
    }
    else if (method.value === 'headTail') {
      params.heads = heads.value
      params.tail = tail.value
    }
  }
  else {
    router.go(withBase('/searchResults.html'))
  }
}
</script>

<template>
  <el-drawer
    v-model="isOpenDrawer"
    direction="ttb"
    :with-header="false"
    size="35%"
  >
    <MainSearch />
  </el-drawer>
  <div
    v-if="isMobile"
    class="VPNavBarSearch"
  >
    <el-icon
      style="vertical-align: middle"
      @click="isOpenDrawer = true"
    >
      <Search />
    </el-icon>
  </div>
  <div
    v-else
    class="VPNavBarSearch"
  >
    <el-select
      v-model="method"
      style="width: 110px"
    >
      <el-option
        label="常规搜索"
        value="text"
      />
      <el-option
        label="声母+韵尾"
        value="headTail"
      />
      <el-option
        label="手写输入"
        value="manul"
        disabled
      />
      <el-option
        label="语音识别"
        value="voice"
        disabled
      />
    </el-select>
    <el-divider direction="vertical" />
    <TextSearch
      v-if="method === 'text'"
      v-model="term"
      class="search-module"
      @query="doSearch"
    />
    <HeadTailSearch
      v-else-if="method === 'headTail'"
      v-model:heads="heads"
      v-model:tail="tail"
      class="search-module"
      @query="doSearch"
    />
  </div>
</template>

<style scoped>
.VPNavBarSearch {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .VPNavBarSearch {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .VPNavBarSearch {
    padding-left: 32px;
  }
}
</style>
