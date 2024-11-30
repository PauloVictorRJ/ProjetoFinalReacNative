import { SQLiteDatabase } from 'expo-sqlite'

export const database_name = 'app.db'
const database_version = 1
export const table_name = 'markers'

const create_table_markers =
    `CREATE TABLE IF NOT EXISTS ${table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, cor TEXT NOT NULL)`

export const select_all_markers = `SELECT * FROM ${table_name}`

export async function migrateDb(db: SQLiteDatabase) {
    try {
        let response = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version')
        let { user_version: dbVersion } = response ?? { user_version: 0 }
        if (dbVersion >= database_version) return
        if (dbVersion === 0) {
            await db.execAsync(`${create_table_markers}`)
        }
        //if (dbVersion < dbVersion) {
        //atualização do banco
        //}
        await db.execAsync(`PRAGMA user_version = ${database_version}`)
    } catch (error) {
    }
}