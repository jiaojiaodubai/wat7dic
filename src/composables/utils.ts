import { reactive } from 'vue'

const searchParams = reactive({
  method: 'text',
  heads: [],
  tail: '',
  term: '',
})

function flattenTextList(list: TextList) {
  return list.reduce((pre, cur) => {
    return typeof cur === 'string'
      ? pre + cur
      : pre + cur.char
  }, '')
}

export {
  flattenTextList,
  searchParams,
}
