<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'

const emit = defineEmits(['change'])

const params = useUrlSearchParams()

const subDbs = {
  Common: '通用字',
  WriteableChars: '特色字',
  WriteableWords: '特色词',
  UnwriteableChars: '有音无字',
  Pended: '写法待定',
}

const defaultSubDBs = params.subDBs
  ? Array.isArray(params.subDBs)
    ? params.subDBs[0]!.split(',')
    : params.subDBs.split(',')
  : Object.keys(subDbs)

const selected = defineModel<string[]>({ required: true })
selected.value = defaultSubDBs

function onChange() {
  params.subDBs = selected.value.join(',')
  emit('change')
}
</script>

<template>
  <span class="subDBFilter">
    <el-text style="white-space: nowrap;">子数据库：</el-text>
    <ClientOnly>
      <el-select
        v-model="selected"
        multiple
        clearable
        collapse-tags
        collapse-tags-tooltip
        placeholder="选择子数据库"
        style="width: 10.5em;"
        @change="onChange"
      >
        <el-option
          v-for="label, key in subDbs"
          :key="key"
          :label="label"
          :value="key"
        />
      </el-select>
    </ClientOnly>
  </span>
</template>
