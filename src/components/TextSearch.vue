<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  size?: ELSize
}>()

const emits = defineEmits<{
  (event: 'query', method: 'text'): void
}>()

const searchTerm = defineModel<string>({ required: true })
const isSmallScreen = computed(() => {
  const { width } = useWindowSize()
  return width.value < 595
})
const searchTip = '请输入汉字（如“玉”）、粤拼扩展（如“njuk9”）或Unicode（如“U+7389”）'

function sendText() {
  if ([
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
    // https://zhuanlan.zhihu.com/p/33335629
    /\p{Script=Han}/u,
    /[a-z]+\d{0,2}(\D|$)/,
    /\bU\+[A-F\d]+/,
  ].some(regexp => regexp.test(searchTerm.value))) {
    emits('query', 'text')
    return
  }
  ElMessage({
    message: '输入无效，请检查输入内容',
    type: 'warning',
  })
}
</script>

<template>
  <div>
    <el-tooltip v-if="isSmallScreen" :content="searchTip" placement="top">
      <el-input
        v-model="searchTerm"
        class="text-input"
        :size="props.size"
        clearable
        @keydown.enter="sendText"
      >
        <template #append>
          <el-button
            :icon="Search"
            :size="props.size"
            @click="sendText"
          />
        </template>
      </el-input>
    </el-tooltip>
    <el-input
      v-else
      v-model="searchTerm"
      class="text-input"
      :placeholder="searchTip"
      :size="props.size"
      clearable
      @keydown.enter="sendText"
    >
      <template #append>
        <el-button
          :icon="Search"
          :size="props.size"
          @click="sendText"
        />
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
