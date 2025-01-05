<script setup lang="ts">
import { useData } from 'vitepress'

const params = useData().params
const entry = params.value?.entry as Entry
const codes = entry.unicode.match(/U\+[A-F\d]+/g)
</script>

<template>
  <el-descriptions
    :column="2"
    border
  >
    <el-descriptions-item
      label="Unicode"
      :span="2"
    >
      <el-space>
        <template v-for="code in codes">
          {{ code }}
        </template>
      </el-space>
    </el-descriptions-item>
    <el-descriptions-item label="Jyutping++">
      {{ entry.jyutping }}
    </el-descriptions-item>
    <el-descriptions-item label="拼音">
      {{ entry.pinyin }}
    </el-descriptions-item>
    <el-descriptions-item label="声母">
      {{ entry.head }}
    </el-descriptions-item>
    <el-descriptions-item label="韵尾">
      {{ entry.tail }}
    </el-descriptions-item>
    <el-descriptions-item label="其他字形">
      <template v-for="(char, index) in entry.characters">
        <el-tag
          v-if="index > 0"
          :key="index"
          style="font-size: 14px;"
        >
          {{ char }}
        </el-tag>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="选字争议性">
      <template v-if="entry.controversial === 0">
        <el-tag type="success" effect="dark" round>
          几乎无争议
        </el-tag>
      </template>
      <template v-if="entry.controversial === 1">
        <el-tag type="warning" effect="dark" round>
          争议较大
        </el-tag>
      </template>
      <template v-if="entry.controversial === 2">
        <el-tag type="danger" effect="dark" round>
          强行训读
        </el-tag>
      </template>
    </el-descriptions-item>
    <el-descriptions-item
      label="多音字"
    >
      <el-space>
        <a
          v-for="id in Object.keys(entry.refBy)"
          :key="id"
          :href="id"
        >
          <el-tag
            size="large"
            style="font-size: 14px;"
          >
            {{ entry.refBy[id] }}（{{ id.replace(/^.+?-/, '') }}）
          </el-tag>
        </a>
      </el-space>
    </el-descriptions-item>
    <el-descriptions-item
      label="北流音"
    >
      {{ entry.bbakLau }}
    </el-descriptions-item>
    <el-descriptions-item
      label="关联词条"
      :span="2"
    >
      <el-space>
        <a
          v-for="id in Object.keys(entry.related)"
          :key="id"
          :href="id"
        >
          <el-tag
            size="large"
            style="font-size: 14px;"
          >
            {{ entry.related[id] }}
          </el-tag>
        </a>
      </el-space>
    </el-descriptions-item>
  </el-descriptions>
</template>
