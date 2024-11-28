<script setup lang="ts">
import { useUrlSearchParams, useResizeObserver } from '@vueuse/core'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'

const cardCounts = ref(5)

const params = useUrlSearchParams()

const ids: Ref<string[]> = ref([])

function updateUrl() {
  params.ids = ids.value.join(',');
}

function updateIds(reset: boolean = false) {
  if (reset) ids.value = [];
  while (ids.value.length < cardCounts.value) {
    const randomIndex = Math.floor(Math.random() * entries.length);
    const randomId = entries[randomIndex].id;
    if (!ids.value.includes(randomId)) {
      ids.value.push(randomId);
    }
  }
  console.log(`ids: ${ids.value}`);
  updateUrl();
}

if (typeof params.ids === 'string' && params.ids.length) {
  ids.value = params.ids.split(',');
  cardCounts.value = ids.value.length;
} else {
  updateIds(true);
}

function onChanged() {
  if (cardCounts.value < ids.value.length) {
    ids.value = ids.value.slice(0, cardCounts.value);
    // ids 截断时触发更新
    updateUrl();
  } else if (cardCounts.value > ids.value.length) {
    updateIds();
  }
}

const results = computed(() => {
  return entries.filter(entry => ids.value.includes(entry.id));
})

const cards = ref<HTMLElement | null>(null)
const cardWidth = ref<number>(0)

// 监听卡片尺寸变化,动态更改slider容器的宽度
useResizeObserver(cards, (entries) => {
  cardWidth.value = entries[0].contentRect.width;
})

</script>

<template>
  <div class="wander-view" >
    <div class="slider" :style="{ width: cardWidth + 'px' }">
      <el-text>词条数量：</el-text>
      <el-slider v-model="cardCounts" :min="1" :max="25" show-input @change="onChanged" />
    </div>
    <el-space direction="vertical" ref="cards">
      <a v-for="entry in results" :href="`./entry/${entry.id}`">
        <DetailCard :entry="entry" />
      </a>
    </el-space>
    <div>
      <el-button @click="updateIds(true)">重新加载</el-button>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped>
.wander-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wander-view>:first-child, .wander-view>:last-child {
  padding-top: 8px;
  padding-bottom: 8px;
}

.slider {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.slider>.el-text {
  white-space: nowrap;
}
</style>
