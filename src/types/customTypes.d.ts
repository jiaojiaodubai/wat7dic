declare global {
  type QueryMethod = 'text' | 'headTail';

  interface SearchParma {
    method: QueryMethod;
    term: string;
    heads: string[];
    tail: string;
  }

  type ELSize = 'large' | 'default' | 'small';

  interface IndexedEntry { [key: string]: Entry; }

  interface SearchEntry {
    subDB: string;
    id: string;
    unicode: string;
    characters: string[];
    jyutping: string;
    head: string;
    tail: string;
    words: TextList[];
  }

  interface DataBase {
    name: string;
    version: string;
    createTime: string;
    updateTime: string;
    creators: Creator[];
    data: { [id: string]: Entry; };
  }

  interface Creator {
    name: string;
    email?: string;
    url?: string;
  }

  interface Entry {
    subDB: string;
    unicode: string;
    characters: string[];
    controversial: 0 | 1 | 2;
    related: { [id: string]: string; };
    pinyin: string;
    jyutping: string;
    bbakLau: string;
    head: string;
    tail: string;
    ref: string;
    refBy: { [id: string]: string; };
    meanings: Meaning[];
  }

  type TextList = (string | { id: string; char: string; })[];

  interface Descriptions {
    zh: TextList;
    en: TextList;
  }

  interface Meaning {
    descriptions: Descriptions;
    words: Word[];
  }

  interface Word {
    format: TextList;
    descriptions: Descriptions;
    sentences: Sentence[];
  }

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

  type TypeGuard = (value: any) => value is ValueType;
}

export {};