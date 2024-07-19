<script setup lang="ts">
const props = defineProps<{
  list: TextList;
  size?: 'default' | 'small' | 'large';
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}>()
</script>

<template>
  <template v-for="part in props.list">
    <el-text v-if="typeof part === 'string'" :size="size" :type="type">
      {{ part }}
    </el-text>
    <el-tooltip v-else placement="top-start">
      <template #content>
        <el-text size="large" type="primary">
          {{ part.char }}
        </el-text>
      </template>
      <el-text tag="a" :href="part.id" :size="size" :type="type">
        {{ part.char }}
      </el-text>
    </el-tooltip>
  </template>
</template>
