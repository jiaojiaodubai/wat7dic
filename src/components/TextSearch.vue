<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'

  const props = defineProps<{
    size?: ELSize;
  }>()

  const emits = defineEmits<{
    (event: 'query', method: 'text'): void;
  }>()

  const text = defineModel<string>({ required: true })

  function sendText() {
    if ([
      /[\u4e00-\u9fff]/,
      /[a-z]+\d{0,2}(\D|$)/,
      /\bU\+[A-F\d]+/
    ].some(regexp => regexp.test(text.value))) {
      emits('query', 'text');
      return;
    }
    ElMessage({
      message: '输入无效，请检查输入内容',
      type: 'warning',
    });
  }
</script>

<template>
  <div>
    <el-input
      class="text-input"
      v-model="text"
      placeholder="请输入汉字（如“玉”）、粤拼扩展（如“njuk9”）或Unicode（如“U+7389”）"
      :size="props.size"
      clearable
      @keydown.enter="sendText"
    >
      <template #append>
        <el-button :icon="Search" :size="props.size" @click="sendText"/>
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.text-input {
  min-width: 542px;
}

@media (max-width: 899px) {
  .text-input {
    min-width: 278px;
  }
}
</style>
