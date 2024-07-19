export function toUrlTerm(
  method: QueryMethod,
  text: string,
  heads: string[],
  tail: string
) {
  switch (method) {
    case 'text':
      return text;
    case 'headTail':
      return `${heads.join(',')};${tail}`
  }
}

export function flatten(list: TextList) {
  return list.reduce((pre, cur) => {
    return typeof cur === 'string'
      ? pre + cur
      : pre + cur.char;
  }, '')
}