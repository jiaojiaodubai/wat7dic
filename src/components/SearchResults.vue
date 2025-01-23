<script setup lang="ts">
import { useResizeObserver, useUrlSearchParams } from '@vueuse/core'
import * as OpenCC from 'opencc-js'
import { inject, watch } from 'vue'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'

const results = ref<SearchEntry[]>([])

const urlParams = useUrlSearchParams('history')
const params = inject<SearchParma>('searchParams') as SearchParma
function getFromUrlParams(key: string) {
  const value = urlParams[key]
  return Array.isArray(value) ? value[0] : value
}
params.method = getFromUrlParams('method') || params.method
params.term = getFromUrlParams('term') || params.term
params.heads = getFromUrlParams('heads') ? getFromUrlParams('heads').split(',') : params.heads
params.tail = getFromUrlParams('tail') || params.tail

function extract(regxp: RegExp): string[] {
  return params.term.match(regxp) || []
}
const converter = OpenCC.Converter({ from: 'tw', to: 'cn' })

watch(params, () => {
  urlParams.method = params.method
  if (params.method === 'text') {
    delete urlParams.heads
    delete urlParams.tail
    urlParams.term = params.term
    const griddle = {
      id: extract(/U\+[A-F\d]{4}-[a-z]+\d{0,2}|A\+[a-z]+\d{0,2}|[WP]\+\d+-([a-z]+\d{0,2})+/g),
      unicode: extract(/U\+[A-F\d]{4}/g),
      jyutping: extract(/[a-z]+\d{0,2}/g),
      characters: extract(/\p{Script=Han}+/gu),
    }
    results.value = entries.filter((entry) => {
      return griddle.id.includes(entry.id)
        || griddle.unicode.includes(entry.unicode)
        || griddle.jyutping.some(gPing => /\d+$/.test(gPing) ? gPing === entry.jyutping : gPing === entry.jyutping.replace(/\d+$/, ''))
        || griddle.characters.some(gChar =>
          entry.characters.some(eCHar => converter(eCHar).includes(gChar)),
        )
    })
  }
  else if (params.method === 'headTail') {
    delete urlParams.term
    urlParams.heads = params.heads?.join(',')
    urlParams.tail = params.tail
    const griddle = {
      heads: params.heads,
      tail: params.tail,
    }
    results.value = entries.filter((entry) => {
      return griddle.heads.includes(entry.head) && griddle.tail === entry.tail
    })
  }
}, { immediate: true })

const cards = ref<HTMLElement | null>(null)
const cardWidth = ref<number>(0)

// 监听卡片尺寸变化,动态更改slider容器的宽度
useResizeObserver(cards, (entryContainer) => {
  if (entryContainer[0]) {
    cardWidth.value = entryContainer[0].contentRect.width
  }
})
</script>

<template>
  <div id="search-results" class="results-view">
    <template v-if="!results.length">
      <el-empty
        description="没有匹配的搜索结果"
        :image-size="200"
        style="padding-top: 13%;"
      />
    </template>
    <template v-else>
      <div
        id="toolbar"
        :style="{ width: `${cardWidth}px` }"
      >
        <el-text type="primary">
          共找到 {{ results.length }} 条结果
        </el-text>
      </div>
      <el-space ref="cards" direction="vertical">
        <a
          v-for="entry in results"
          :key="entry.id"
          :href="`./entry/${entry.id}`"
        >
          <ClientOnly>
            <DetailCard :entry="entry" />
          </ClientOnly>
        </a>
      </el-space>
    </template>
  </div>
  <el-backtop
    :right="100"
    :bottom="100"
  />
</template>

<style scoped>
#toolbar {
  display: flex;
  justify-content: center;
}
</style>
