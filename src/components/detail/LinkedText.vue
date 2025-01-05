<script setup lang="ts">
const props = defineProps<{
  list: TextList
  size?: 'default' | 'small' | 'large'
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}>()
</script>

<template>
  <template v-for="part, index in props.list">
    <template v-if="typeof part === 'string'">
      <el-text
        :key="`string-${index}`"
        :size="size"
        :type="type"
      >
        {{ part }}
      </el-text>
    </template>
    <template v-else>
      <ClientOnly :key="`object-${index}`">
        <el-tooltip placement="top-start">
          <template #content>
            <el-text
              size="large"
              type="primary"
            >
              {{ part.char }}
            </el-text>
          </template>
          <el-text
            tag="a"
            :href="part.id"
            :size="size"
            :type="type"
          >
            {{ part.char }}
          </el-text>
        </el-tooltip>
      </ClientOnly>
    </template>
  </template>
</template>
