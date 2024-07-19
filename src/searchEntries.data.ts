import fs from 'fs-extra'

declare const data: SearchEntry[];

export { data };

export default {
  async load() {
    const db = fs.readJsonSync('src/data/main.json') as DataBase;
    const index: SearchEntry[] = Object.keys(db.data).map((id) => {
        const entry = db.data[id];
        const searchEntry: SearchEntry = {
        id: id,
        unicode: entry.unicode,
        characters: entry.characters,
        jyutping: entry.jyutping,
        head: entry.head,
        tail: entry.tail,
        words: []
      };
      entry.meanings.forEach(meaning => {
        meaning.words.forEach(word => {
          searchEntry.words.push(word.format);
        })
      })
      return searchEntry;
    });
    return index;
  }
}