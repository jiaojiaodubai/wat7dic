<script setup lang="ts">
import { useResizeObserver, useUrlSearchParams } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'
import SubDbFilter from './SubDbFilter.vue'

const cardCounts = ref(5)
const subDbs = ref<string[]>([])

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
    // 如果不对subDbs判断非空，则subDbs为空时，所有词条都会被过滤掉，导致ids无法填满，陷入死循环
    if (!ids.value.includes(randomId) && subDbs.value.length !== 0 ? subDbs.value.includes(entry.subDB) : true) {
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

watch(subDbs, () => {
  ids.value = ids.value.filter((id: string) => {
    const entry = entries.find(entry => entry.id === id)
    return entry && (subDbs.value.length !== 0 ? subDbs.value.includes(entry.subDB) : true)
  })
  updateIds()
})

const results = computed(() => {
  return entries.filter(entry => ids.value.includes(entry.id))
})

const cards = useTemplateRef('cards')
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
      <SubDbFilter v-model="subDbs" @change="onSubDbsChange" />
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
