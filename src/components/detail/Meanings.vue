<script setup lang="ts">
import { useData } from 'vitepress'
import { flattenTextList } from '../../composables/utils'
import LinkedText from './LinkedText.vue'
import Sentences from './Sentences.vue'

const params = useData().params
const entry = params.value?.entry as Entry
</script>

<template>
  <div
    v-for="(meaning, mIndex) in entry.meanings"
    :key="mIndex"
    class="meaning hanging"
    style="padding-top: 15px;"
  >
    <div class="order">
      <el-tag
        type="success"
        size="large"
        effect="dark"
        round
        style="font-weight: bold;width: 2rem;"
      >
        <template v-if="entry.meanings.length > 1">
          {{ mIndex + 1 }}
        </template>
        <template v-else>
          义
        </template>
      </el-tag>
    </div>
    <!-- el-text.line-height: 24; el-tag.height: 32, padding-top = (32-24)/2 -->
    <div
      clase="content"
      style="padding-top: 4px;"
    >
      <div
        v-if="meaning.descriptions.zh.length"
        class="description"
        style="padding-bottom: 10px;"
      >
        <LinkedText
          :list="meaning.descriptions.zh"
          type="success"
          size="large"
        />
        <br>
        <el-text
          type="info"
          size="large"
        >
          {{ flattenTextList(meaning.descriptions.en) }}
        </el-text>
      </div>
      <el-space
        direction="vertical"
        :size="10"
        alignment="start"
      >
        <div
          v-for="word, wIndex in meaning.words"
          :key="wIndex"
          class="word"
        >
          <div
            v-if="flattenTextList(word.format) !== entry.characters[0]"
            class="word"
          >
            <div class="hanging">
              <div class="order">
                <el-tag
                  type="primary"
                  effect="dark"
                  round
                  style="font-size: 1rem;"
                >
                  {{ flattenTextList(word.format) }}
                </el-tag>
              </div>
              <div class="content">
                <div class="description">
                  <LinkedText
                    :list="word.descriptions.zh"
                    type="primary"
                  />
                  <br>
                  <el-text type="info">
                    {{ flattenTextList(word.descriptions.en) }}
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
      </el-space>
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
