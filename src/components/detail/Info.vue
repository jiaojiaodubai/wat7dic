<script setup lang="ts">
import { useData } from 'vitepress'

const params = useData().params
const ID = params.value?.id as string
const entry = params.value?.entry as Entry
const codes = entry.unicode.match(/U\+[A-F\d]+/g)
</script>

<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="Unicode" :span="2">
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
      {{ entry.head.toUpperCase() }}
    </el-descriptions-item>
    <el-descriptions-item label="韵尾">
      {{ entry.tail }}
    </el-descriptions-item>
    <el-descriptions-item label="其他字形">
      <template v-for="(char, index) in entry.characters">
        <el-tag v-if="index > 0" style="font-size: 14px;">
          {{ char }}
        </el-tag>
      </template>
    </el-descriptions-item>
    <el-descriptions-item label="选字争议性">
      {{ ["几乎无争议", "存在共识", "尚无定论"][entry.controversial] }}
    </el-descriptions-item>
    <el-descriptions-item label="更多读音" :span="2">
      <el-space>
        <template v-for="id in Object.keys(entry.refBy)">
          <a v-if="id !== ID" :href="id">
            <el-tag size="large" style="font-size: 14px;">
              {{ entry.refBy[id] }}（{{ id.replace(/^.+?-/, '') }}）
            </el-tag>
          </a>
        </template>
      </el-space>
    </el-descriptions-item>
    <el-descriptions-item label="关联词条" :span="2">
      <el-space>
        <a v-for="id in Object.keys(entry.related)" :href="id">
          <el-tag v-if="id !== ID" size="large" style="font-size: 14px;">
              {{ entry.related[id] }}
          </el-tag>
        </a>
      </el-space>
    </el-descriptions-item>
  </el-descriptions>
</template>
