<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  size?: ELSize
}>()

const emits = defineEmits<{
  (event: 'query', method: 'text'): void
}>()

const searchTerm = defineModel<string>({ required: true })
const isSmallScreen = ref(window.innerWidth < 595)
const searchTip = '请输入汉字（如“玉”）、粤拼扩展（如“njuk9”）或Unicode（如“U+7389”）'

function sendText() {
  if ([
    /[\u4E00-\u9FFF]/,
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

function updateScreenSize() {
  isSmallScreen.value = window.innerWidth < 595
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
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
