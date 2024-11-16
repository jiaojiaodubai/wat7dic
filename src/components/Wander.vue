<script setup lang="ts">
// import { Refresh } from '@element-plus/icons-vue'
import { data as entries } from '../searchEntries.data'
import DetailCard from './EntryCard.vue'

const cardCounts = ref(5)

function genIndice(count: number, history: number[] = []) {
  while (history.length < count) {
    const randomIndex = Math.floor(Math.random() * entries.length);
    if (!history.includes(randomIndex)) {
      history.push(randomIndex);
    }
  }
  return history;
}

const indices = ref(genIndice(cardCounts.value))

function onChanged() {
  if (cardCounts.value < indices.value.length) {
    indices.value = indices.value.slice(0, cardCounts.value);
  } else if (cardCounts.value > indices.value.length) {
    indices.value = genIndice(cardCounts.value, indices.value);
  }
}

function reload() {
  indices.value = genIndice(cardCounts.value);
}

const results = computed(() => {
  return indices.value.map(index => entries[index]).filter(entry => entry)
})

</script>

<template>
  <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
    ">
    <div class="slider start-end">
      <el-text>词条数量：</el-text>
      <el-slider v-model="cardCounts" :min="1" :max="25" show-input @change="onChanged" />
    </div>
    <el-space direction="vertical">
      <a v-for="entry in results" :href="`./entry/${entry.id}`">
        <DetailCard :entry="entry" />
      </a>
    </el-space>
    <div class="start-end">
      <el-button @click="reload">重新加载</el-button>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped>

.start-end {
  padding-top: 8px;
  padding-bottom: 8px;
}

.slider {
  width: 547px;
  max-width: 100%;
  min-width: 320px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.slider>.el-text {
  white-space: nowrap;
}
</style>
