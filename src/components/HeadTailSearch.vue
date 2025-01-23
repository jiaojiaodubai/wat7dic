<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{
  size?: ELSize
}>()

const emits = defineEmits<{
  (event: 'query', method: 'headTail'): void
}>()

const choosedHeads = defineModel<string[]>('heads', { required: true })
const choosedTail = defineModel<string>('tail', { required: true })

const heads = [
  '0',
  'b-bb',
  'p',
  'm',
  'f',
  'd-dd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'z',
  'c',
  's',
  'j',
  'w',
  'ng',
  'nj',
  'sl',
]

const tails = [
  '陽-棚',
  '元音韵尾·平',
  '元音韵尾·上',
  '元音韵尾·去',
  'm',
  'n',
  'ng',
  'k',
  'p',
  't',
]

function sendHeadTail() {
  if (!choosedHeads.value.length || !choosedTail.value) {
    ElMessage({
      message: '输入无效，未选择声母或韵尾',
      type: 'warning',
    })
    return
  }
  emits('query', 'headTail')
}
</script>

<template>
  <div style="display: inline-flex;flex-direction:row;">
    <el-select
      v-model="choosedHeads"
      class="head-select"
      multiple
      :multiple-limit="5"
      clearable
      placeholder="选择声母"
      :size="props.size"
    >
      <el-option
        v-for="(str, index) in heads"
        :key="index"
        :label="str === '0' ? '零声母' : str"
        :value="str"
      />
    </el-select>
    <el-select
      v-model="choosedTail"
      placeholder="选择韵尾"
      :size="props.size"
      style="width: 30%; min-width: 7em;"
    >
      <el-option
        v-for="(str, index) in tails"
        :key="index"
        :label="str"
        :value="str"
      />
    </el-select>
    <el-button
      :icon="Search"
      :size="props.size"
      style="
        color: var(--el-color-info);
        background-color: var(--el-fill-color-light);
        border-color: var(--el-button-border-color);
      "
      @click="sendHeadTail"
    />
  </div>
</template>

<style scoped>
.head-select {
  flex-grow: 1;
  min-width: 24em;
}

@media (max-width: 899px) {
  .head-select {
    flex-grow: 1;
    min-width: 7em;
  }
}
</style>
