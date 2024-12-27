<script setup lang="ts">
import { useResizeObserver, useUrlSearchParams } from '@vueuse/core'
import * as OpenCC from 'opencc-js'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'

const params: SearchParma = useUrlSearchParams('history')
// 为了方便地设置安全默认值
const method = toRef(params, 'method', 'text')
const term = toRef(params, 'term', '')

function extract(regxp: RegExp) {
  return term.value.match(regxp) || []
}

const griddle = computed(() => {
  const griddle: {
    id?: string[]
    unicode?: string[]
    jyutping?: string[]
    characters?: string[]
    head?: string[]
    tail?: string
  } = {}
  if (method.value === 'text') {
    griddle.id = extract(/U\+[A-F\d]{4}-[a-z]+\d{0,2}|A\+[a-z]+\d{0,2}|[WP]\+\d+-([a-z]+\d{0,2})+/g)
    griddle.unicode = extract(/U\+[A-F\d]{4}/g)
    griddle.jyutping = extract(/[a-z]+\d{0,2}/g)
    griddle.characters = extract(/[\u4E00-\u9FFF]+/g)
  }
  else if (method.value === 'headTail') {
    griddle.head = term.value.split(';')[0].split(',')
    griddle.tail = term.value.split(';')[1]
  }
  return griddle
})

const converter = OpenCC.Converter({ from: 'tw', to: 'cn' })
const results = computed(() => {
  return entries.filter((entry) => {
    return griddle.value.id?.includes(entry.id)
      || griddle.value.unicode?.includes(entry.unicode)
      || griddle.value.jyutping?.some(gPing => /\d+$/.test(gPing) ? gPing === entry.jyutping : gPing === entry.jyutping.replace(/\d+$/, ''))
      || griddle.value.characters?.some(gChar =>
        entry.characters.some(eCHar => converter(eCHar).includes(gChar)),
      )
      || (griddle.value.head?.includes(entry.head) && griddle.value.tail === entry.tail)
  })
})

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
          <DetailCard :entry="entry" />
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
