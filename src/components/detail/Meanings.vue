<script setup lang="ts">
import { useData } from 'vitepress'
import Sentences from './Sentences.vue'
import LinkedText from './LinkedText.vue'
import { flatten } from '../../composables/utils'

const params = useData().params
const entry = params.value?.entry as Entry
</script>

<template>
  <div v-for="(meaning, index) in entry.meanings" class="meaning hanging" style="padding-top: 15px;">
    <div class="order">
      <el-tag type="success" size="large" effect="dark" round style="font-weight: bold;width: 2rem;">
        <template v-if="entry.meanings.length > 1">
          {{ index + 1 }}
        </template>
        <template v-else>
          义
        </template>
      </el-tag>
    </div>
    <!-- el-text.line-height: 24; el-tag.height: 32, padding-top = (32-24)/2 -->
    <div clase="content" style="padding-top: 4px;">
      <div class="description">
        <LinkedText :list="meaning.descriptions.zh" type="success" size="large" />
        <br />
        <el-text type="info" size="large">
          {{ flatten(meaning.descriptions.en) }}
        </el-text>
      </div>
      <div v-for="word in meaning.words" class="word" style="padding-top: 10px;">
        <div v-if="flatten(word.format) !== entry.characters[0]" class="word">
          <div class="hanging">
            <div class="order">
              <el-tag type="primary" effect="dark" round style="font-size: 1rem;">
                {{ flatten(word.format) }}
              </el-tag>
            </div>
            <div class="content">
              <div class="description">
                <LinkedText :list="word.descriptions.zh" type="primary" />
                <br />
                <el-text type="info">
                  {{ flatten(word.descriptions.en) }}
                </el-text>
              </div>
              <Sentences v-model="word.sentences" />
            </div>
          </div>
        </div>
        <div v-else>
          <Sentences v-model="word.sentences" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hanging {
  display: flex;
  align-items: flex-start;
}

/* .sentences:not(:first-child) {
  padding-top: 8px;
} */

.order {
  padding-right: 0.5rem;
  flex-shrink: 0;
}
</style>
