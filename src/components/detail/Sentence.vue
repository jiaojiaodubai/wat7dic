<script setup lang="ts">
defineProps<{
  label: string;
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}>()
</script>

<template>
  <div style="
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
    padding-bottom: 2px;
    ">
    <div style="padding-right: 0.5rem;">
      <el-tag :type="type" round>
        {{ label }}
      </el-tag>
    </div>
    <slot></slot>
  </div>
</template>