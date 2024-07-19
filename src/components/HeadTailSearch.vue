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
  'c',
  'd-dd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ng',
  'nj',
  'p',
  's',
  'sl',
  't',
  'w',
  'z',
  '多声母',
  '特殊',
]

const tails = [
  'm',
  'n',
  'ng',
  'p',
  't',
  'k',
  '丢ng',
  '丢k',
  '元音韵尾',
  '特殊',
]

function sendHeadTail() {
  if (!choosedHeads.value.length || !choosedTail.value) {
    ElMessage({
      message: '输入无效，未选择声母或韵尾',
      type: 'warning',
    });
    return;
  }
  emits('query', 'headTail');
}
</script>

<template>
  <div style="display: inline-flex;flex-direction:row;">
    <el-select v-model="choosedHeads" multiple :multiple-limit="5" clearable placeholder="选择声母" :size="props.size"
      style="flex-grow: 1;">
      <el-option v-for="(str, index) in heads" :key="index" :label="str" :value="str" />
    </el-select>
    <el-select v-model="choosedTail" placeholder="选择韵尾" :size="props.size" style="width: 160px">
      <el-option v-for="(str, index) in tails" :key="index" :label="str" :value="str" />
    </el-select>
    <div>
      <el-button :icon="Search" :size="props.size" @click="sendHeadTail" style="
          color: var(--el-color-info);
          background-color: var(--el-fill-color-light);
          border-color: var(--el-button-border-color);
        " />
    </div>
  </div>
</template>
