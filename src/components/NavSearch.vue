<script setup lang="ts">
  import TextSearch from './TextSearch.vue'
  import HeadTailSearch from './HeadTailSearch.vue'
  import { useUrlSearchParams } from '@vueuse/core'
  import { toUrlTerm } from '../composables/utils'
  import { useRouter } from 'vitepress';

  const params: SearchParma = useUrlSearchParams('history')
  // 为了方便地设置安全默认值
  const urlMethod = toRef(params, 'method', 'text')
  const urlTerm = toRef(params, 'term', '')

  const text: Ref<string> = ref('')
  const heads: Ref<string[]> = ref([])
  const tail: Ref<string> = ref('')

  if (urlMethod.value === 'text') {
    text.value = urlTerm.value;
  } else if (urlMethod.value === 'headTail') {
    heads.value = urlTerm.value.split(';')[0].split(',');
    tail.value = urlTerm.value.split(';')[1];
  }

  watch([urlMethod, text, heads, tail], () => {
    urlTerm.value = toUrlTerm(urlMethod.value, text.value, heads.value, tail.value);
  })

  const router = useRouter()
  function doSearch() {
    /* 使用自行维护的变量来构造路由参数，以便可以在详情页进行搜索 */
    router.go(`./searchResults?${new URLSearchParams({
      method: urlMethod.value,
      term: toUrlTerm(urlMethod.value, text.value, heads.value, tail.value)
    }).toString()}`);
  }
</script>

<template>
  <div style="
    padding-left: 32px;
    display: inline-flex;
    align-items: center;
  ">
     <el-select
      v-model="urlMethod"
      style="width: 110px"
    >
      <el-option label="常规搜索" value="text" />
      <el-option label="声母+韵尾" value="headTail" />
      <el-option label="手写输入" value="manul" disabled/>
      <el-option label="语音识别" value="voice" disabled/>
    </el-select>
    <el-divider direction="vertical" />
    <TextSearch
      v-if="urlMethod === 'text'"
      v-model="text"
      class="search-module"
      @query="doSearch"
    />
    <HeadTailSearch
      v-else-if="urlMethod === 'headTail'"
      v-model:heads="heads"
      v-model:tail="tail"
      class="search-module"
      @query="doSearch"
    />
  </div>
</template>

<style scoped>
.search-module {
  max-width: 650px;
  min-width: 650px;
}
</style>