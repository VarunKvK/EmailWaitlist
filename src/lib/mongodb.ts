import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const dbName = process.env.MONGODB_DB || 'pdf-analysis-waitlist'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri)
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return db
}