<script setup lang="ts">
import { useResizeObserver, useUrlSearchParams } from '@vueuse/core'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'

const cardCounts = ref(5)
const subDBs = {
  Common: '通用字',
  WriteableChars: '特色字',
  WriteableWords: '特色词',
  UnwriteableChars: '有音无字',
  Pended: '写法待定',
}
const subDBFilter = ref<string[]>(Object.keys(subDBs))

const params = useUrlSearchParams()

const ids: Ref<string[]> = ref([])

function updateUrl() {
  params.ids = ids.value.join(',')
}

function updateIds(reset: boolean = false) {
  if (reset) {
    ids.value = []
  }
  while (ids.value.length < cardCounts.value) {
    const randomIndex = Math.floor(Math.random() * entries.length)
    const entry = entries[randomIndex]
    const randomId = entry.id
    if (!ids.value.includes(randomId) && subDBFilter.value.includes(entry.subDB)) {
      ids.value.push(randomId)
    }
  }
  updateUrl()
}

if (typeof params.ids === 'string' && params.ids.length) {
  ids.value = params.ids.split(',')
  cardCounts.value = ids.value.length
}
else {
  updateIds(true)
}

function onCardCountsChange() {
  if (cardCounts.value < ids.value.length) {
    ids.value = ids.value.slice(0, cardCounts.value)
    // ids 截断时触发更新
    updateUrl()
  }
  else if (cardCounts.value > ids.value.length) {
    updateIds()
  }
}

function onSubDBFilterChange() {
  ids.value = ids.value.filter((id: string) => {
    const entry = entries.find(entry => entry.id === id)
    return entry && (subDBFilter.value.includes(entry.subDB))
  })
  updateIds()
}

const results = computed(() => {
  return entries.filter(entry => ids.value.includes(entry.id))
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
  <div id="wander-results" class="results-view">
    <div
      id="toolbar"
      :style="{ width: `${cardWidth}px` }"
    >
      <span id="cardCounts">
        <el-text>词条数量：</el-text>
        <ClientOnly>
          <el-input-number
            v-model="cardCounts"
            :min="1"
            :max="25"
            @change="onCardCountsChange"
          />
        </ClientOnly>
      </span>
      <span id="subDBFilter">
        <el-text>子数据库：</el-text>
        <ClientOnly>
          <el-select
            v-model="subDBFilter"
            multiple
            clearable
            collapse-tags
            collapse-tags-tooltip
            placeholder="选择子数据库"
            @change="onSubDBFilterChange"
          >
            <el-option
              v-for="label, key in subDBs"
              :key="key"
              :label="label"
              :value="key"
            />
          </el-select>
        </ClientOnly>
      </span>
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
    <div>
      <el-button @click="updateIds(true)">
        重新加载
      </el-button>
    </div>
  </div>
  <el-backtop
    :right="100"
    :bottom="100"
  />
</template>

<style scoped>
#toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

#toolbar > * {
  display: inline-flex;
}

#toolbar .el-text {
  white-space: nowrap;
}

#cardCounts .el-input-number {
  width: 7rem;
}

#subDBFilter .el-select {
  width: 11rem;
}

@media (max-width: 470px) {
  #toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  #toolbar > * > :nth-child(2) {
    width: 100%;
  }
}
</style>
