type QueryMethod = 'text' | 'headTail';

interface SearchParma {
  method: QueryMethod;
  term: string
}

type ELSize = 'large' | 'default' | 'small';

type IndexedEntry = { [key: string]: Entry };

interface SearchEntry {
  id: string;
  unicode: string;
  characters: string[];
  jyutping: string;
  head: string;
  tail: string;
  words: TextList[];
}

interface DataBase {
  // 数据库名称
  name: string;
  // 版本，形如 /\d+\.\d+\.\d/
  version: string;
  // YYYY-MM-DD
  createTime: string;
  // YYYY-MM-DD
  updateTime: string;
  // 贡献者
  creators: Creator[];
  data: { [id: string]: Entry };
}

interface Creator {
  name: string;
  email?: string;
  url?: string;
}

interface Entry {
  unicode: string;
  characters: string[];
  controversial: 0 | 1 | 2;
  related: { [id: string]: string };
  pinyin: string;
  jyutping: string;
  head: string;
  tail: string;
  ref: string;
  refBy: { [id: string]: string };
  meanings: Meaning[];
}

/**
 * 对于含有{id}表达式的字符串，它将在导出时转换为一个数组，
 * 其中{id}的位置被替换为{id: string; char: string}
 */
type TextList = (string | { id: string; char: string })[];

/**
 * 词/句的中英双语释义
 */
interface Descriptions {
  zh: TextList;
  en: TextList;
}

/**
 * 字的释义，以及该释义下的词语
 */
interface Meaning {
  descriptions: Descriptions;
  words: Word[];
}

/**
 * 词语的释义，及该释义下的例句
 */
interface Word {
  format: TextList;
  descriptions: Descriptions;
  sentences: Sentence[];
}

/**
 * 例句
 */
interface Sentence {
  format: TextList;
  descriptions: Descriptions;
}

type ValueType =
  | DataBase
  | Entry
  | Entry[]
  | Descriptions
  | Meaning
  | Meaning[]
  | Word
  | Word[]
  | Sentence
  | Sentence[]
  | string
  | string[]
  | ControversialDegree;

type ControversialDegree = 0 | 1 | 2;

// eslint-disable-next-line
type TypeGuard = (value: any) => value is ValueType;

declare global {
  Creator,
  DataBase,
  Entry,
  Descriptions,
  Meaning,
  Word,
  Sentence,
  TypeGuard,
  ControversialDegree
};
