<script setup lang="ts">
import { flatten } from '../composables/utils';

  const props = defineProps<{
    entry: SearchEntry
  }>()
  const codes = props.entry.unicode.match(/U\+[A-F\d]+/g)
  const words = Array.from(
    new Set(props.entry.words
      .map(word => flatten(word))
      .filter(word => word !== props.entry.characters[0]))
  ).join('；')
</script>

<template>
  <el-card shadow="hover" style="width: 500px;">
    <template #header>
      <el-text size="large" style="font-weight: bold;">
        {{ entry.characters[0] }}
      </el-text>
      <template v-if="entry.characters.length > 1">
        <el-divider direction="vertical" />
        <el-space>
          <template v-for="(value, index) in entry.characters">
            <el-text v-if="index > 0">
              {{ value }}
            </el-text>
          </template>
        </el-space>
      </template>
    </template>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="Unicode" :span="2">
        <el-space>
          <template v-for="code in codes">
            {{ code }}
          </template>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="Jyutping++" :span="2">
        {{ entry.jyutping }}
      </el-descriptions-item>
      <el-descriptions-item label="声母" width="129.18px">
        {{ entry.head.toUpperCase() }}
      </el-descriptions-item>
      <el-descriptions-item label="韵尾" width="129.18px">
        {{ entry.tail }}
      </el-descriptions-item>
      <el-descriptions-item label="组词">
        {{ words }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
