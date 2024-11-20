<script setup lang="ts">
  import { useUrlSearchParams } from '@vueuse/core'
  import { data as entries } from '../searchEntries.data'
  import * as OpenCC from 'opencc-js'
  import DetailCard from './EntryCard.vue'

  const params: SearchParma = useUrlSearchParams('history')
  // 为了方便地设置安全默认值
  const method = toRef(params, 'method', 'text')
  const term = toRef(params, 'term', '')

  function extract(regxp: RegExp) {
    return term.value.match(regxp) || [];
  }

  const griddle = computed(() => {
    let griddle: {
      id?: string[];
      unicode?: string[];
      jyutping?: string[];
      characters?: string[];
      head?: string[];
      tail?: string;
    } = {};
    if (method.value === 'text') {
      griddle.id = extract(/U\+[A-F\d]{4}-[a-z]+\d{0,2}|A\+[a-z]+\d{0,2}|[WP]\+\d+-([a-z]+\d{0,2})+/g);
      griddle.unicode = extract(/U\+[A-F\d]{4}/g);
      griddle.jyutping = extract(/[a-z]+\d{0,2}/g);
      console.log(griddle.jyutping);
      griddle.characters = extract(/[\u4e00-\u9fff]+/g);
    } else if (method.value === 'headTail') {
      griddle.head = term.value.split(';')[0].split(',');
      griddle.tail = term.value.split(';')[1];
    }
    return griddle;
  });

  const converter = OpenCC.Converter({from: 'tw', to: 'cn'})
  const results = computed(() => {
    return entries.filter(entry => {
      return griddle.value.id?.includes(entry.id) ||
        griddle.value.unicode?.includes(entry.unicode) ||
        griddle.value.jyutping?.some(gPing => /\d+$/.test(gPing) ? gPing == entry.jyutping : gPing == entry.jyutping.replace(/\d+$/, '')) ||
        griddle.value.characters?.some(gChar =>
          entry.characters.some(eCHar => converter(eCHar).includes(gChar))
        ) ||
        (griddle.value.head?.includes(entry.head) && griddle.value.tail == entry.tail);
    })
  })

</script>

<template>
  <div style="display: flex;justify-content: center;">
    <template v-if="!results.length">
      <el-empty
        description="没有匹配的搜索结果"
        :image-size="200"
        style="padding-top: 13%;"
      />
    </template>
    <template v-else>
      <div
        style="
          display: flex;
          flex-direction: column;
        ">
        <el-text
          type="primary"
          style="padding-top: 1rem;
          padding-bottom: 1rem;
        ">
          共找到 {{ results.length }} 条结果
        </el-text>
        <el-space direction="vertical">
          <a v-for="entry in results" :href="`./entry/${entry.id}`">
            <DetailCard :entry="entry" />
          </a>
        </el-space>
      </div>
    </template>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>
