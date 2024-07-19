<script setup lang="ts">
import { useData } from 'vitepress'

const params = useData().params
const entry = params.value?.entry as Entry
</script>

<template>
  {{ entry.characters[0] }}<template v-if="entry.characters.length > 1">
    <el-divider direction="vertical" />
    <el-space>
      <template v-for="(value, index) in entry.characters">
        <!-- Info https://element-plus.org/zh-CN/component/color.html -->
        <span v-if="index > 0" style="color: #909399;">
          {{ value }}
        </span>
      </template>
    </el-space>
  </template>
</template>