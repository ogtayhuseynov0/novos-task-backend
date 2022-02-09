import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
db.data = db.data || { sessions: [], users: [] }
// Read data from JSON file, this will set db.data content
await db.read().then(a => {
    console.log(a);
})
await db.write()

export default db
