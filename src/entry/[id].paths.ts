import fs from 'fs-extra'

export default {
  async paths() {
    const db = fs.readJsonSync('src/data/main.json') as DataBase;
    return Object.keys(db.data).map((id) => {
      return {
        params: {
          id: id,
          entry: db.data[id]
        },
      };
    })
  }
}

