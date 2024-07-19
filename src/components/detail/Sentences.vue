<script setup lang="ts">
import LinkedText from './LinkedText.vue'
import Sentence from './Sentence.vue'
const sentences = defineModel<Sentence[]>({ required: true })
</script>

<template>
  <div class="sentences">
    <div v-for="(sentence, index) in sentences" class="hanging">
      <div v-if="sentences.length > 1" class="order" style="width: 1.5rem;">
        <el-text>
          {{ index + 1 }}.
        </el-text>
      </div>
      <div class="content">
        <Sentence label="玉">
          <LinkedText :list="sentence.format" type="primary" />
        </Sentence>
        <Sentence label="普" type="info">
          <LinkedText :list="sentence.descriptions.zh" type="info" />
        </Sentence>
        <Sentence label="英" type="info">
          <LinkedText :list="sentence.descriptions.en" type="info" />
        </Sentence>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hanging {
  display: flex;
  align-items: flex-start;
}
</style>
