---
layout: doc
title: 词条详情
sidebar: false
prev: false
next: false
showSearch: true
---

<!-- markdownlint-disable -->

<script setup>
import Info from '../components/detail/Info.vue'
import Heading from '../components/detail/Heading.vue'
import Meanings from '../components/detail/Meanings.vue'
import { useData } from 'vitepress'

const params = useData().params

const entry = params.value.entry
</script>

# <Heading />

## 基本信息
<Info />

## 释义
<Meanings />
